import { Checkbox } from "@/components/ui/checkbox";

interface SharedIndustryToggleProps {
	enabled: boolean;
	onToggle: (checked: boolean) => void;
}

export function SharedIndustryToggle({
	enabled,
	onToggle,
}: SharedIndustryToggleProps) {
	return (
		<div className="flex items-center gap-2">
			<label htmlFor="shared-industry-toggle" className="text-sm">
				Sync selected industry
			</label>
			<Checkbox
				id="shared-industry-toggle"
				checked={enabled}
				onCheckedChange={(checked) => onToggle(!!checked)}
			/>
		</div>
	);
}
