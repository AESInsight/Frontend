import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import InsightButton from "../../../../components/buttons/header_buttons/Insight_button";

describe("InsightButton", () => {
  test("renders insight button", () => {
    render(<InsightButton />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("has correct text content", () => {
    render(<InsightButton />);
    expect(screen.getByText(/insight/i)).toBeInTheDocument();
  });
});
