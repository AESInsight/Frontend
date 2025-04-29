import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Header from "../ui/header";

const ResetPasswordPage: React.FC = () => {
	const [searchParams] = useSearchParams();
	const token = searchParams.get("token") || "";

	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");
	const [isError, setIsError] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const navigate = useNavigate();

	const getPasswordStrength = (password: string) => {
		let strength = 0;
		if (password.length >= 8) strength++;
		if (/[A-Z]/.test(password)) strength++;
		if (/[0-9]/.test(password)) strength++;
		if (/[^A-Za-z0-9]/.test(password)) strength++;
		return strength;
	};

	const handleResetPassword = async () => {
		if (!newPassword || !confirmPassword) {
			setMessage("Please fill in all fields.");
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
			setTimeout(() => navigate("/admin"), 1500);
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

	const strength = getPasswordStrength(newPassword);
	const getStrengthText = (level: number) => {
		switch (level) {
			case 0:
			case 1:
				return { text: "Weak", color: "text-red-500" };
			case 2:
			case 3:
				return { text: "Medium", color: "text-yellow-500" };
			case 4:
				return { text: "Strong", color: "text-green-500" };
			default:
				return { text: "", color: "" };
		}
	};

	return (
		<div className="h-screen w-screen flex flex-col relative">
			<div className="relative z-10 flex flex-col h-full">
				<Header />
				<div className="flex flex-1 overflow-y-auto pt-14">
					{/* Sidebar er i App.tsx */}
					<main className="flex-1 p-4 text-black">
						<h1 className="text-3xl font-bold mb-6 text-center">Reset Your Password</h1>

						<div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg border-2 border-black">
							{message && (
								<p className={`text-sm text-center mb-4 ${isError ? "text-red-600" : "text-green-600"}`}>
									{message}
								</p>
							)}

							<div className="relative mb-2">
								<input
									type={showNewPassword ? "text" : "password"}
									placeholder="New password"
									value={newPassword}
									onChange={(e) => setNewPassword(e.target.value)}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-sky-500"
								/>
								<button
									type="button"
									onClick={() => setShowNewPassword(!showNewPassword)}
									className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
								>
									{showNewPassword ? <Eye size={20} /> : <EyeOff size={20} />}
								</button>
							</div>

							{newPassword && (
								<p className={`text-xs mb-4 ${getStrengthText(strength).color}`}>
									Password Strength: {getStrengthText(strength).text}
								</p>
							)}

							<div className="relative mb-4">
								<input
									type={showConfirmPassword ? "text" : "password"}
									placeholder="Confirm password"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-sky-500"
								/>
								<button
									type="button"
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
								>
									{showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
								</button>
							</div>

							<button
								onClick={handleResetPassword}
								disabled={isSubmitting}
								className={`w-full bg-sky-600 text-white px-4 py-2 rounded-lg text-sm ${
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
