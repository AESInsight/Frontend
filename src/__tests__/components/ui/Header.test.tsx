import { describe, expect, test } from "bun:test";
import Header from "../../../components/ui/header";

describe("Header Component", () => {
  test("component is a function", () => {
    expect(typeof Header).toBe("function");
  });

  test("component is defined", () => {
    expect(Header).toBeDefined();
  });
}); 