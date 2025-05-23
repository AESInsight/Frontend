import { useChartContext } from "./context/chart_context";
import { GenderSalaryBarChart } from "./gender_salary_bar_chart";
import { PositionBarChart } from "./position_bar_chart";
import { SalaryPieChart } from "./salary_pie_chart";
import { SalaryRaiseFlowChart } from "./salary_raise_flow_chart";
import React from "react";

export const GroupedCharts: React.FC = () => {
	const {
		sharedJobTitle,
		setSharedJobTitle,
		isJobTitleSyncEnabled,
		toggleJobTitleSyncEnabled,
		sharedIndustry,
		setSharedIndustry,
		isIndustrySyncEnabled,
		toggleIndustrySyncEnabled,
	} = useChartContext();

	return (
		<div className="space-y-6">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
				<div className="bg-transparent backdrop-blur-sm border-black border-2 rounded-lg">
					<GenderSalaryBarChart
						sharedJobTitle={sharedJobTitle}
						setSharedJobTitle={setSharedJobTitle}
						enabled={isJobTitleSyncEnabled}
						onToggle={toggleJobTitleSyncEnabled}
					/>
				</div>
				<div className="bg-transparent backdrop-blur-sm border-2 border-black rounded-lg">
					<SalaryPieChart
						sharedIndustry={sharedIndustry}
						setSharedIndustry={setSharedIndustry}
						enabled={isIndustrySyncEnabled}
						onToggle={toggleIndustrySyncEnabled}
					/>
				</div>
				<div className="bg-transparent backdrop-blur-sm border-2 border-black rounded-lg mb-4">
					<SalaryRaiseFlowChart
						sharedJobTitle={sharedJobTitle}
						setSharedJobTitle={setSharedJobTitle}
						jobTitleSyncEnabled={isJobTitleSyncEnabled}
					/>
				</div>
				<div className="bg-transparent backdrop-blur-sm border-2 border-black rounded-lg mb-4">
					<PositionBarChart
						sharedIndustry={sharedIndustry}
						setSharedIndustry={setSharedIndustry}
						industrySyncEnabled={isIndustrySyncEnabled}
					/>
				</div>
			</div>
		</div>
	);
};
