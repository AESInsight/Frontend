import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent } from "../../../components/ui/card";

describe("Card Components", () => {
  test("renders complete card with all components", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
          <CardDescription>Test Description</CardDescription>
        </CardHeader>
        <CardContent>Test Content</CardContent>
        <CardFooter>
          <CardAction>Test Action</CardAction>
        </CardFooter>
      </Card>
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
    expect(screen.getByText("Test Action")).toBeInTheDocument();
  });

  test("applies custom className", () => {
    render(
      <Card className="test-class">
        <CardContent>Test Content</CardContent>
      </Card>
    );

    const card = screen.getByText("Test Content").closest('[data-slot="card"]');
    expect(card).toHaveClass("test-class");
  });
});