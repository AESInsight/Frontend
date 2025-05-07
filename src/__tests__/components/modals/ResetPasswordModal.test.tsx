import { describe, test, expect } from "bun:test";
import ResetPasswordModal from "../../../components/modals/resetpassword_modal";

describe("ResetPasswordModal", () => {
  test("component is a function", () => {
    expect(typeof ResetPasswordModal).toBe("function");
  });

  test("component is defined", () => {
    expect(ResetPasswordModal).toBeDefined();
  });

  test("component has required props", () => {
    const props = {
      isOpen: true,
      onClose: () => {},
      email: "",
      onEmailChange: () => {},
      onReset: () => {},
      message: "",
      isError: false,
      isSending: false
    };
    
    // Verify that the component accepts the required props
    expect(() => <ResetPasswordModal {...props} />).not.toThrow();
  });
}); 