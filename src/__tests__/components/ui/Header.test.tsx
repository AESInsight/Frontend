import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../../../components/ui/header";

describe("Header Component", () => {
  test("renders header with logo", () => {
    render(<Header />);
    expect(screen.getByTestId("header-logo")).toBeInTheDocument();
  });

  test("renders with correct structure", () => {
    render(<Header />);
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("header-left")).toBeInTheDocument();
    expect(screen.getByTestId("header-buttons")).toBeInTheDocument();
  });
});