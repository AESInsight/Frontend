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
import { EmployeeData, MonthlyEntry, SalaryEntry } from "@/lib/types/salary";
import { Select } from "@/components/ui/select";
import { SharedJobTitleToggle } from "./toggles/sync_jobtitle_toggle";

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

interface GenderSalaryBarChartProps {
	sharedJobTitle: string;
	setSharedJobTitle: (jobTitle: string) => void;
	enabled: boolean;
	onToggle: (checked: boolean) => void;
}

export function GenderSalaryBarChart({
	sharedJobTitle,
	setSharedJobTitle,
	enabled,
	onToggle,
}: GenderSalaryBarChartProps) {
	const [chartData, setChartData] = useState<
		{ month: string; Men: number; Women: number }[]
	>([]);
	const [jobTitles, setJobTitles] = useState<string[]>([]);
	const [localJobTitle, setLocalJobTitle] = useState<string>("");

	const selectedJobTitle = enabled ? sharedJobTitle : localJobTitle;
	const setSelectedJobTitle = enabled ? setSharedJobTitle : setLocalJobTitle;

	useEffect(() => {
		const loadJobTitles = async () => {
			try {
				const response = await fetchJobTitles();
				const titles = response.jobTitles;
				const allTitles = [
					"All",
					...titles.filter((t: string) => t.trim() !== ""),
				];
				setJobTitles(allTitles);
			} catch (err) {
				console.error("Failed to fetch job titles", err);
			}
		};
		loadJobTitles();
	}, []);

	useEffect(() => {
		const loadSalaries = async () => {
			try {
				const [salaries, employees] = await Promise.all([
					fetchAllSalaries(),
					fetchEmployees(),
				]);

				const employeeMap: Record<
					number,
					{ gender: "Men" | "Women"; jobTitle: string }
				> = {};
				employees.forEach((emp: EmployeeData) => {
					employeeMap[emp.employeeID] = {
						gender: emp.gender === "Female" ? "Women" : "Men",
						jobTitle: emp.jobTitle,
					};
				});

				const monthlySums: Record<string, MonthlyEntry> = {};

				salaries.forEach((item: SalaryEntry) => {
					const emp = employeeMap[item.employeeID];
					if (!emp) return;
					if (
						selectedJobTitle &&
						selectedJobTitle !== "All" &&
						emp.jobTitle !== selectedJobTitle
					)
						return;

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

		loadSalaries();
	}, [selectedJobTitle]);

	return (
		<Card className="bg-transparent border-none shadow-none">
			<CardHeader className="px-4 flex items-start justify-between">
				<div>
					<CardTitle className="text-lg">
						Gender-Based Salary Over Time
					</CardTitle>
					<CardDescription className="text-sm">
						Filtered by Job Title
					</CardDescription>
				</div>
				<div className="flex flex-col items-end gap-1">
					<Select
						options={jobTitles}
						selected={selectedJobTitle}
						onChange={setSelectedJobTitle}
						placeholder="Select a Job Title"
					/>
					<SharedJobTitleToggle enabled={enabled} onToggle={onToggle} />
				</div>
			</CardHeader>
			<CardContent className="p-2 flex-1">
				<ChartContainer config={chartConfig} className="h-[250px] w-full">
					<BarChart
						data={chartData}
						margin={{ left: 12, right: 12, top: 5, bottom: 5 }}
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
			<CardFooter className="p-2 flex-col items-start gap-2 text-sm">
				<div className="flex gap-2 font-medium leading-none">
					Average salary in thousands (DKK)
				</div>
			</CardFooter>
		</Card>
	);
}
