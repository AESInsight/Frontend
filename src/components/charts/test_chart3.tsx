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
import { fetchAllSalaries, fetchEmployees } from "@/lib/employeeAPI";
import { SalaryEntry } from "@/lib/types/salary";

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

export function TestChart3() {
	const [chartData, setChartData] = useState<
		{ year: string; Men: number; Women: number }[]
	>([]);

	useEffect(() => {
		const loadSalaries = async () => {
			try {
				const [salaries, employees] = await Promise.all([
					fetchAllSalaries(),
					fetchEmployees(),
				]);

				// Map employeeID -> gender
				const employeeGenderMap: Record<number, "Men" | "Women"> = {};
				employees.forEach((emp: { employeeID: number; gender: string }) => {
					employeeGenderMap[emp.employeeID] =
						emp.gender === "Female" ? "Women" : "Men";
				});

				// Group salaries by year and gender
				const yearlySalaries: Record<
					string,
					{ Men: number[]; Women: number[] }
				> = {};

				salaries.forEach((item: SalaryEntry) => {
					const year = new Date(item.timestamp).getFullYear().toString();
					const gender = employeeGenderMap[item.employeeID] ?? "Men";

					if (!yearlySalaries[year]) {
						yearlySalaries[year] = { Men: [], Women: [] };
					}

					yearlySalaries[year][gender].push(item.salary);
				});

				// Calculate average salary per year per gender
				const yearlyAverages: Record<string, { Men: number; Women: number }> =
					{};

				Object.entries(yearlySalaries).forEach(([year, genders]) => {
					yearlyAverages[year] = {
						Men:
							genders.Men.reduce((sum, salary) => sum + salary, 0) /
							(genders.Men.length || 1),
						Women:
							genders.Women.reduce((sum, salary) => sum + salary, 0) /
							(genders.Women.length || 1),
					};
				});

				// Now calculate raise % year over year
				const sortedYears = Object.keys(yearlyAverages)
					.map(Number)
					.sort((a, b) => a - b)
					.map(String);

				const raiseData = sortedYears.map((year, index) => {
					if (index === 0) {
						// First year, no previous year to compare
						return {
							year,
							Men: 0,
							Women: 0,
						};
					}

					const prevYear = sortedYears[index - 1];
					const menRaise =
						((yearlyAverages[year].Men - yearlyAverages[prevYear].Men) /
							(yearlyAverages[prevYear].Men || 1)) *
						100;
					const womenRaise =
						((yearlyAverages[year].Women - yearlyAverages[prevYear].Women) /
							(yearlyAverages[prevYear].Women || 1)) *
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

		loadSalaries();
	}, []);

	return (
		<Card className="bg-transparent border-none shadow-none">
			<CardHeader className="pb-1 pt-2 px-2">
				<CardTitle className="text-lg">
					Average Salary Raise by Gender
				</CardTitle>
				<CardDescription className="text-sm">
					Showing average salary raise percentages
				</CardDescription>
			</CardHeader>
			<CardContent className="p-2 flex-1">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-[220px] w-full"
				>
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
