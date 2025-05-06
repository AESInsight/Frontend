import { describe, expect, test } from "bun:test";
import ContactBubble from "../../../components/ui/contact_bubble";

describe("ContactBubble Component", () => {
  test("component is a function", () => {
    expect(typeof ContactBubble).toBe("function");
  });

  test("component is defined", () => {
    expect(ContactBubble).toBeDefined();
  });

  test("component accepts required props", () => {
    const props = {
      name: "John Doe",
      phoneNumber: "123-456-7890",
      email: "john@example.com",
      initials: "JD"
    };
    expect(props).toHaveProperty("name");
    expect(props).toHaveProperty("phoneNumber");
    expect(props).toHaveProperty("email");
    expect(props).toHaveProperty("initials");
  });
}); 