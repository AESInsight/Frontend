import { describe, expect, test } from "bun:test";
import SearchBar from "../../../components/ui/search_bar";

describe("SearchBar Component", () => {
  test("component is a function", () => {
    expect(typeof SearchBar).toBe("function");
  });

  test("component is defined", () => {
    expect(SearchBar).toBeDefined();
  });
}); 