"use client";

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

// Updated data to show average salary raise percentages for men and women per year
const chartData = [
	{ year: "2019", Men: 3.5, Women: 3.0 },
	{ year: "2020", Men: 4.0, Women: 3.8 },
	{ year: "2021", Men: 4.5, Women: 4.2 },
	{ year: "2022", Men: 5.0, Women: 4.8 },
	{ year: "2023", Men: 5.5, Women: 5.2 },
	{ year: "2024", Men: 6.0, Women: 5.8 },
];

// Updated chartConfig to reflect Men and Women with the consistent color scheme
const chartConfig = {
	Men: {
		label: "Men",
		color: "hsl(210, 64%, 36%)", // Darkest base blue (matches other charts)
	},
	Women: {
		label: "Women",
		color: "hsl(210, 64%, 48%)", // Two steps lighter for contrast
	},
} satisfies ChartConfig;

export function TestChart3() {
	return (
		<Card className="bg-transparent border-none shadow-none">
			<CardHeader className="pb-1 pt-2 px-2">
				<CardTitle className="text-lg">
					Average Salary Raise by Gender
				</CardTitle>
				<CardDescription className="text-sm">
					Showing average salary raise percentages (2019 - 2024)
				</CardDescription>
			</CardHeader>
			<CardContent className="p-2 flex-1">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-[220px] w-full"
				>
					<AreaChart
						accessibilityLayer
						data={chartData}
						margin={{
							left: 12,
							right: 12,
							top: 5,
							bottom: 5,
						}}
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
							domain={[0, 8]} // Adjust domain based on data range
							ticks={[0, 2, 4, 6, 8]}
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
													{item.value}%
												</span>
											</div>
										))}
									</div>
								);
							}}
						/>
						<Area
							dataKey="Women"
							type="natural"
							fill="hsl(210, 64%, 48%)" // Two steps lighter
							fillOpacity={0.4}
							stroke="hsl(210, 64%, 48%)"
							stackId="a"
						/>
						<Area
							dataKey="Men"
							type="natural"
							fill="hsl(210, 64%, 36%)" // Darkest base blue
							fillOpacity={0.4}
							stroke="hsl(210, 64%, 36%)"
							stackId="a"
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="pt-1 pb-2 px-2 flex-col items-start gap-2 text-sm">
				<div className="flex gap-2 font-medium leading-none">
					Salary raises trending up by 8.5% this year{" "}
					<TrendingUp className="h-4 w-4" />
				</div>
				<div className="leading-none text-muted-foreground">
					Based on annual salary adjustments
				</div>
			</CardFooter>
		</Card>
	);
}
