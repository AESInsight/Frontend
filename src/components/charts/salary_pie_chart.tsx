import { useEffect, useState } from "react";
import { Pie, PieChart, Label } from "recharts";
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
import { ChartDataEntry, JobSalaryData } from "@/lib/types/salary";
import {
	fetchAverageSalariesForIndustry,
	fetchIndustries,
} from "@/lib/companyAPI";
import { Select } from "@/components/ui/select";
import { SharedIndustryToggle } from "./toggles/sync_industry_toggle";

interface SalaryPieChartProps {
	sharedIndustry: string;
	setSharedIndustry: (industry: string) => void;
	enabled: boolean;
	onToggle: (checked: boolean) => void;
}

export function SalaryPieChart({
	sharedIndustry,
	setSharedIndustry,
	enabled,
	onToggle,
}: SalaryPieChartProps) {
	const [industries, setIndustries] = useState<string[]>([]);
	const [localIndustry, setLocalIndustry] = useState<string>("");
	const [chartData, setChartData] = useState<ChartDataEntry[]>([]);
	const [totalSalary, setTotalSalary] = useState(0);

	const selectedIndustry = enabled ? sharedIndustry : localIndustry;
	const setSelectedIndustry = enabled ? setSharedIndustry : setLocalIndustry;

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
		const loadSalaryData = async () => {
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

				const transformed: ChartDataEntry[] = rawData
					.map((entry: JobSalaryData, index: number) => {
						let total = 0;
						let count = 0;
						for (const gender in entry.genderData) {
							const stats = entry.genderData[gender];
							total += stats.averageSalary * stats.employeeCount;
							count += stats.employeeCount;
						}
						const avg = count > 0 ? total / count : 0;
						return {
							position: entry.jobTitle,
							value: avg,
							fill: colors[index % colors.length],
							people: count,
						};
					})
					.filter((d) => d.value > 0)
					.sort((a, b) => b.value - a.value);

				const totalValue = transformed.reduce(
					(sum, d) => sum + (d.value ?? 0),
					0
				);

				const withPercent = transformed.map((d) => ({
					...d,
					percentage: (((d.value ?? 0) / totalValue) * 100).toFixed(1),
				}));

				setChartData(withPercent);
				setTotalSalary(totalValue);
			} catch (err) {
				console.error("Failed to fetch salary data", err);
			}
		};

		loadSalaryData();
	}, [selectedIndustry, industries]);

	const chartConfig: ChartConfig = chartData.reduce((acc, d) => {
		acc[d.position] = { label: d.position, color: d.fill };
		return acc;
	}, {} as ChartConfig);

	const averageSalary =
		chartData.length > 0 ? totalSalary / chartData.length : 0;

	return (
		<Card className="bg-transparent border-none shadow-none">
			<CardHeader className="px-4 flex items-start justify-between">
				<div>
					<CardTitle className="text-lg">
						Salary Distribution by Position
					</CardTitle>
					<CardDescription className="text-sm">
						Sorted by Industry
					</CardDescription>
				</div>
				<div className="flex flex-col items-end gap-1 w-42">
					<Select
						options={industries}
						selected={selectedIndustry}
						onChange={setSelectedIndustry}
						placeholder="Select an Industry"
					/>
					<SharedIndustryToggle enabled={enabled} onToggle={onToggle} />
				</div>
			</CardHeader>
			<CardContent className="p-2 flex-1">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-[250px] w-full"
				>
					<PieChart margin={{ left: 12, right: 12, top: 5, bottom: 5 }}>
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
										<div className="mt-1 font-medium">
											Avg Salary: DKK {Math.round(data.value)}
										</div>
										<div className="text-muted-foreground text-xs">
											{data.percentage}% of total
										</div>
									</div>
								);
							}}
						/>
						<Pie
							data={chartData}
							dataKey="value"
							nameKey="position"
							innerRadius={75}
							outerRadius="85%"
							strokeWidth={3}
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
													{`DKK ${(averageSalary / 1000).toFixed(1)}k`}
												</tspan>
												<tspan
													x={viewBox.cx}
													y={cy + 18}
													className="fill-muted-foreground text-sm"
												>
													Avg Salary
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
					Based on current market rates
				</div>
			</CardFooter>
		</Card>
	);
}
