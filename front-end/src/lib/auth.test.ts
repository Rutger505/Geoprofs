import { authentication, login, logout } from "@/lib/auth";
import userFixture from "@/tests/fixtures/user.json";
import apiUserFixture from "@/tests/fixtures/userApi.json";
import { mockAxios } from "@/tests/mocks/axios";
import { mockRedirect } from "@/tests/mocks/next";
import { AxiosError } from "axios";
import { when } from "jest-when";

describe("server side authentication", () => {
  const mockSetErrors = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockAxios.get.mockResolvedValue({ data: {} });
    mockAxios.post.mockResolvedValue({ data: {} });
  });

  describe("fetching user", () => {
    it("should fetch CSRF token", async () => {
      await authentication();

      expect(mockAxios.get).toHaveBeenCalledWith("/auth/csrf-cookie");
    });

    it("should return a user", async () => {
      mockAxios.get.mockResolvedValue({ data: apiUserFixture });

      const user = await authentication();

      expect(user).toEqual({
        ...userFixture,
        dateHired: new Date(userFixture.dateHired),
      });
    });

    it("should return null if not authenticated", async () => {
      // Create proper AxiosError
      const error = new AxiosError();
      error.response = { status: 401 } as any;

      mockAxios.get.mockRejectedValue(error);

      when(mockAxios.get)
        .calledWith("/auth/csrf-cookie")
        .mockResolvedValue({ data: {} });

      const user = await authentication();

      expect(user).toBeNull();
    });
  });

  describe("login", () => {
    const loginData = {
      email: "test@example.com",
      password: "password",
    };

    it("should fetch CSRF token", async () => {
      await login(loginData.email, loginData.password);

      expect(mockAxios.get).toHaveBeenCalledWith("/auth/csrf-cookie");
    });

    it("should successfully login a user", async () => {
      const errors = await login(loginData.email, loginData.password);

      expect(mockAxios.post).toHaveBeenCalledWith("/auth/login", loginData);
      expect(errors).toBeNull();
    });

    it("should handle login errors", async () => {
      const mockErrors = { email: "Invalid credentials" };
      const error = new AxiosError();
      error.response = {
        status: 422,
        data: { errors: mockErrors },
      } as any;

      mockAxios.post.mockRejectedValue(error);

      const errors = await login(loginData.email, loginData.password);

      expect(errors).toEqual(mockErrors);
    });
  });

  describe("logout", () => {
    it("should handle logout", async () => {
      await logout();

      expect(mockAxios.post).toHaveBeenCalledWith("/auth/logout");
      expect(mockRedirect).toHaveBeenCalledWith("/login");
    });
  });
});
