import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Checkbox } from "../../../components/ui/checkbox";

describe("Checkbox Component", () => {
  test("renders checkbox with label", () => {
    render(<Checkbox id="test" label="Test Checkbox" />);
    expect(screen.getByLabelText("Test Checkbox")).toBeInTheDocument();
  });

  test("handles checked state", () => {
    const handleChange = jest.fn();
    render(<Checkbox id="test" label="Test Checkbox" onCheckedChange={handleChange} />);
    
    const checkbox = screen.getByLabelText("Test Checkbox");
    fireEvent.click(checkbox);
    
    expect(handleChange).toHaveBeenCalled();
  });
});