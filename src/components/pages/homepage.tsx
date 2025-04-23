import React from "react";
import Header from "../ui/header";
import Sidebar from "../ui/sidebar";
import { TestChart } from "../charts/test_chart";
import { TestChart2 } from "../charts/test_chart2";
import { TestChart3 } from "../charts/test_chart3";
import { TestChart4 } from "../charts/test_chart4";
const Homepage: React.FC = () => {
	return (
		<div className="h-screen w-screen flex flex-col relative">
			<div className="relative z-10 flex flex-col h-full">
				<Header />
				<div className="flex flex-1 overflow-y-auto pt-14">
					<Sidebar />
					<div className="flex-1 p-4 text-black ml-20 mr-2">
						<h1 className="text-3xl font-bold mb-4">Welcome to AES-Insight</h1>
						<p className="mb-6">
							Your trusted partner in data security and insights.
						</p>
						<div className="grid grid-cols-2 gap-12">
							<div className="bg-transparent backdrop-blur-sm border-black border-2 rounded-lg">
								<TestChart />
							</div>
							<div className="bg-transparent backdrop-blur-sm border-2 border-black rounded-lg">
								<TestChart2 />
							</div>
							<div className="bg-transparent backdrop-blur-sm border-2 border-black rounded-lg mb-4">
								<TestChart3 />
							</div>
							<div className="bg-transparent backdrop-blur-sm border-2 border-black rounded-lg mb-4">
								<TestChart4 />
							</div>
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

export default Homepage;
