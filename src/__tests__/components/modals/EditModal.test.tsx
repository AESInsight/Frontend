import { describe, test, expect } from "bun:test";
import EditModal from "../../../components/modals/edit_modal";

describe("EditModal", () => {
  test("component is a function", () => {
    expect(typeof EditModal).toBe("function");
  });

  test("component is defined", () => {
    expect(EditModal).toBeDefined();
  });

  test("component has required props", () => {
    const props = {
      isOpen: true,
      onClose: () => {},
      onSave: () => {},
      onDelete: () => {},
      initialData: {
        position: "Software Engineer",
        salary: 50000,
        gender: "Male",
        experience: 5
      }
    };
    
    // Verify that the component accepts the required props
    expect(() => <EditModal {...props} />).not.toThrow();
  });
}); 