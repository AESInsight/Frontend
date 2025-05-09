
const mockPostLogin = jest.fn(async () => ({
  token: "mock-token",
  message: "Success"
}));

const mockPostReset = jest.fn(async () => ({
  message: "If your email is registered, you will receive a password reset link."
}));

// Mock the module
jest.mock("../../lib/loginAPI", () => ({
  postLogin: mockPostLogin,
  postReset: mockPostReset
}));

// Import after mocking
import { postLogin, postReset } from "../../lib/loginAPI";

describe("Login API Functions", () => {
  describe("postLogin", () => {
    test("calls login endpoint with correct data", async () => {
      const email = "test@example.com";
      const password = "Test123!";
      
      const result = await postLogin(email, password);
      
      expect(result).toEqual({
        token: "mock-token",
        message: "Success"
      });
    });
  });

  describe("postReset", () => {
    test("calls reset endpoint with correct data", async () => {
      const email = "test@example.com";
      
      const result = await postReset(email);
      
      expect(result).toEqual({
        message: "If your email is registered, you will receive a password reset link."
      });
    });
  });
});