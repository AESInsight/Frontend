import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const setCompanyId = (companyId: number | null) => {
	if (companyId) {
		localStorage.setItem('companyId', companyId.toString());
	}
};

export const getCompanyId = (): number | null => {
	const companyId = localStorage.getItem('companyId');
	return companyId ? parseInt(companyId) : null;
};

export const clearCompanyId = () => {
	localStorage.removeItem('companyId');
};
