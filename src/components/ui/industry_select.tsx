"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type IndustrySelectProps = {
	options: string[];
	selected: string;
	onChange: (value: string) => void;
};

export function IndustrySelect({
	options,
	selected,
	onChange,
}: IndustrySelectProps) {
	const [isOpen, setIsOpen] = useState(false);

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
