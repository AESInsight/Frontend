import React from "react";
import Header from "../ui/header";
import Sidebar from "../ui/sidebar";

const Homepage: React.FC = () => {
	return (
		<div className="homepage h-screen w-screen flex flex-col relative">
			{/* BG image */}
			<img
				src="../../public/bgimage.png"
				className="absolute inset-0 w-full h-full object-cover"
			/>

			{/* Main Content */}
			<div className="relative z-10 flex flex-col h-full">
				<Header />
				<div className="homepage-content flex flex-1">
					<Sidebar />
					<main className="homepage-main flex-1 p-4 text-black">
						<h1 className="text-3xl font-bold mb-4">Welcome to AES-Insight</h1>
						<p>Your trusted partner in data security and insights.</p>
					</main>
				</div>
				<footer className="homepage-footer p-2 bg-gray-800 text-white text-center text-xs relative z-10">
					<p>2025 AES-Insight. All rights reserved.</p>
				</footer>
			</div>
		</div>
	);
};

export default Homepage;
