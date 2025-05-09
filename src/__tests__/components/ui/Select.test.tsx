import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Select } from "../../../components/ui/select";

describe("Select Component", () => {
  test("renders with options", () => {
    const options = ["Option 1", "Option 2"];
    render(<Select options={options} selected="Option 1" onChange={() => {}} />);
    
    expect(screen.getByTestId("select-container")).toBeInTheDocument();
    expect(screen.getByTestId("select-button")).toBeInTheDocument();
    expect(screen.getByTestId("select-value")).toHaveTextContent("Option 1");
  });

  test("calls onChange when selection changes", () => {
    const handleChange = jest.fn();
    const options = ["Option 1", "Option 2"];
    
    render(<Select options={options} selected="Option 1" onChange={handleChange} />);
    
    // Click the button to open the dropdown
    fireEvent.click(screen.getByTestId("select-button"));
    
    // Click an option
    fireEvent.click(screen.getByTestId("select-option-Option 2"));
    
    expect(handleChange).toHaveBeenCalledWith("Option 2");
  });
});