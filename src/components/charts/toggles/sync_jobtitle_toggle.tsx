import { Checkbox } from "@/components/ui/checkbox";

interface SharedJobTitleToggleProps {
	enabled: boolean;
	onToggle: (checked: boolean) => void;
}

export function SharedJobTitleToggle({
	enabled,
	onToggle,
}: SharedJobTitleToggleProps) {
	return (
		<div className="flex items-center gap-2">
			<label htmlFor="shared-job-title-toggle" className="text-sm">
				Sync selected job title
			</label>
			<Checkbox
				id="shared-job-title-toggle"
				checked={enabled}
				onCheckedChange={(checked) => onToggle(!!checked)}
			/>
		</div>
	);
}
