import { useAuth } from "@/hooks/auth";
import { mockAxios } from "@/tests/mocks/axios";
import { mockRouter, mockUseParams } from "@/tests/mocks/next";
import { mockUseSWR } from "@/tests/mocks/swr";
import { act, renderHook } from "@testing-library/react";

describe("useAuth Hook", () => {
  const mockSetErrors = jest.fn();
  const mockSetStatus = jest.fn();
  const mockFetchUser = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseParams.mockReturnValue({ token: "test-token" });
    mockAxios.get.mockResolvedValue({ data: {} });
    mockAxios.post.mockResolvedValue({ data: {} });
    mockUseSWR.mockReturnValue({
      data: null,
      error: null,
      mutate: mockFetchUser,
    });
  });

  describe("login", () => {
    const loginData = {
      email: "test@example.com",
      password: "password",
    };

    it("should fetch CSRF token", async () => {
      const { result } = renderHook(() => useAuth());

      await act(async () => {
        await result.current.login({
          ...loginData,
          setErrors: mockSetErrors,
        });
      });

      expect(mockAxios.get).toHaveBeenCalledWith("/auth/csrf-cookie");
    });

    it("should successfully login a user", async () => {
      const { result } = renderHook(() => useAuth());

      await act(async () => {
        await result.current.login({
          ...loginData,
          setErrors: mockSetErrors,
        });
      });

      expect(mockAxios.post).toHaveBeenCalledWith("/auth/login", loginData);
      expect(mockSetErrors).toHaveBeenCalledWith({});
      expect(mockFetchUser).toHaveBeenCalled();
    });

    it("should handle login errors", async () => {
      const errors = { email: ["Invalid credentials"] };
      (mockAxios.post as jest.Mock).mockRejectedValueOnce({
        response: { status: 422, data: { errors } },
      });

      const { result } = renderHook(() => useAuth());

      await act(async () => {
        await result.current.login({
          ...loginData,
          setErrors: mockSetErrors,
        });
      });

      expect(mockSetErrors).toHaveBeenCalledWith(errors);
    });
  });

  describe("middleware", () => {
    it("should redirect authenticated users when using guest middleware", async () => {
      (mockAxios as jest.Mock).mockReturnValue({
        data: { id: 1, name: "Test User" },
        error: null,
        mutate: mockFetchUser,
      });

      renderHook(() =>
        useAuth({
          middleware: "guest",
          redirectIfAuthenticated: "/dashboard",
        }),
      );

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(mockRouter.push).toHaveBeenCalledWith("/dashboard");
    });

    it("should logout unauthenticated users when using auth middleware", async () => {
      // Mock authentication error
      (mockUseSWR as jest.Mock).mockReturnValue({
        data: null,
        error: new Error("Unauthenticated"),
        mutate: mockFetchUser,
      });

      const { result } = renderHook(() =>
        useAuth({
          middleware: "auth",
        }),
      );

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(mockAxios.post).toHaveBeenCalledWith("/auth/logout");
    });
  });

  describe("forgotPassword", () => {
    it("should handle forgot password request", async () => {
      const status = "Password reset link sent";
      (mockAxios.post as jest.Mock).mockResolvedValueOnce({ data: { status } });

      const { result } = renderHook(() => useAuth());

      await act(async () => {
        await result.current.forgotPassword({
          email: "test@example.com",
          setErrors: mockSetErrors,
          setStatus: mockSetStatus,
        });
      });

      expect(mockAxios.post).toHaveBeenCalledWith("/auth/forgot-password", {
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
      (mockAxios.post as jest.Mock).mockResolvedValueOnce({ data: { status } });

      const { result } = renderHook(() => useAuth());

      await act(async () => {
        await result.current.resetPassword({
          ...resetData,
          setErrors: mockSetErrors,
          setStatus: mockSetStatus,
        });
      });

      expect(mockAxios.post).toHaveBeenCalledWith("/auth/reset-password", {
        ...resetData,
        token: "test-token",
      });
      expect(mockRouter.push).toHaveBeenCalledWith(
        `/auth/login?reset=${btoa(status)}`,
      );
    });
  });

  describe("logout", () => {
    it("should fetch CSRF token", async () => {
      const { result } = renderHook(() => useAuth());

      await act(async () => {
        await result.current.logout();
      });

      expect(axios.get).toHaveBeenCalledWith("/auth/csrf-cookie");
    });

    it("should handle logout", async () => {
      const { result } = renderHook(() => useAuth());

      await act(async () => {
        await result.current.logout();
      });

      expect(mockAxios.post).toHaveBeenCalledWith("/auth/logout");
      expect(mockRouter.push).toHaveBeenCalledWith("/login");
    });
  });
});
