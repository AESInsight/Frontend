import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import EditButton from "../../../components/buttons/edit_button";

describe("EditButton Component", () => {
  test("renders edit button", () => {
    const mockOnClick = jest.fn();
    render(<EditButton onClick={mockOnClick} />);
    
    const button = screen.getByTestId("edit-button");
    expect(button).toBeInTheDocument();
    
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalled();
  });
});
