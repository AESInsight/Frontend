"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

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

const baseChartData = [
	{
		position: "Software Engineer",
		value: 145,
		fill: "hsl(210, 64%, 36%)",
	},
	{
		position: "Product Manager",
		value: 115,
		fill: "hsl(210, 64%, 42%)",
	},
	{
		position: "Data Scientist",
		value: 110,
		fill: "hsl(210, 64%, 48%)",
	},
	{
		position: "UX Designer",
		value: 92,
		fill: "hsl(210, 64%, 54%)",
	},
	{
		position: "DevOps Engineer",
		value: 75,
		fill: "hsl(210, 64%, 60%)",
	},
] as const;

const chartConfig = {
	"Software Engineer": {
		label: "Software Engineer",
		color: "hsl(210, 64%, 36%)",
	},
	"Product Manager": {
		label: "Product Manager",
		color: "hsl(210, 64%, 42%)",
	},
	"Data Scientist": {
		label: "Data Scientist",
		color: "hsl(210, 64%, 48%)",
	},
	"UX Designer": {
		label: "UX Designer",
		color: "hsl(210, 64%, 54%)",
	},
	"DevOps Engineer": {
		label: "DevOps Engineer",
		color: "hsl(210, 64%, 60%)",
	},
} satisfies ChartConfig;

export function TestChart2() {
	const chartData = React.useMemo(() => {
		const total = baseChartData.reduce((acc, curr) => acc + curr.value, 0);
		return baseChartData.map((item) => ({
			...item,
			percentage: ((item.value / total) * 100).toFixed(1),
		}));
	}, []);

	const totalSalary = React.useMemo(() => {
		return chartData.reduce((acc, curr) => acc + curr.value, 0);
	}, [chartData]);

	return (
		<Card className="bg-transparent border-none shadow-none">
			<CardHeader className="p-2">
				<CardTitle className="text-lg">
					Salary Distribution by Position
				</CardTitle>
				<CardDescription className="text-sm">
					Annual Salary Overview
				</CardDescription>
			</CardHeader>
			<CardContent className="p-2">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-[220px] w-full"
				>
					<PieChart margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
						<ChartTooltip
							cursor={false}
							content={({ payload }) => {
								if (!payload?.length) return null;
								const data = payload[0].payload;
								return (
									<div className="rounded-lg border bg-white p-2 shadow-sm">
										<div className="flex items-center gap-2">
											<div
												className="h-2 w-2 rounded-full"
												style={{ background: data.fill }}
											/>
											<span className="font-medium">{data.position}</span>
										</div>
										<div className="mt-1 font-medium">{data.percentage}%</div>
									</div>
								);
							}}
						/>
						<Pie
							data={chartData}
							dataKey="value"
							nameKey="position"
							innerRadius={55}
							strokeWidth={3}
							outerRadius="75%"
						>
							<Label
								content={({ viewBox }) => {
									if (viewBox && "cx" in viewBox && "cy" in viewBox) {
										const cy = viewBox.cy || 0;
										return (
											<text
												x={viewBox.cx}
												y={cy - 2}
												textAnchor="middle"
												dominantBaseline="middle"
											>
												<tspan
													x={viewBox.cx}
													y={cy - 2}
													className="fill-foreground text-2xl font-bold"
												>
													${(totalSalary / 1000).toFixed(0)}k
												</tspan>
												<tspan
													x={viewBox.cx}
													y={cy + 18}
													className="fill-muted-foreground text-sm"
												>
													Total Salary
												</tspan>
											</text>
										);
									}
								}}
							/>
						</Pie>
					</PieChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="p-2 flex-col items-start gap-2 text-sm">
				<div className="flex gap-2 font-medium leading-none">
					Average salary trending up by 8.5% this year{" "}
					<TrendingUp className="h-4 w-4" />
				</div>
				<div className="leading-none text-muted-foreground">
					Based on current market rates
				</div>
			</CardFooter>
		</Card>
	);
}
