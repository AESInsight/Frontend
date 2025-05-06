"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type SelectProps = {
	options: string[];
	selected: string;
	onChange: (value: string) => void;
	label?: string;
	className?: string;
	placeholder?: string;
};

export function Select({
	options,
	selected,
	onChange,
	label,
	className = "",
	placeholder = "Select...",
}: SelectProps) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className={`relative w-44 text-sm ${className}`} data-testid="select-container">
			{label && <span className="block mb-1" data-testid="select-label">{label}</span>}
			<button
				onClick={() => setIsOpen((prev) => !prev)}
				className="w-full flex items-center justify-between rounded-md border px-3 py-2 bg-white shadow-sm hover:border-muted-foreground focus:outline-none"
				data-testid="select-button"
			>
				<span data-testid="select-value">{selected || placeholder}</span>
				<div
					className={`transition-transform duration-300 ${
						isOpen ? "rotate-180" : "rotate-0"
					}`}
				>
					<ChevronDown className="h-4 w-4" />
				</div>
			</button>

			{isOpen && (
				<div className="absolute z-10 mt-1 w-full rounded-md border bg-white shadow-md" data-testid="select-options">
					<ul className="max-h-48 overflow-y-auto py-1">
						{options.map((option) => (
							<li
								key={option}
								onClick={() => {
									onChange(option);
									setIsOpen(false);
								}}
								className="px-3 py-2 hover:bg-muted-foreground/10 cursor-pointer"
								data-testid={`select-option-${option}`}
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
