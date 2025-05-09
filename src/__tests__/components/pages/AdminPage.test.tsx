import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AdminPage from "../../../components/pages/adminpage";

// Mock the useQuery hook
jest.mock("@tanstack/react-query", () => ({
  useQuery: () => ({
    data: [],
    isLoading: false,
    error: null
  })
}));

describe("AdminPage", () => {
  test("renders admin page", () => {
    render(<AdminPage />);
    expect(screen.getByText(/admin page/i)).toBeInTheDocument();
  });
});