import { createContext, useContext, useState, ReactNode } from "react";

interface ChartContextProps {
	sharedJobTitle: string;
	setSharedJobTitle: (jobTitle: string) => void;
	isJobTitleSyncEnabled: boolean;
	toggleJobTitleSyncEnabled: (checked: boolean) => void;
	sharedIndustry: string;
	setSharedIndustry: (industry: string) => void;
	isIndustrySyncEnabled: boolean;
	toggleIndustrySyncEnabled: (checked: boolean) => void;
}

const ChartContext = createContext<ChartContextProps | undefined>(undefined);

export function ChartProvider({ children }: { children: ReactNode }) {
	const [sharedJobTitle, setSharedJobTitle] = useState<string>("");
	const [isJobTitleSyncEnabled, setIsJobTitleSyncEnabled] =
		useState<boolean>(false);
	const [sharedIndustry, setSharedIndustry] = useState<string>("");
	const [isIndustrySyncEnabled, setIsIndustrySyncEnabled] =
		useState<boolean>(false);

	const toggleJobTitleSyncEnabled = (checked: boolean) => {
		setIsJobTitleSyncEnabled(checked);
	};

	const toggleIndustrySyncEnabled = (checked: boolean) => {
		setIsIndustrySyncEnabled(checked);
	};

	return (
		<ChartContext.Provider
			value={{
				sharedJobTitle,
				setSharedJobTitle,
				isJobTitleSyncEnabled,
				toggleJobTitleSyncEnabled,
				sharedIndustry,
				setSharedIndustry,
				isIndustrySyncEnabled,
				toggleIndustrySyncEnabled,
			}}
		>
			{children}
		</ChartContext.Provider>
	);
}

export function useChartContext() {
	const context = useContext(ChartContext);
	if (!context) {
		throw new Error("useChartContext must be used within ChartProvider");
	}
	return context;
}
