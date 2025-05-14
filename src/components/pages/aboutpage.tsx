import React from "react";
import Header from "../ui/header";
import Sidebar from "../ui/sidebar";

const AboutPage: React.FC = () => {
	return (
		<div className="h-screen w-screen flex flex-col relative justify-center items-center">
			<div className="relative z-10 flex flex-col h-full w-full">
				<Header />
				<div className="flex flex-1 w-full overflow-y-auto pt-14">
					<Sidebar />
					<div className="flex flex-1 justify-center items-center p-6">
						<div className="bg-white p-6 rounded-lg shadow-md max-w-2xl border border-gray-200">
							<h1 className="text-3xl font-semibold mb-6 text-gray-900 text-center">
								About Us
							</h1>
							<p className="text-gray-600 mb-4">
								Welcome to our website! We are a dedicated team of students and
								the developers of AES-Insight.
							</p>
							<p className="text-gray-600 mb-4">
								Our mission is to deliver a high-quality product for our
								semester-project (and get a good grade, of course!).
							</p>
							<p className="text-gray-600">
								Thank you for visiting our site. More info can be found on our{" "}
								<a
									href="https://github.com/AESInsight/"
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-600 hover:text-blue-800 underline"
								>
									Github
								</a>
								.
							</p>
						</div>
					</div>
				</div>
				<footer className="p-2 bg-gray-800 text-white text-center text-xs relative z-10">
					<p>2025 AES-Insight. All rights reserved.</p>
				</footer>
			</div>
		</div>
	);
};

export default AboutPage;
