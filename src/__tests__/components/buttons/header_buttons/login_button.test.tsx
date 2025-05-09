import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginButton from "../../../../components/buttons/header_buttons/login_button";

describe("LoginButton", () => {
  test("renders login button", () => {
    render(<LoginButton />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("has correct text content", () => {
    render(<LoginButton />);
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });
});
