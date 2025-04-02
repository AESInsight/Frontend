"use client";

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

// Data remains the same
const chartData = [
	{ position: "softwareEngineer", people: 145, fill: "hsl(210, 64%, 36%)" },
	{ position: "productManager", people: 115, fill: "hsl(210, 64%, 42%)" },
	{ position: "dataScientist", people: 110, fill: "hsl(210, 64%, 48%)" },
	{ position: "uxDesigner", people: 92, fill: "hsl(210, 64%, 54%)" },
	{ position: "devOpsEngineer", people: 75, fill: "hsl(210, 64%, 60%)" },
];

// ChartConfig remains the same
const chartConfig = {
	people: {
		label: "People",
	},
	softwareEngineer: {
		label: "Software Engineer",
		color: "hsl(210, 64%, 36%)",
	},
	productManager: {
		label: "Product Manager",
		color: "hsl(210, 64%, 42%)",
	},
	dataScientist: {
		label: "Data Scientist",
		color: "hsl(210, 64%, 48%)",
	},
	uxDesigner: {
		label: "UX Designer",
		color: "hsl(210, 64%, 54%)",
	},
	devOpsEngineer: {
		label: "DevOps Engineer",
		color: "hsl(210, 64%, 60%)",
	},
} satisfies ChartConfig;

export function TestChart4() {
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
					className="mx-auto aspect-square max-h-[220px] w-full"
				>
					<BarChart
						accessibilityLayer
						data={chartData}
						layout="vertical"
						margin={{
							left: 10,
							right: 20,
							top: 5,
							bottom: 5,
						}}
					>
						<YAxis
							dataKey="position"
							type="category"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							fontSize={12}
							tickFormatter={(value) =>
								chartConfig[value as keyof typeof chartConfig]?.label || value
							}
							width={120}
						/>
						<XAxis
							dataKey="people"
							type="number"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							fontSize={12}
							domain={[0, 150]}
							ticks={[0, 50, 100, 150]}
						/>
						<ChartTooltip
							cursor={false}
							content={({ payload }) => {
								if (!payload?.length) return null;
								const data = payload[0].payload;
								return (
									<div className="rounded-lg border bg-white p-2 shadow-sm">
										<div className="font-medium">
											{
												chartConfig[data.position as keyof typeof chartConfig]
													?.label
											}
										</div>
										<div className="mt-1 font-medium">{data.people} people</div>
									</div>
								);
							}}
						/>
						<Bar dataKey="people" layout="vertical" radius={5} />
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
