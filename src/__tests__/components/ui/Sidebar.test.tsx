import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Sidebar from "../../../components/ui/sidebar";

describe("Sidebar Component", () => {
  test("renders navigation items", () => {
    render(<Sidebar />);
    
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  test("renders with correct structure", () => {
    render(<Sidebar />);
    
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("list")).toBeInTheDocument();
  });
});