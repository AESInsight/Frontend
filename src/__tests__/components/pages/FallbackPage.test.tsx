import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DefaultComponent from "../../../components/pages/fallbackpage";

describe("FallbackPage Component", () => {
  test("renders main sections", () => {
    render(<DefaultComponent />);
    
    expect(screen.getByText("Welcome to AESInsight")).toBeInTheDocument();
    expect(screen.getByText("The Webside is under construction")).toBeInTheDocument();
  });

  test("renders with correct structure", () => {
    render(<DefaultComponent />);
    
    expect(screen.getByRole("banner")).toBeInTheDocument(); // Header
    expect(screen.getByRole("navigation")).toBeInTheDocument(); // Sidebar
    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});