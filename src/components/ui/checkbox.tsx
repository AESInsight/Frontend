import * as React from "react";

interface CheckboxProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
	label?: string;
	onCheckedChange?: (checked: boolean) => void;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
	({ label, className = "", checked, onCheckedChange, ...props }, ref) => {
		const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			if (onCheckedChange) {
				onCheckedChange(event.target.checked);
			}
		};

		return (
			<label
				className={`inline-flex items-center gap-2 cursor-pointer ${className}`}
			>
				<input
					type="checkbox"
					ref={ref}
					checked={checked}
					onChange={handleChange}
					className="h-4 w-4 rounded border border-black cursor-pointer"
					{...props}
				/>
				{label && <span className="text-sm">{label}</span>}
			</label>
		);
	}
);

Checkbox.displayName = "Checkbox";
