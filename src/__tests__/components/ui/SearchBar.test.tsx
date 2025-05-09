import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchBar from "../../../components/ui/search_bar";

describe("SearchBar Component", () => {
  test("renders search bar with icon", () => {
    render(<SearchBar />);
    expect(screen.getByTestId("search-icon")).toBeInTheDocument();
  });

  test("renders search input", () => {
    render(<SearchBar />);
    expect(screen.getByTestId("search-input")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search for data...")).toBeInTheDocument();
  });
});