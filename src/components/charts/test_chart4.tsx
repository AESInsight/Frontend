"use client";

import { TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

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
	{ skill: "Technical", senior: 95, junior: 60 },
	{ skill: "Leadership", senior: 85, junior: 40 },
	{ skill: "Communication", senior: 90, junior: 70 },
	{ skill: "Problem Solving", senior: 92, junior: 65 },
	{ skill: "Project Management", senior: 88, junior: 45 },
	{ skill: "Innovation", senior: 85, junior: 55 },
];

const chartConfig = {
	senior: {
		label: "Senior Position",
		color: "hsl(210, 64%, 56%)", // Base light blue (matches previous charts)
	},
	junior: {
		label: "Junior Position",
		color: "hsl(210, 64%, 66%)", // Lighter accent (matches "Women" in TestChart)
	},
} satisfies ChartConfig;

export function TestChart4() {
	return (
		<Card className="bg-transparent border-none shadow-none">
			<CardHeader className="pb-1 pt-2 px-2">
				<CardTitle className="text-lg">Position Skill Requirements</CardTitle>
				<CardDescription className="text-sm">
					Expected Competency Levels (%)
				</CardDescription>
			</CardHeader>
			<CardContent className="p-2 flex-1">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-[220px] w-full"
				>
					<RadarChart data={chartData}>
						<ChartTooltip
							cursor={false}
							content={({ active, payload }) => {
								if (!active || !payload?.length) return null;
								return (
									<div className="rounded-md bg-white px-2 py-1 shadow-sm">
										<div>{payload[0].payload.skill}</div>
										{payload.map((entry) => (
											<div key={entry.name}>
												{entry.name}: {entry.value}%
											</div>
										))}
									</div>
								);
							}}
						/>
						<PolarGrid
							className="stroke-muted"
							gridType="circle"
							strokeDasharray="3 3"
							strokeOpacity={0.4}
						/>
						<PolarAngleAxis
							dataKey="skill"
							className="text-sm" // Keeping the black text as previously updated
							tickLine={false}
						/>
						<Radar
							name="Senior Position"
							dataKey="senior"
							stroke="hsl(210, 64%, 56%)" // Base light blue
							fill="hsl(210, 64%, 56%)"
							fillOpacity={0.3}
						/>
						<Radar
							name="Junior Position"
							dataKey="junior"
							stroke="hsl(210, 64%, 66%)" // Lighter accent
							fill="hsl(210, 64%, 66%)"
							fillOpacity={0.3}
						/>
					</RadarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="pt-1 pb-2 px-2 flex-col items-start gap-2 text-sm">
				<div className="flex gap-2 font-medium leading-none">
					Senior skill requirements increased by 12% this year{" "}
					<TrendingUp className="h-4 w-4" />
				</div>
				<div className="leading-none text-muted-foreground">
					Based on current job market demands
				</div>
			</CardFooter>
		</Card>
	);
}
