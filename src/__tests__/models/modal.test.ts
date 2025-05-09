interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedData: { position: string; salary: string; gender: string; experience: string }) => void;
  onDelete: () => void;
  initialData: { position: string; salary: string; gender: string; experience: string };
}

interface ResetPasswordModal {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
  message: string;
  isError: boolean;
  isSending: boolean;
}

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (token: string) => void;
}

describe("Modal Models", () => {
  test("EditModalProps interface has correct structure", () => {
    const editModalProps: EditModalProps = {
      isOpen: true,
      onClose: () => {},
      onSave: () => {},
      onDelete: () => {},
      initialData: {
        position: "Software Engineer",
        salary: "50000",
        gender: "Male",
        experience: "5"
      }
    };

    expect(editModalProps).toHaveProperty("isOpen");
    expect(editModalProps).toHaveProperty("onClose");
    expect(editModalProps).toHaveProperty("onSave");
    expect(editModalProps).toHaveProperty("onDelete");
    expect(editModalProps).toHaveProperty("initialData");
  });

  test("ResetPasswordModal interface has correct structure", () => {
    const resetPasswordModal: ResetPasswordModal = {
      isOpen: true,
      onClose: () => {},
      email: "test@example.com",
      onEmailChange: () => {},
      onReset: () => {},
      message: "",
      isError: false,
      isSending: false
    };

    expect(resetPasswordModal).toHaveProperty("isOpen");
    expect(resetPasswordModal).toHaveProperty("onClose");
    expect(resetPasswordModal).toHaveProperty("email");
    expect(resetPasswordModal).toHaveProperty("onEmailChange");
    expect(resetPasswordModal).toHaveProperty("onReset");
    expect(resetPasswordModal).toHaveProperty("message");
    expect(resetPasswordModal).toHaveProperty("isError");
    expect(resetPasswordModal).toHaveProperty("isSending");
  });

  test("LoginModalProps interface has correct structure", () => {
    const loginModalProps: LoginModalProps = {
      isOpen: true,
      onClose: () => {},
      onLoginSuccess: () => {}
    };

    expect(loginModalProps).toHaveProperty("isOpen");
    expect(loginModalProps).toHaveProperty("onClose");
    expect(loginModalProps).toHaveProperty("onLoginSuccess");
  });

  test("Modal props have correct types", () => {
    const editModalProps: EditModalProps = {
      isOpen: true,
      onClose: () => {},
      onSave: () => {},
      onDelete: () => {},
      initialData: {
        position: "Software Engineer",
        salary: "50000",
        gender: "Male",
        experience: "5"
      }
    };

    expect(typeof editModalProps.isOpen).toBe("boolean");
    expect(typeof editModalProps.onClose).toBe("function");
    expect(typeof editModalProps.onSave).toBe("function");
    expect(typeof editModalProps.onDelete).toBe("function");
    expect(typeof editModalProps.initialData).toBe("object");
  });
});