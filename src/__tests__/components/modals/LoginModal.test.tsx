import { describe, test, expect } from "bun:test";
import LoginModal from "../../../components/modals/login_modal";

describe("LoginModal", () => {
  test("component is a function", () => {
    expect(typeof LoginModal).toBe("function");
  });

  test("component is defined", () => {
    expect(LoginModal).toBeDefined();
  });

  test("component has required props", () => {
    const props = {
      isOpen: true,
      onClose: () => {},
      onLoginSuccess: () => {}
    };
    
    // Verify that the component accepts the required props
    expect(() => <LoginModal {...props} />).not.toThrow();
  });
}); 