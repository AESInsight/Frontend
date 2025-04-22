import React from "react";
import Header from "../ui/header";
import Sidebar from "../ui/sidebar";

// Define the Employee type

const AboutPage: React.FC = () => {
	return (
		<div className="h-screen w-screen flex flex-col relative justify-center items-center">
			<div className="relative z-10 flex flex-col h-full w-full">
				<Header />
				<div className="flex flex-1 w-full overflow-y-auto pt-14">
					<Sidebar />
					<div className="flex flex-1 justify-center items-center">
						<div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl">
							<h1 className="text-4xl font-bold mb-4 text-center">About Us</h1>
							<p className="text-gray-700 text-lg mb-4">
								Welcome to our website! We are a deticated team of students, and
								the developers of AES-Insight
							</p>
							<p className="text-gray-700 text-lg mb-4">
								Our mission is to deliver a high-quality product for our
								semester-project (and get a good grade ofc..)
							</p>
							<p className="text-gray-700 text-lg">
								Thank you for visiting our site. More info can be found on our
								Github: https://github.com/AESInsight/
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AboutPage;
