export type MonthlyEntry = {
	month: string;
	Men: number;
	Women: number;
	MenCount: number;
	WomenCount: number;
};

export type SalaryEntry = {
	salaryID: number;
	employeeID: number;
	salary: number;
	timestamp: string;
};

export type ChartDataEntry = {
	position: string;
	people: number;
	fill: string;
	value?: number;
	percentage?: string;
};

export type JobSalaryData = {
	jobTitle: string;
	genderData: {
		[gender: string]: {
			averageSalary: number;
			employeeCount: number;
		};
	};
};

export type SalaryRaiseData = {
	employeeID: number;
	gender: string;
	jobTitle: string;
};
