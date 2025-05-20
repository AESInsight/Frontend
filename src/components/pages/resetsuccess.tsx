import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../ui/header";
import LoginModal from "../modals/login_modal"; 

const ResetSuccessPage: React.FC = () => {
	const [isLoginOpen, setIsLoginOpen] = useState(false);
	const navigate = useNavigate();

	const handleLoginSuccess = (jwtToken: string) => {
		localStorage.setItem("authToken", jwtToken);
		setIsLoginOpen(false);
		navigate("/");
	};

	return (
		<div className="h-screen w-screen flex flex-col relative">
			<div className="relative z-10 flex flex-col h-full">
				<Header />
				<div className="flex flex-1 overflow-y-auto pt-14">
					<main className="flex-1 p-4 text-black">
						<h1 className="text-3xl font-bold mb-6 text-center">Password Reset Successful</h1>

						<div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg border-2 border-black text-center">
							<p className="text-base mb-6">
								Your password has been updated.<br />
								You can now log in with your new password.
							</p>

							<button
								onClick={() => setIsLoginOpen(true)}
								className="w-1/3 bg-sky-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-sky-700 hover:underline hover:cursor-pointer"
							>
								Open Login
							</button>
						</div>
					</main>
				</div>
			</div>

			<LoginModal
				isOpen={isLoginOpen}
				onClose={() => setIsLoginOpen(false)}
				onLoginSuccess={handleLoginSuccess}
			/>
		</div>
	);
};

export default ResetSuccessPage;
