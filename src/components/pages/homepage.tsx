import React from "react";
import Header from "../ui/header";
import Sidebar from "../ui/sidebar";

const Homepage: React.FC = () => {
	return (
		<div className="homepage min-h-screen flex flex-col">
			<Header />
			<div className="homepage-content flex flex-1">
				<Sidebar />
				<main className="homepage-main flex-1 p-4">
					<h1 className="text-3xl font-bold mb-4">Welcome to AES-Insight</h1>
					<p>Your trusted partner in data security and insights.</p>
				</main>
			</div>
			<footer className="homepage-footer p-4 bg-gray-800 text-white text-center">
				<p>2023 AES-Insight. All rights reserved.</p>
			</footer>
		</div>
	);
};

export default Homepage;
