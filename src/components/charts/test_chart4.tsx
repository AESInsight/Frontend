"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

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
import { fetchEmployees } from "@/lib/employeeAPI";
import { ChartDataEntry } from "@/lib/types/salary";

const chartConfig = {
	people: {
		label: "People",
	},
} satisfies ChartConfig;

export function TestChart4() {
	const [chartData, setChartData] = useState<ChartDataEntry[]>([]);

	useEffect(() => {
		const loadEmployees = async () => {
			try {
				const employees = await fetchEmployees();

				const jobTitleCounts: Record<string, number> = {};

				employees.forEach((emp: { jobTitle: string }) => {
					const title = emp.jobTitle || "Unknown";
					jobTitleCounts[title] = (jobTitleCounts[title] || 0) + 1;
				});

				const colors = [
					"hsl(210, 64%, 36%)",
					"hsl(210, 64%, 42%)",
					"hsl(210, 64%, 48%)",
					"hsl(210, 64%, 54%)",
					"hsl(210, 64%, 60%)",
				];

				const entries = Object.entries(jobTitleCounts)
					.map(([position, people], index) => ({
						position,
						people,
						fill: colors[index % colors.length], // Rotate colors
					}))
					.sort((a, b) => b.people - a.people); // Highest first

				setChartData(entries);
			} catch (err) {
				console.error("Could not load employees for chart", err);
			}
		};

		loadEmployees();
	}, []);

	return (
		<Card className="bg-transparent border-none shadow-none">
			<CardHeader className="pb-1 pt-2 px-2">
				<CardTitle className="text-lg">
					Number of People by Job Position
				</CardTitle>
				<CardDescription className="text-sm">
					Employee distribution as of April 2025
				</CardDescription>
			</CardHeader>
			<CardContent className="p-2 flex-1">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-[300px] w-full"
				>
					<BarChart
						data={chartData}
						layout="vertical"
						margin={{ left: 10, right: 20, top: 5, bottom: 5 }}
					>
						<YAxis
							dataKey="position"
							type="category"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							fontSize={12}
							width={150}
						/>
						<XAxis
							dataKey="people"
							type="number"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							fontSize={12}
							domain={[0, Math.max(...chartData.map((d) => d.people), 10) + 10]}
							ticks={[0, 5, 10, 15, 20]}
						/>
						<ChartTooltip
							cursor={false}
							content={({ payload }) => {
								if (!payload?.length) return null;
								const data = payload[0].payload;
								return (
									<div className="rounded-lg border bg-white p-2 shadow-sm">
										<div className="font-medium">{data.position}</div>
										<div className="mt-1 font-medium">{data.people} people</div>
									</div>
								);
							}}
						/>
						<Bar
							dataKey="people"
							layout="vertical"
							radius={5}
							fill="fill"
							isAnimationActive={true}
						/>
					</BarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="pt-1 pb-2 px-2 flex-col items-start gap-2 text-sm">
				<div className="flex gap-2 font-medium leading-none">
					Software Engineers increased by 12% this year{" "}
					<TrendingUp className="h-4 w-4" />
				</div>
				<div className="leading-none text-muted-foreground">
					Based on current hiring trends
				</div>
			</CardFooter>
		</Card>
	);
}
