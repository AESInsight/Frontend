"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
} from "@/components/ui/chart";
import {
	fetchAllSalaries,
	fetchEmployees,
	fetchJobTitles,
} from "@/lib/employeeAPI";
import { SalaryEntry, SalaryRaiseData } from "@/lib/types/salary";
import { Select } from "@/components/ui/select";

const chartConfig = {
	Men: {
		label: "Men",
		color: "hsl(210, 64%, 36%)",
	},
	Women: {
		label: "Women",
		color: "hsl(210, 64%, 48%)",
	},
} satisfies ChartConfig;

export function SalaryRaiseFlowChart() {
	const [chartData, setChartData] = useState<
		{ year: string; Men: number; Women: number }[]
	>([]);
	const [jobTitles, setJobTitles] = useState<string[]>([]);
	const [selectedJobTitle, setSelectedJobTitle] = useState<string>("");

	useEffect(() => {
		const loadJobTitles = async () => {
			try {
				const res = await fetchJobTitles();
				const titles = res.jobTitles;
				setJobTitles(Array.isArray(titles) ? titles : []);
				if (!selectedJobTitle && titles.length > 0) {
					setSelectedJobTitle("");
				}
			} catch (err) {
				console.error("Failed to fetch job titles", err);
			}
		};

		loadJobTitles();
	}, [selectedJobTitle]);

	useEffect(() => {
		const loadSalaries = async () => {
			try {
				const [salaries, employees] = await Promise.all([
					fetchAllSalaries(),
					fetchEmployees(),
				]);

				const employeeMap: Record<
					number,
					{ gender: "Men" | "Women"; jobTitle: string }
				> = {};
				employees.forEach((emp: SalaryRaiseData) => {
					employeeMap[emp.employeeID] = {
						gender: emp.gender === "Female" ? "Women" : "Men",
						jobTitle: emp.jobTitle,
					};
				});

				const yearlySalaries: Record<
					string,
					{ Men: number[]; Women: number[] }
				> = {};

				salaries.forEach((item: SalaryEntry) => {
					const emp = employeeMap[item.employeeID];
					if (!emp || emp.jobTitle !== selectedJobTitle) return;

					const year = new Date(item.timestamp).getFullYear().toString();
					const gender = emp.gender;

					if (!yearlySalaries[year]) {
						yearlySalaries[year] = { Men: [], Women: [] };
					}

					yearlySalaries[year][gender].push(item.salary);
				});

				const yearlyAverages: Record<string, { Men: number; Women: number }> =
					{};

				Object.entries(yearlySalaries).forEach(([year, genders]) => {
					yearlyAverages[year] = {
						Men:
							genders.Men.reduce((sum, s) => sum + s, 0) /
							(genders.Men.length || 1),
						Women:
							genders.Women.reduce((sum, s) => sum + s, 0) /
							(genders.Women.length || 1),
					};
				});

				const sortedYears = Object.keys(yearlyAverages)
					.map(Number)
					.sort((a, b) => a - b)
					.map(String);

				const raiseData = sortedYears.map((year, index) => {
					if (index === 0) return { year, Men: 0, Women: 0 };

					const prev = sortedYears[index - 1];
					const menRaise =
						((yearlyAverages[year].Men - yearlyAverages[prev].Men) /
							(yearlyAverages[prev].Men || 1)) *
						100;
					const womenRaise =
						((yearlyAverages[year].Women - yearlyAverages[prev].Women) /
							(yearlyAverages[prev].Women || 1)) *
						100;

					return {
						year,
						Men: parseFloat(menRaise.toFixed(1)),
						Women: parseFloat(womenRaise.toFixed(1)),
					};
				});

				setChartData(raiseData);
			} catch (err) {
				console.error("Could not load raise chart data", err);
			}
		};

		if (selectedJobTitle) loadSalaries();
	}, [selectedJobTitle]);

	return (
		<Card className="bg-transparent border-none shadow-none">
			<CardHeader className="px-4 flex items-center justify-between">
				<div>
					<CardTitle className="text-lg">
						Average Salary Raise by Gender
					</CardTitle>
					<CardDescription className="text-sm">
						Filtered by Job Title
					</CardDescription>
				</div>
				<Select
					options={jobTitles}
					selected={selectedJobTitle}
					onChange={setSelectedJobTitle}
					placeholder="Select a Job Title"
				/>
			</CardHeader>
			<CardContent className="p-2 flex-1">
				<ChartContainer config={chartConfig} className="h-[250px] w-full">
					<AreaChart
						data={chartData}
						margin={{ left: 12, right: 12, top: 5, bottom: 5 }}
					>
						<CartesianGrid
							vertical={false}
							strokeDasharray="3 3"
							opacity={0.4}
						/>
						<XAxis
							dataKey="year"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							fontSize={12}
						/>
						<YAxis
							tickLine={false}
							axisLine={false}
							tickFormatter={(value) => `${value}%`}
							domain={[-10, 20]}
							ticks={[-10, 0, 10, 20]}
							fontSize={12}
							width={40}
						/>
						<ChartTooltip
							cursor={false}
							content={({ payload, label }) => {
								if (!payload?.length) return null;
								return (
									<div className="rounded-md border bg-white px-3 py-2 shadow-md text-sm">
										<div className="mb-1 font-semibold text-black">{label}</div>
										{payload.map((item) => (
											<div
												key={item.name}
												className="flex items-center justify-between gap-2"
											>
												<div className="flex items-center gap-2">
													<div
														className="h-2 w-2 rounded-full"
														style={{ backgroundColor: item.color }}
													/>
													<span>{item.name}</span>
												</div>
												<span className="font-medium">{item.value}%</span>
											</div>
										))}
									</div>
								);
							}}
						/>
						<Area
							dataKey="Women"
							type="natural"
							fill={chartConfig.Women.color}
							fillOpacity={0.4}
							stroke={chartConfig.Women.color}
							stackId="a"
						/>
						<Area
							dataKey="Men"
							type="natural"
							fill={chartConfig.Men.color}
							fillOpacity={0.4}
							stroke={chartConfig.Men.color}
							stackId="a"
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="pt-1 pb-2 px-2 flex-col items-start gap-2 text-sm">
				<div className="flex gap-2 font-medium leading-none">
					Salary raises trending up <TrendingUp className="h-4 w-4" />
				</div>
				<div className="leading-none text-muted-foreground">
					Based on annual salary adjustments
				</div>
			</CardFooter>
		</Card>
	);
}
