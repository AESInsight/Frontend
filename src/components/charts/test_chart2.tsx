"use client";

import * as React from "react";
import { TrendingUp, ChevronDown, ChevronUp } from "lucide-react";
import { Pie, PieChart, Label } from "recharts";

import {
	Card,
	CardContent,
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

function IndustrySelect({
	options,
	selected,
	onChange,
}: {
	options: string[];
	selected: string;
	onChange: (value: string) => void;
}) {
	const [isOpen, setIsOpen] = React.useState(false);

	return (
		<div className="relative w-44 text-sm">
			<button
				onClick={() => setIsOpen((prev) => !prev)}
				className="w-full flex items-center justify-between rounded-md border px-3 py-2 bg-white shadow-sm hover:border-muted-foreground focus:outline-none"
			>
				<span>{selected || "Select industry"}</span>
				{isOpen ? (
					<ChevronUp className="h-4 w-4" />
				) : (
					<ChevronDown className="h-4 w-4" />
				)}
			</button>

			{isOpen && (
				<div className="absolute z-10 mt-1 w-full rounded-md border bg-white shadow-md">
					<ul className="max-h-48 overflow-y-auto py-1">
						{options.map((option) => (
							<li
								key={option}
								onClick={() => {
									onChange(option);
									setIsOpen(false);
								}}
								className="px-3 py-2 hover:bg-muted-foreground/10 cursor-pointer"
							>
								{option}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}

export function TestChart2() {
	const [industries, setIndustries] = React.useState<string[]>([]);
	const [selectedIndustry, setSelectedIndustry] = React.useState<string>("IT");
	const [chartData, setChartData] = React.useState<ChartDataEntry[]>([]);
	const [totalSalary, setTotalSalary] = React.useState(0);

	React.useEffect(() => {
		const loadIndustries = async () => {
			try {
				const data = await fetchIndustries();
				const cleaned = data.filter((i) => i.trim() !== "");
				setIndustries(cleaned);
				if (!cleaned.includes(selectedIndustry)) {
					setSelectedIndustry(cleaned[0]);
				}
			} catch (err) {
				console.error("Failed to fetch industries", err);
			}
		};

		loadIndustries();
	}, [selectedIndustry]);

	React.useEffect(() => {
		if (!selectedIndustry) return;

		const loadSalaryData = async () => {
			try {
				const rawData = await fetchAverageSalariesForIndustry(selectedIndustry);

				const colors = [
					"hsl(210, 64%, 36%)",
					"hsl(210, 64%, 42%)",
					"hsl(210, 64%, 48%)",
					"hsl(210, 64%, 54%)",
					"hsl(210, 64%, 60%)",
				];

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
						};
					})
					.filter((d: { value: number }) => d.value > 0)
					.sort(
						(a: { value: number }, b: { value: number }) => b.value - a.value
					);

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
	}, [selectedIndustry]);

	const chartConfig: ChartConfig = chartData.reduce((acc, d) => {
		acc[d.position] = { label: d.position, color: d.fill };
		return acc;
	}, {} as ChartConfig);

	const averageSalary =
		chartData.length > 0 ? totalSalary / chartData.length : 0;

	return (
		<Card className="bg-transparent border-none shadow-none">
			<CardHeader className="p-2">
				<div className="flex items-center justify-between gap-4">
					<CardTitle className="text-lg whitespace-nowrap">
						Salary Distribution by Position
					</CardTitle>
					<div className="flex items-center gap-2">
						<span>Select industry</span>
						<IndustrySelect
							options={industries}
							selected={selectedIndustry}
							onChange={setSelectedIndustry}
						/>
					</div>
				</div>
			</CardHeader>

			<CardContent className="p-2">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-[320px] w-full"
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
							innerRadius={65}
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
