import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import StyledHeaderButton from "../../../../components/buttons/header_buttons/styled_header_button";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

describe("StyledHeaderButton", () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders with correct icon and text", () => {
    render(
      <StyledHeaderButton icon={faCoffee} text="Click Me" onClick={mockOnClick} />
    );

    expect(screen.getByText("Click Me")).toBeInTheDocument();
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  test("calls onClick when clicked", () => {
    render(
      <StyledHeaderButton icon={faCoffee} text="Click Me" onClick={mockOnClick} />
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test("applies custom className", () => {
    render(
      <StyledHeaderButton
        icon={faCoffee}
        text="Click Me"
        onClick={mockOnClick}
        className="bg-red-500"
      />
    );

    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-red-500");
  });
});