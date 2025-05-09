import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ContactBubble from "../../../components/ui/contact_bubble";

describe("ContactBubble Component", () => {
  test("renders contact information", () => {
    render(
      <ContactBubble
        name="John Doe"
        phoneNumber="123-456-7890"
        email="john@example.com"
        initials="JD"
      />
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("123-456-7890")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByTestId("contact-image")).toHaveAttribute("src", "/profilePic/JD.png");
  });

  test("renders with correct structure", () => {
    render(
      <ContactBubble
        name="John Doe"
        phoneNumber="123-456-7890"
        email="john@example.com"
        initials="JD"
      />
    );

    expect(screen.getByTestId("contact-bubble")).toBeInTheDocument();
    expect(screen.getByTestId("contact-image")).toBeInTheDocument();
    expect(screen.getByTestId("contact-info")).toBeInTheDocument();
    expect(screen.getByTestId("contact-name")).toBeInTheDocument();
    expect(screen.getByTestId("contact-phone")).toBeInTheDocument();
    expect(screen.getByTestId("contact-email")).toBeInTheDocument();
  });
});