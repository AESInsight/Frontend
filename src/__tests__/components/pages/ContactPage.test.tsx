import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ContactPage from "../../../components/pages/contactpage";
import { TestWrapper } from "../../test-utils";

describe("ContactPage Component", () => {
  test("renders main sections", () => {
    render(
      <TestWrapper>
        <ContactPage />
      </TestWrapper>
    );
    expect(screen.getByTestId("contact-title")).toBeInTheDocument();
  });

  test("renders contact bubbles", () => {
    render(
      <TestWrapper>
        <ContactPage />
      </TestWrapper>
    );
    const contactEmails = screen.getAllByTestId("contact-email");
    const contactPhones = screen.getAllByTestId("contact-phone");
    expect(contactEmails.length).toBeGreaterThan(0);
    expect(contactPhones.length).toBeGreaterThan(0);
  });

  test("renders with correct structure", () => {
    render(
      <TestWrapper>
        <ContactPage />
      </TestWrapper>
    );
    
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("contact-page")).toBeInTheDocument();
    expect(screen.getByTestId("contact-content")).toBeInTheDocument();
  });
});