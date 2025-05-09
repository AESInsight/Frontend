import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AboutPage from "../../../components/pages/aboutpage";
import { TestWrapper } from "../../test-utils";

describe("AboutPage Component", () => {
  test("renders main sections", () => {
    render(
      <TestWrapper>
        <AboutPage />
      </TestWrapper>
    );
    expect(screen.getByText(/about us/i)).toBeInTheDocument();
  });

  test("renders with correct structure", () => {
    render(
      <TestWrapper>
        <AboutPage />
      </TestWrapper>
    );
    
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("about-page")).toBeInTheDocument();
    expect(screen.getByTestId("about-content")).toBeInTheDocument();
  });
});