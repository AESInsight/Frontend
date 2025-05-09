import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ResetPasswordModal from "../../../components/modals/resetpassword_modal";

describe("ResetPasswordModal", () => {
  const mockProps = {
    isOpen: true,
    onClose: jest.fn(),
    email: "",
    onEmailChange: jest.fn(),
    onReset: jest.fn(),
    message: "",
    isError: false,
    isSending: false
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders modal when isOpen is true", () => {
    render(<ResetPasswordModal {...mockProps} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  test("calls onClose when close button is clicked", () => {
    render(<ResetPasswordModal {...mockProps} />);
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(mockProps.onClose).toHaveBeenCalled();
  });

  test("calls onReset when reset button is clicked", () => {
    render(<ResetPasswordModal {...mockProps} />);
    fireEvent.click(screen.getByRole("button", { name: /reset/i }));
    expect(mockProps.onReset).toHaveBeenCalled();
  });
});