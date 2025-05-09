import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Homepage from "../../../components/pages/homepage";

// Mock the ChartProvider
jest.mock("../../../components/charts/chart_provider", () => ({
  ChartProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

describe("Homepage", () => {
  test("renders homepage", () => {
    render(<Homepage />);
    expect(screen.getByText(/welcome to aes-insight/i)).toBeInTheDocument();
  });
});