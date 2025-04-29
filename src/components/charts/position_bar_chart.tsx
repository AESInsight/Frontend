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
import {
	fetchAverageSalariesForIndustry,
	fetchIndustries,
} from "@/lib/companyAPI";
import { JobSalaryData } from "@/lib/types/salary";
import { Select } from "@/components/ui/select";

const chartConfig = {
	people: {
		label: "People",
	},
} satisfies ChartConfig;

export function PositionBarChart() {
	const [industries, setIndustries] = useState<string[]>([]);
	const [selectedIndustry, setSelectedIndustry] = useState<string>("");
	const [chartData, setChartData] = useState<
		{
			position: string;
			people: number;
			fill: string;
		}[]
	>([]);

	useEffect(() => {
		const loadIndustries = async () => {
			try {
				const data = await fetchIndustries();
				const cleaned = data.filter((i) => i.trim() !== "");
				setIndustries(cleaned);
				if (selectedIndustry === "" && cleaned.length > 0) {
					setSelectedIndustry("");
				}
			} catch (err) {
				console.error("Failed to fetch industries", err);
			}
		};

		loadIndustries();
	}, [selectedIndustry]);

	useEffect(() => {
		if (!selectedIndustry) return;

		const loadData = async () => {
			try {
				const rawData = await fetchAverageSalariesForIndustry(selectedIndustry);

				const colors = [
					"hsl(210, 64%, 36%)",
					"hsl(210, 64%, 42%)",
					"hsl(210, 64%, 48%)",
					"hsl(210, 64%, 54%)",
					"hsl(210, 64%, 60%)",
				];

				const grouped = rawData
					.map((entry: JobSalaryData, index: number) => {
						let total = 0;
						for (const gender in entry.genderData) {
							total += entry.genderData[gender].employeeCount;
						}
						return {
							position: entry.jobTitle,
							people: total,
							fill: colors[index % colors.length],
						};
					})
					.filter((d: { people: number }) => d.people > 0)
					.sort(
						(a: { people: number }, b: { people: number }) =>
							b.people - a.people
					);

				setChartData(grouped);
			} catch (err) {
				console.error("Failed to fetch job data", err);
			}
		};

		loadData();
	}, [selectedIndustry]);

	return (
		<Card className="bg-transparent border-none shadow-none">
			<CardHeader className="px-4 flex items-center justify-between">
				<div>
					<CardTitle className="text-lg">
						Number of People by Job Position
					</CardTitle>
					<CardDescription className="text-sm">
						Employee distribution as of April 2025
					</CardDescription>
				</div>
				<Select
					options={industries}
					selected={selectedIndustry}
					onChange={setSelectedIndustry}
					placeholder="Select an Industry"
				/>
			</CardHeader>

			<CardContent className="p-2 flex-1">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-[250px] w-full"
				>
					<BarChart
						data={chartData}
						layout="vertical"
						margin={{ left: 12, right: 12, top: 5, bottom: 5 }}
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
							domain={[0, Math.max(...chartData.map((d) => d.people), 10) + 5]}
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
							isAnimationActive
						/>
					</BarChart>
				</ChartContainer>
			</CardContent>

			<CardFooter className="pt-1 pb-2 px-2 flex-col items-start gap-2 text-sm">
				<div className="flex gap-2 font-medium leading-none">
					Software Engineers increased by 12% this year
					<TrendingUp className="h-4 w-4" />
				</div>
				<div className="leading-none text-muted-foreground">
					Based on current hiring trends
				</div>
			</CardFooter>
		</Card>
	);
}
