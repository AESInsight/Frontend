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
