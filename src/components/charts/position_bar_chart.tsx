import { useEffect, useState } from "react";
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

interface PositionBarChartProps {
	sharedIndustry: string;
	setSharedIndustry: (industry: string) => void;
	industrySyncEnabled: boolean;
}

export function PositionBarChart({
	sharedIndustry,
	setSharedIndustry,
	industrySyncEnabled,
}: PositionBarChartProps) {
	const [industries, setIndustries] = useState<string[]>([]);
	const [localIndustry, setLocalIndustry] = useState<string>("");
	const [chartData, setChartData] = useState<
		{
			position: string;
			people: number;
			fill: string;
		}[]
	>([]);

	const selectedIndustry = industrySyncEnabled ? sharedIndustry : localIndustry;
	const setSelectedIndustry = industrySyncEnabled
		? setSharedIndustry
		: setLocalIndustry;

	useEffect(() => {
		const loadIndustries = async () => {
			try {
				const data = await fetchIndustries();
				const cleaned = ["All", ...data.filter((i) => i.trim() !== "")];
				setIndustries(cleaned);
			} catch (err) {
				console.error("Failed to fetch industries", err);
			}
		};

		loadIndustries();
	}, []);

	useEffect(() => {
		const loadData = async () => {
			try {
				const colors = [
					"hsl(210, 64%, 36%)",
					"hsl(210, 64%, 42%)",
					"hsl(210, 64%, 48%)",
					"hsl(210, 64%, 54%)",
					"hsl(210, 64%, 60%)",
				];

				let rawData: JobSalaryData[] = [];

				if (!selectedIndustry || selectedIndustry === "All") {
					const validIndustries = industries.filter((i) => i !== "All");
					const allData: JobSalaryData[] = [];
					for (const industry of validIndustries) {
						const industryData =
							await fetchAverageSalariesForIndustry(industry);
						allData.push(...industryData);
					}
					rawData = allData;
				} else {
					rawData = await fetchAverageSalariesForIndustry(selectedIndustry);
				}

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
					.filter((d) => d.people > 0)
					.sort((a, b) => b.people - a.people);

				setChartData(grouped);
			} catch (err) {
				console.error("Failed to fetch job data", err);
			}
		};

		loadData();
	}, [selectedIndustry, industries]);

	return (
		<Card className="bg-transparent border-none shadow-none">
			<CardHeader className="px-4 flex items-center justify-between">
				<div>
					<CardTitle className="text-lg">
						Number of People by Job Position
					</CardTitle>
					<CardDescription className="text-sm">
						Filtered by Industry
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
					Based on current hiring trends
				</div>
			</CardFooter>
		</Card>
	);
}
