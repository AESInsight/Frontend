import { describe, expect, test } from "bun:test";
import AboutPage from "../../../components/pages/contactpage";

describe("ContactPage Component", () => {
  test("component is a function", () => {
    expect(typeof AboutPage).toBe("function");
  });

  test("component is defined", () => {
    expect(AboutPage).toBeDefined();
  });

  test("component has basic structure", () => {
    const contactPageSource = AboutPage.toString();
    expect(contactPageSource).toContain("Header");
    expect(contactPageSource).toContain("Sidebar");
    expect(contactPageSource).toContain("Contact Us");
    expect(contactPageSource).toContain("ContactBubble");
  });
}); 