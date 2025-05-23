import React, { useState } from "react";
import Header from "../ui/header";
import Sidebar from "../ui/sidebar";
import { ChartProvider } from "../charts/context/chart_context";
import { GroupedCharts } from "../charts/grouped_charts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useIsDesktop } from "@/lib/context/desktop_context";

const Homepage: React.FC = () => {
	const isDesktop = useIsDesktop();
	const [showMenu, setShowMenu] = useState(false);

	return (
		<div className="h-screen w-screen flex flex-col relative">
			<div className="relative z-10 flex flex-col h-full">
				<Header />
				{/* Hamburger menu only on mobile, placed in top left under header */}
				{!isDesktop && (
					<button
						className="md:hidden p-3 absolute left-2 top-16 text-sky-700 hover:text-sky-900 focus:outline-none z-50"
						onClick={() => setShowMenu(true)}
						aria-label="Open menu"
					>
						<FontAwesomeIcon icon={faBars} className="text-2xl" />
					</button>
				)}
				<div className="flex flex-1 overflow-y-auto pt-14">
					{/* Sidebar only rendered on desktop */}
					{isDesktop && (
						<div className="md:block">
							<Sidebar />
						</div>
					)}
					<div className="flex-1 p-2 sm:p-4 md:p-4 text-black ml-0 md:ml-20 mr-0 md:mr-2 max-w-full">
						<div className="mt-8 md:mt-0 max-w-xs mx-auto text-center">
							<h1 className="text-xl md:text-3xl font-bold mb-1">Welcome to AES-Insight</h1>
							<p className="mb-4 sm:mb-6 text-sm md:text-base">
								Your trusted partner in data security and insights.
							</p>
						</div>

						{/* Overlay menu for About and Contact - only on mobile */}
						{showMenu && (
							<div className="fixed inset-0 z-40 bg-black bg-opacity-40 flex justify-end md:hidden">
								<div className="bg-white w-2/3 max-w-xs h-full shadow-lg flex flex-col p-6">
									<button
										className="self-end mb-6 p-1 text-gray-500 hover:text-gray-700"
										onClick={() => setShowMenu(false)}
									>
										<span className="text-xl">×</span>
									</button>
									<nav className="flex flex-col space-y-4">
										<a href="/about" className="text-gray-700 hover:text-sky-600 text-lg">About Us</a>
										<a href="/contact" className="text-gray-700 hover:text-sky-600 text-lg">Contact</a>
									</nav>
								</div>
							</div>
						)}

						<ChartProvider>
							<GroupedCharts />
						</ChartProvider>
					</div>
				</div>
				<footer className="p-1.5 sm:p-2 bg-gray-800 text-white text-center text-[10px] sm:text-xs relative z-10">
					<p>2025 AES-Insight. All rights reserved.</p>
				</footer>
			</div>
		</div>
	);
};

export default Homepage;
