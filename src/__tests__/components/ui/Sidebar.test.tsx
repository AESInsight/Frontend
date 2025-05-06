import { describe, expect, test } from "bun:test";
import Sidebar from "../../../components/ui/sidebar";

describe("Sidebar Component", () => {
  test("component is a function", () => {
    expect(typeof Sidebar).toBe("function");
  });

  test("component is defined", () => {
    expect(Sidebar).toBeDefined();
  });

  test("component has navigation items", () => {
    const navigationItems = ["About", "Services", "Contact"];
    // Check that these items are defined in the component's source code
    const sidebarSource = Sidebar.toString();
    navigationItems.forEach(item => {
      expect(sidebarSource).toContain(item);
    });
  });
}); 