import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ServicePage from "../../../components/pages/servicepage";
import { TestWrapper } from "../../test-utils";

describe("ServicePage Component", () => {
  test("renders main sections", () => {
    render(
      <TestWrapper>
        <ServicePage />
      </TestWrapper>
    );
    expect(screen.getByText(/our services/i)).toBeInTheDocument();
  });

  test("renders with correct structure", () => {
    render(
      <TestWrapper>
        <ServicePage />
      </TestWrapper>
    );
    
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("service-page")).toBeInTheDocument();
    expect(screen.getByTestId("service-content")).toBeInTheDocument();
  });

  test("renders service cards", () => {
    render(
      <TestWrapper>
        <ServicePage />
      </TestWrapper>
    );
    
    const serviceCards = screen.getAllByTestId("service-card");
    expect(serviceCards.length).toBeGreaterThan(0);
  });
});