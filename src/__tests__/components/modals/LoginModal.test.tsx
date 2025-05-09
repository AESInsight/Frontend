import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginModal from "../../../components/modals/login_modal";

describe("LoginModal", () => {
  const mockProps = {
    isOpen: true,
    onClose: jest.fn(),
    onLoginSuccess: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders modal when isOpen is true", () => {
    render(<LoginModal {...mockProps} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  test("calls onClose when close button is clicked", () => {
    render(<LoginModal {...mockProps} />);
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(mockProps.onClose).toHaveBeenCalled();
  });

  test("calls onLoginSuccess when login form is submitted", () => {
    render(<LoginModal {...mockProps} />);
    fireEvent.click(screen.getByRole("button", { name: /login/i }));
    expect(mockProps.onLoginSuccess).toHaveBeenCalled();
  });
});