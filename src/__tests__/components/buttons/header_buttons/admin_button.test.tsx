import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AdminButton from "../../../../components/buttons/header_buttons/admin_button";

describe("AdminButton", () => {
  test("renders admin button", () => {
    render(<AdminButton />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("has correct text content", () => {
    render(<AdminButton />);
    expect(screen.getByText(/admin/i)).toBeInTheDocument();
  });
});
