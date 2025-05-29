import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import HomePage from "../../../components/pages/homepage";
import { useIsDesktop } from "../../../lib/context/desktop_context";
import { useAuth } from "../../../lib/context/auth_context";

// Mock the desktop context
vi.mock("../../../lib/context/desktop_context", () => ({
	useIsDesktop: vi.fn(),
}));

// Mock the auth context
vi.mock("../../../lib/context/auth_context", () => ({
	useAuth: vi.fn(),
}));

// Mock the ChartProvider and GroupedCharts
vi.mock("../../../components/charts/context/chart_context", () => ({
	ChartProvider: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="chart-provider">{children}</div>
	),
}));

vi.mock("../../../components/charts/grouped_charts", () => ({
	GroupedCharts: () => <div data-testid="grouped-charts">Mocked Charts</div>,
}));

// Create a wrapper component that provides the auth context and router
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
	return <MemoryRouter>{children}</MemoryRouter>;
};

describe("HomePage", () => {
	beforeEach(() => {
		// Mock auth context
		vi.mocked(useAuth).mockReturnValue({
			login: vi.fn(),
			isAuthenticated: false,
			token: null,
			logout: vi.fn(),
		});
	});

	it("renders the homepage content", () => {
		// Mock desktop context to true
		vi.mocked(useIsDesktop).mockReturnValue(true);

		render(<HomePage />, { wrapper: TestWrapper });

		// Check for main heading and welcome text
		expect(screen.getByText("Welcome to AES-Insight")).toBeInTheDocument();
		expect(
			screen.getByText("Your trusted partner in data security and insights.")
		).toBeInTheDocument();

		// Check for footer
		expect(
			screen.getByText("2025 AES-Insight. All rights reserved.")
		).toBeInTheDocument();

		// Check for charts
		expect(screen.getByTestId("chart-provider")).toBeInTheDocument();
		expect(screen.getByTestId("grouped-charts")).toBeInTheDocument();
	});

	it("shows hamburger menu on mobile", () => {
		// Mock desktop context to false
		vi.mocked(useIsDesktop).mockReturnValue(false);

		render(<HomePage />, { wrapper: TestWrapper });

		// Check for hamburger menu button
		const menuButton = screen.getByRole("button", { name: /open menu/i });
		expect(menuButton).toBeInTheDocument();

		// Click the menu button
		fireEvent.click(menuButton);

		// Check for menu items
		expect(screen.getByText("About Us")).toBeInTheDocument();
		expect(screen.getByText("Contact")).toBeInTheDocument();

		// Check for close button
		const closeButton = screen.getByRole("button", { name: /close menu/i });
		expect(closeButton).toBeInTheDocument();

		// Click close button
		fireEvent.click(closeButton);

		// Menu should be closed
		expect(screen.queryByText("About Us")).not.toBeInTheDocument();
		expect(screen.queryByText("Contact")).not.toBeInTheDocument();
	});

	it("renders without sidebar on mobile", () => {
		// Mock desktop context to false
		vi.mocked(useIsDesktop).mockReturnValue(false);

		render(<HomePage />, { wrapper: TestWrapper });

		// Check that the page still renders correctly
		expect(screen.getByText("Welcome to AES-Insight")).toBeInTheDocument();
		expect(screen.getByTestId("grouped-charts")).toBeInTheDocument();
	});
});
