import React from "react";
import Header from "../ui/header";
import Sidebar from "../ui/sidebar";
import { ChartProvider } from "../charts/context/chart_context";
import { GroupedCharts } from "../charts/grouped_charts";

const Homepage: React.FC = () => {
	return (
		<div className="h-screen w-screen flex flex-col relative" data-testid="homepage">
			<div className="relative z-10 flex flex-col h-full" data-testid="homepage-content">
				<Header />
				<div className="flex flex-1 overflow-y-auto pt-14" data-testid="homepage-main">
					<Sidebar />
					<div className="flex-1 p-4 text-black ml-20 mr-2" data-testid="homepage-content-area">
						<h1 className="text-3xl font-bold mb-1" data-testid="homepage-title">Welcome to AES-Insight</h1>
						<p className="mb-6" data-testid="homepage-description">
							Your trusted partner in data security and insights.
						</p>
						<ChartProvider>
							<GroupedCharts />
						</ChartProvider>
					</div>
				</div>
				<footer className="p-2 bg-gray-800 text-white text-center text-xs relative z-10" data-testid="homepage-footer">
					<p>2025 AES-Insight. All rights reserved.</p>
				</footer>
			</div>
		</div>
	);
};

export default Homepage;
