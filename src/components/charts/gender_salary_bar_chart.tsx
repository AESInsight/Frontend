import { useEffect, useState } from "react";
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
import {
	fetchAllSalaries,
	fetchEmployees,
	fetchJobTitles,
} from "@/lib/employeeAPI";
import { MonthlyEntry, SalaryEntry } from "@/lib/types/salary";
import { Select } from "@/components/ui/select";

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

export function GenderSalaryBarChart() {
	const [chartData, setChartData] = useState<
		{ month: string; Men: number; Women: number }[]
	>([]);
	const [jobTitles, setJobTitles] = useState<string[]>([]);
	const [selectedJobTitle, setSelectedJobTitle] = useState<string>("");

	useEffect(() => {
		const loadJobTitles = async () => {
			try {
				const response = await fetchJobTitles();
				const titles = response.jobTitles;
				setJobTitles(Array.isArray(titles) ? titles : []);
				if (!selectedJobTitle && titles.length > 0) {
					setSelectedJobTitle("");
				}
			} catch (err) {
				console.error("Failed to fetch job titles", err);
			}
		};

		loadJobTitles();
	}, [selectedJobTitle]);

	useEffect(() => {
		const loadSalaries = async () => {
			try {
				const [salaries, employees] = await Promise.all([
					fetchAllSalaries(),
					fetchEmployees(),
				]);

				const employeeGenderMap: Record<
					number,
					{ gender: "Men" | "Women"; jobTitle: string }
				> = {};
				employees.forEach(
					(emp: { employeeID: number; gender: string; jobTitle: string }) => {
						employeeGenderMap[emp.employeeID] = {
							gender: emp.gender === "Female" ? "Women" : "Men",
							jobTitle: emp.jobTitle,
						};
					}
				);

				const monthlySums: Record<string, MonthlyEntry> = {};

				salaries.forEach((item: SalaryEntry) => {
					const emp = employeeGenderMap[item.employeeID];
					if (!emp || emp.jobTitle !== selectedJobTitle) return;

					const date = new Date(item.timestamp);
					const month = date.toLocaleDateString("da-DK", {
						month: "long",
						year: "numeric",
					});

					const gender = emp.gender;

					if (!monthlySums[month]) {
						monthlySums[month] = {
							month,
							Men: 0,
							Women: 0,
							MenCount: 0,
							WomenCount: 0,
						};
					}

					monthlySums[month][gender] += item.salary;
					monthlySums[month][`${gender}Count`]++;
				});

				const finalData = Object.values(monthlySums).map((entry) => ({
					month: entry.month,
					Men: Math.round(entry.Men / (entry.MenCount || 1)),
					Women: Math.round(entry.Women / (entry.WomenCount || 1)),
				}));

				finalData.sort((a, b) => {
					const getIndex = (label: string) => {
						const [monthName, year] = label.split(" ");
						const months = [
							"januar",
							"februar",
							"marts",
							"april",
							"maj",
							"juni",
							"juli",
							"august",
							"september",
							"oktober",
							"november",
							"december",
						];
						return (
							parseInt(year) * 100 + months.indexOf(monthName.toLowerCase())
						);
					};
					return getIndex(a.month) - getIndex(b.month);
				});

				setChartData(finalData);
			} catch (err) {
				console.error("Could not load chart data", err);
			}
		};

		if (selectedJobTitle) loadSalaries();
	}, [selectedJobTitle]);

	return (
		<Card className="bg-transparent border-none shadow-none">
			<CardHeader className="px-4 flex items-center justify-between">
				<div>
					<CardTitle className="text-lg">
						Gender-Based Salary Over Time
					</CardTitle>
					<CardDescription className="text-sm">
						Filtered by Job Title
					</CardDescription>
				</div>
				<Select
					options={jobTitles}
					selected={selectedJobTitle}
					onChange={setSelectedJobTitle}
					placeholder="Select a Job Title"
				/>
			</CardHeader>
			<CardContent className="p-2 flex-1">
				<ChartContainer config={chartConfig} className="h-[250px] w-full">
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
							tickFormatter={(value) => value.split(" ")[0].slice(0, 3)}
							fontSize={12}
						/>
						<YAxis
							tickLine={false}
							axisLine={false}
							tickFormatter={(value) => `DKK ${value / 1000}k`}
							domain={[0, 100000]}
							ticks={[0, 25000, 50000, 75000, 100000]}
							fontSize={12}
							width={40}
						/>
						<ChartTooltip
							cursor={false}
							content={({ payload, label }) => {
								if (!payload?.length) return null;
								return (
									<div className="rounded-md border bg-white px-3 py-2 shadow-md text-sm">
										<div className="mb-1 font-semibold text-black">{label}</div>
										{payload.map((item) => (
											<div
												key={item.name}
												className="flex items-center justify-between gap-2"
											>
												<div className="flex items-center gap-2">
													<div
														className="h-2 w-2 rounded-full"
														style={{ backgroundColor: item.color }}
													/>
													<span>{item.name}</span>
												</div>
												<span className="font-medium">DKK {item.value}</span>
											</div>
										))}
									</div>
								);
							}}
						/>
						<Bar
							dataKey="Men"
							fill={chartConfig.Men.color}
							radius={4}
							maxBarSize={40}
						/>
						<Bar
							dataKey="Women"
							fill={chartConfig.Women.color}
							radius={4}
							maxBarSize={40}
						/>
					</BarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="pt-1 pb-2 px-2 flex-col items-start gap-2 text-sm">
				<div className="leading-none text-muted-foreground">
					Average salary in thousands (DKK)
				</div>
			</CardFooter>
		</Card>
	);
}
