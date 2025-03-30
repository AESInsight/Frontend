"use client";

import { TrendingUp } from "lucide-react";
import { LabelList, RadialBar, RadialBarChart } from "recharts";

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

// Define chart data with a subtle color shift within blue tones
const chartData = [
	{
		name: "Engineering Lead",
		value: 145,
		fill: "hsl(210, 64%, 56%)", // Base light blue (Engineering)
	},
	{
		name: "Senior Engineer",
		value: 125,
		fill: "hsl(210, 64%, 56%)", // Same as Engineering Lead
	},
	{
		name: "Marketing Director",
		value: 115,
		fill: "hsl(210, 64%, 60%)", // Slightly lighter (Marketing)
	},
	{
		name: "Marketing Lead",
		value: 95,
		fill: "hsl(210, 64%, 60%)", // Same as Marketing Director
	},
	{
		name: "Sales Director",
		value: 110,
		fill: "hsl(210, 64%, 64%)", // Lighter (Sales)
	},
	{
		name: "Sales Lead",
		value: 85,
		fill: "hsl(210, 64%, 64%)", // Same as Sales Director
	},
	{
		name: "Design Lead",
		value: 92,
		fill: "hsl(210, 64%, 68%)", // Even lighter (Design)
	},
	{
		name: "Senior Designer",
		value: 78,
		fill: "hsl(210, 64%, 68%)", // Same as Design Lead
	},
	{
		name: "Support Lead",
		value: 75,
		fill: "hsl(210, 64%, 72%)", // Lightest (Support)
	},
	{
		name: "Support Specialist",
		value: 65,
		fill: "hsl(210, 64%, 72%)", // Same as Support Lead
	},
];

// Update chartConfig to reflect the new colors
const chartConfig = {
	"Engineering Lead": {
		label: "Engineering Lead",
		color: "hsl(210, 64%, 56%)",
	},
	"Senior Engineer": {
		label: "Senior Engineer",
		color: "hsl(210, 64%, 56%)",
	},
	"Marketing Director": {
		label: "Marketing Director",
		color: "hsl(210, 64%, 60%)",
	},
	"Marketing Lead": {
		label: "Marketing Lead",
		color: "hsl(210, 64%, 60%)",
	},
	"Sales Director": {
		label: "Sales Director",
		color: "hsl(210, 64%, 64%)",
	},
	"Sales Lead": {
		label: "Sales Lead",
		color: "hsl(210, 64%, 64%)",
	},
	"Design Lead": {
		label: "Design Lead",
		color: "hsl(210, 64%, 68%)",
	},
	"Senior Designer": {
		label: "Senior Designer",
		color: "hsl(210, 64%, 68%)",
	},
	"Support Lead": {
		label: "Support Lead",
		color: "hsl(210, 64%, 72%)",
	},
	"Support Specialist": {
		label: "Support Specialist",
		color: "hsl(210, 64%, 72%)",
	},
} satisfies ChartConfig;

export function TestChart3() {
	return (
		<Card className="bg-transparent border-none shadow-none">
			<CardHeader className="pb-1 pt-2 px-2">
				<CardTitle className="text-lg">
					Department Salary Distribution
				</CardTitle>
				<CardDescription className="text-sm">
					Average Annual Salary (in thousands USD)
				</CardDescription>
			</CardHeader>
			<CardContent className="p-2 flex-1">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-[220px] w-full"
				>
					<RadialBarChart
						data={chartData}
						startAngle={-90}
						endAngle={270}
						innerRadius={40}
						outerRadius={100}
						margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
						barCategoryGap={0}
					>
						<ChartTooltip
							cursor={false}
							content={({ active, payload }) => {
								if (!active || !payload?.length) return null;
								const data = payload[0].payload;
								return (
									<div className="rounded-md bg-white px-2 py-1 shadow-sm">
										<div>{data.name}</div>
										<div>${data.value}k</div>
									</div>
								);
							}}
						/>
						<RadialBar
							dataKey="value"
							background={{ fill: "hsl(210, 64%, 80%)" }} // Very light blue background
							stackId="value"
						>
							<LabelList
								position="insideStart"
								dataKey="name"
								className="fill-foreground capitalize"
								fontSize={12}
							/>
						</RadialBar>
					</RadialBarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="pt-1 pb-2 px-2 flex-col items-start gap-2 text-sm">
				<div className="flex gap-2 font-medium leading-none">
					Engineering salaries up by 8.5% this year{" "}
					<TrendingUp className="h-4 w-4" />
				</div>
				<div className="leading-none text-muted-foreground">
					Based on current market rates
				</div>
			</CardFooter>
		</Card>
	);
}
