import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { validatePassword } from "@/lib/regexValidationLogin";
import Header from "../ui/header";
import PasswordField from "../fields/password_field";

const ResetPasswordPage: React.FC = () => {
	const [searchParams] = useSearchParams();
	const token = searchParams.get("token") || "";

	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");
	const [isError, setIsError] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const navigate = useNavigate();

	const handleResetPassword = async () => {
		if (!newPassword || !confirmPassword) {
			setMessage("Please fill in all fields.");
			setIsError(true);
			return;
		}

		const { isValid, errors } = validatePassword(newPassword);

		if (!isValid) {
			setMessage(errors[0]);
			setIsError(true);
			return;
		}

		if (newPassword !== confirmPassword) {
			setMessage("Passwords do not match.");
			setIsError(true);
			return;
		}

		setIsSubmitting(true);

		try {
			const response = await fetch("/api/reset-password", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ token, newPassword, confirmPassword }),
			});
			const data = await response.json();

			if (!response.ok) throw new Error(data.message || "Unknown error");

			setMessage(data.message || "Password reset successful!");
			setIsError(false);
			navigate("/reset-success");
		} catch (err: unknown) {
			if (err instanceof Error) {
				setMessage(err.message || "An error occurred.");
			} else {
				setMessage("An unknown error occurred.");
			}
			setIsError(true);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="h-screen w-screen flex flex-col relative">
			<div className="relative z-10 flex flex-col h-full">
				<Header />
				<div className="flex flex-1 overflow-y-auto pt-14">
					<main className="flex-1 p-4 text-black">
						<h1 className="text-3xl font-bold mb-6 text-center">Reset Your Password</h1>

						<div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg border-2 border-black">
							{message && (
								<p className={`text-sm text-center mb-4 ${isError ? "text-red-600" : "text-green-600"}`}>
									{message}
								</p>
							)}

							<PasswordField
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
								showValidation={true}
							/>

							<PasswordField
								label="Confirm Password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								showValidation={false}
                                showInfoIcon={false}
							/>

							<button
								onClick={handleResetPassword}
								disabled={isSubmitting}
								className={`w-full mt-2 bg-sky-600 text-white px-4 py-2 rounded-lg text-sm hover:underline hover:cursor-pointer ${
									isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-sky-700" 
								}`}
							>
								{isSubmitting ? "Submitting..." : "Reset Password"}
							</button>
						</div>
					</main>
				</div>
			</div>
		</div>
	);
};

export default ResetPasswordPage;
