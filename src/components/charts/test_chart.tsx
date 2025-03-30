"use client";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

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

const chartData = [
	{ month: "January", Men: 86, Women: 80 },
	{ month: "February", Men: 95, Women: 100 },
	{ month: "March", Men: 90, Women: 120 },
	{ month: "April", Men: 83, Women: 90 },
	{ month: "May", Men: 89, Women: 95 },
	{ month: "June", Men: 90, Women: 93 },
	{ month: "July", Men: 94, Women: 98 },
	{ month: "August", Men: 94, Women: 98 },
];

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

export function TestChart() {
	return (
		<Card className="bg-transparent border-none shadow-none">
			<CardHeader className="pb-1 pt-2 px-2">
				<CardTitle className="text-lg">
					Bar Chart - Gender Based Salary
				</CardTitle>
				<CardDescription className="text-sm">
					January - December 2024
				</CardDescription>
			</CardHeader>
			<CardContent className="p-2 flex-1">
				<ChartContainer config={chartConfig} className="h-[220px] w-full">
					<BarChart
						data={chartData}
						margin={{ top: 5, right: 25, bottom: 5, left: 45 }}
						barGap={4}
					>
						<CartesianGrid
							vertical={false}
							strokeDasharray="3 3"
							opacity={0.4}
						/>
						<XAxis
							dataKey="month"
							tickLine={false}
							tickMargin={8}
							axisLine={false}
							tickFormatter={(value) => value.slice(0, 3)}
							fontSize={12}
						/>
						<YAxis
							tickLine={false}
							axisLine={false}
							tickFormatter={(value) => `$${value}k`}
							domain={[0, 150]}
							ticks={[0, 50, 100, 150]}
							fontSize={12}
							width={40}
						/>
						<ChartTooltip
							cursor={false}
							content={({ payload, label }) => {
								if (!payload?.length) return null;
								return (
									<div className="rounded-lg border bg-white p-2 shadow-sm">
										<div className="mb-1 font-medium">{label}</div>
										{payload.map((item) => (
											<div
												key={item.name}
												className="flex items-center gap-1.5"
											>
												<div
													className="h-2.5 w-2.5 rounded-sm"
													style={{ backgroundColor: item.color }}
												/>
												<span className="font-medium">{item.name}</span>
												<span className="ml-auto font-medium">
													${item.value}K
												</span>
											</div>
										))}
									</div>
								);
							}}
						/>
						<Bar
							dataKey="Men"
							fill="hsl(210, 64%, 36%)"
							radius={4}
							maxBarSize={40}
						/>
						<Bar
							dataKey="Women"
							fill="hsl(210, 64%, 48%)"
							radius={4}
							maxBarSize={40}
						/>
					</BarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="pt-1 pb-2 px-2 flex-col items-start gap-2 text-sm">
				<div className="flex gap-2 font-medium leading-none">
					Salary for women trending up by 5.2% this month{" "}
					<TrendingUp className="h-4 w-4" />
				</div>
				<div className="leading-none text-muted-foreground">
					Average salary in thousands (USD)
				</div>
			</CardFooter>
		</Card>
	);
}
