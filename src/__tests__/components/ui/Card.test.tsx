import { describe, expect, test } from "bun:test";
import { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent } from "../../../components/ui/card";

describe("Card Components", () => {
  test("Card component is a function", () => {
    expect(typeof Card).toBe("function");
  });

  test("CardHeader component is a function", () => {
    expect(typeof CardHeader).toBe("function");
  });

  test("CardFooter component is a function", () => {
    expect(typeof CardFooter).toBe("function");
  });

  test("CardTitle component is a function", () => {
    expect(typeof CardTitle).toBe("function");
  });

  test("CardAction component is a function", () => {
    expect(typeof CardAction).toBe("function");
  });

  test("CardDescription component is a function", () => {
    expect(typeof CardDescription).toBe("function");
  });

  test("CardContent component is a function", () => {
    expect(typeof CardContent).toBe("function");
  });

  test("all components are defined", () => {
    expect(Card).toBeDefined();
    expect(CardHeader).toBeDefined();
    expect(CardFooter).toBeDefined();
    expect(CardTitle).toBeDefined();
    expect(CardAction).toBeDefined();
    expect(CardDescription).toBeDefined();
    expect(CardContent).toBeDefined();
  });
}); 