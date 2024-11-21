import { renderHook } from "@testing-library/react-hooks";
import { useAuth } from "./useAuth";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

// Mock dependencies
jest.mock("@/lib/axios");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}));
jest.mock("swr", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("useAuth Hook", () => {
  const mockRouter = {
    push: jest.fn(),
  };
  const mockSetErrors = jest.fn();
  const mockSetStatus = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useParams as jest.Mock).mockReturnValue({ token: "test-token" });
    (axios.get as jest.Mock).mockResolvedValue({ data: {} });
    (axios.post as jest.Mock).mockResolvedValue({ data: {} });
  });

  describe("register", () => {
    const registerData = {
      name: "Test User",
      email: "test@example.com",
      password: "password",
      password_confirmation: "password",
    };

    it("should successfully register a user", async () => {
      const { result } = renderHook(() => useAuth());

      await result.current.register({
        ...registerData,
        setErrors: mockSetErrors,
      });

      expect(axios.get).toHaveBeenCalledWith("/auth/csrf-cookie");
      expect(axios.post).toHaveBeenCalledWith("/auth/register", registerData);
      expect(mockSetErrors).toHaveBeenCalledWith([]);
    });

    it("should handle registration errors", async () => {
      const errors = { email: ["Email already taken"] };
      (axios.post as jest.Mock).mockRejectedValueOnce({
        response: { status: 422, data: { errors } },
      });

      const { result } = renderHook(() => useAuth());

      await result.current.register({
        ...registerData,
        setErrors: mockSetErrors,
      });

      expect(mockSetErrors).toHaveBeenCalledWith(errors);
    });
  });

  describe("login", () => {
    const loginData = {
      email: "test@example.com",
      password: "password",
      remember: true,
    };

    it("should successfully login a user", async () => {
      const { result } = renderHook(() => useAuth());

      await result.current.login({
        ...loginData,
        setErrors: mockSetErrors,
        setStatus: mockSetStatus,
      });

      expect(axios.get).toHaveBeenCalledWith("/auth/csrf-cookie");
      expect(axios.post).toHaveBeenCalledWith("/auth/login", loginData);
      expect(mockSetErrors).toHaveBeenCalledWith([]);
      expect(mockSetStatus).toHaveBeenCalledWith(null);
    });

    it("should handle login errors", async () => {
      const errors = { email: ["Invalid credentials"] };
      (axios.post as jest.Mock).mockRejectedValueOnce({
        response: { status: 422, data: { errors } },
      });

      const { result } = renderHook(() => useAuth());

      await result.current.login({
        ...loginData,
        setErrors: mockSetErrors,
        setStatus: mockSetStatus,
      });

      expect(mockSetErrors).toHaveBeenCalledWith(errors);
    });
  });

  describe("forgotPassword", () => {
    it("should handle forgot password request", async () => {
      const status = "Password reset link sent";
      (axios.post as jest.Mock).mockResolvedValueOnce({ data: { status } });

      const { result } = renderHook(() => useAuth());

      await result.current.forgotPassword({
        email: "test@example.com",
        setErrors: mockSetErrors,
        setStatus: mockSetStatus,
      });

      expect(axios.post).toHaveBeenCalledWith("/auth/forgot-password", {
        email: "test@example.com",
      });
      expect(mockSetStatus).toHaveBeenCalledWith(status);
    });
  });

  describe("resetPassword", () => {
    const resetData = {
      email: "test@example.com",
      password: "newpassword",
      password_confirmation: "newpassword",
    };

    it("should handle password reset", async () => {
      const status = "Password reset successfully";
      (axios.post as jest.Mock).mockResolvedValueOnce({ data: { status } });

      const { result } = renderHook(() => useAuth());

      await result.current.resetPassword({
        ...resetData,
        setErrors: mockSetErrors,
        setStatus: mockSetStatus,
      });

      expect(axios.post).toHaveBeenCalledWith("/auth/reset-password", {
        ...resetData,
        token: "test-token",
      });
      expect(mockRouter.push).toHaveBeenCalledWith(
        `/auth/login?reset=${btoa(status)}`,
      );
    });
  });

  describe("logout", () => {
    it("should handle logout", async () => {
      const { result } = renderHook(() => useAuth());

      await result.current.logout();

      expect(axios.post).toHaveBeenCalledWith("/auth/logout");
      expect(window.location.pathname).toBe("/login");
    });
  });

  describe("middleware", () => {
    it("should redirect authenticated users when using guest middleware", async () => {
      const user = { id: 1, name: "Test User" };
      (axios.get as jest.Mock).mockResolvedValueOnce({ data: user });

      renderHook(() =>
        useAuth({
          middleware: "guest",
          redirectIfAuthenticated: "/dashboard",
        }),
      );

      // Wait for useEffect to run
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(mockRouter.push).toHaveBeenCalledWith("/dashboard");
    });

    it("should logout unauthenticated users when using auth middleware", async () => {
      (axios.get as jest.Mock).mockRejectedValueOnce(
        new Error("Unauthenticated"),
      );

      const { result } = renderHook(() =>
        useAuth({
          middleware: "auth",
        }),
      );

      // Wait for useEffect to run
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(axios.post).toHaveBeenCalledWith("/auth/logout");
    });
  });
});
