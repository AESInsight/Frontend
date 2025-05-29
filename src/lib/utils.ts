import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function setCompanyId(id: number | null) {
	if (id !== null) {
		localStorage.setItem('companyId', id.toString());
	}
}

export function getCompanyId(): number | null {
	const id = localStorage.getItem('companyId');
	if (!id) return null;
	const parsedId = parseInt(id, 10);
	return isNaN(parsedId) ? null : parsedId;
}

export function clearCompanyId() {
	localStorage.removeItem('companyId');
}
