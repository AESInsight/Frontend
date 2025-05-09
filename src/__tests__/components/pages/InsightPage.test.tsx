import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import InsightPage from "../../../components/pages/insightpage";
import { TestWrapper } from "../../test-utils";

// Mock the useQuery hook
jest.mock("@tanstack/react-query", () => ({
  useQuery: () => ({
    data: [],
    isLoading: false,
    error: null
  })
}));

describe("InsightPage", () => {
  test("renders insight page", () => {
    render(
      <TestWrapper>
        <InsightPage />
      </TestWrapper>
    );
    expect(screen.getByText(/employee insights/i)).toBeInTheDocument();
  });

  test("renders with correct structure", () => {
    render(
      <TestWrapper>
        <InsightPage />
      </TestWrapper>
    );
    
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("insight-page")).toBeInTheDocument();
    expect(screen.getByTestId("insight-content")).toBeInTheDocument();
  });

  test("renders employee table", () => {
    render(
      <TestWrapper>
        <InsightPage />
      </TestWrapper>
    );
    
    expect(screen.getByTestId("employee-table")).toBeInTheDocument();
  });
});