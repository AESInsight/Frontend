import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import EditModal from "../../../components/modals/edit_modal";

describe("EditModal", () => {
  const mockProps = {
    isOpen: true,
    onClose: jest.fn(),
    onSave: jest.fn(),
    onDelete: jest.fn(),
    initialData: {
      position: "Software Engineer",
      salary: "50000",
      gender: "Male",
      experience: "5"
    }
  };

  test("renders modal when isOpen is true", () => {
    render(<EditModal {...mockProps} />);
    expect(screen.getByText("Edit Details")).toBeInTheDocument();
  });

  test("calls onClose when cancel button is clicked", () => {
    render(<EditModal {...mockProps} />);
    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(mockProps.onClose).toHaveBeenCalled();
  });

  test("calls onSave when save button is clicked", () => {
    render(<EditModal {...mockProps} />);
    fireEvent.click(screen.getByRole("button", { name: /save changes/i }));
    expect(mockProps.onSave).toHaveBeenCalledWith(mockProps.initialData);
  });
});