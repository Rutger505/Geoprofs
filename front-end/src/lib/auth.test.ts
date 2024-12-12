import { mockAxios } from "@/__tests__/__mocks__/axios";
import { signIn, signOut } from "@/lib/auth";
import { login, logout } from "@/lib/authActions";
import axios from "@/lib/axios";

describe("auth", () => {
  const mockUser = {
    UserID: 1,
    UserFirstName: "John",
    UserLastName: "Doe",
    email: "john@example.com",
    DateHired: new Date(),
    UserRoleID: 1,
    RoleName: "Admin",
    created_at: null,
    updated_at: null,
  };

  const mockCookies = [
    "laravel_session=abc123; path=/; httponly",
    "XSRF-TOKEN=xyz789; path=/",
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("login", () => {
    it("should handle successful login", async () => {
      // Arrange
      const credentials = {
        email: "john@example.com",
        password: "password123",
      };

      mockAxios.post.mockResolvedValueOnce({
        data: mockUser,
        headers: {
          "set-cookie": mockCookies,
        },
      });

      // Act
      await login(credentials.email, credentials.password);

      // Assert
      expect(signIn).toHaveBeenCalledWith("credentials", {
        email: credentials.email,
        password: credentials.password,
        redirect: true,
        redirectTo: "/dashboard",
      });
    });

    it("should handle login failure with invalid credentials", async () => {
      // Arrange
      const credentials = {
        email: "wrong@example.com",
        password: "wrongpass",
      };

      mockAxios.post.mockRejectedValueOnce({
        response: { status: 422 },
      });

      // Act
      await expect(
        await login(credentials.email, credentials.password),
      ).rejects.toThrow("Invalid credentials");

      // Assert
      expect(signIn).toHaveBeenCalledWith("credentials", {
        email: credentials.email,
        password: credentials.password,
        redirect: true,
        redirectTo: "/dashboard",
      });
    });

    it("should set cookies in axios defaults after successful login", async () => {
      // Arrange
      const credentials = {
        email: "john@example.com",
        password: "password123",
      };

      mockAxios.post.mockResolvedValueOnce({
        data: mockUser,
        headers: {
          "set-cookie": mockCookies,
        },
      });

      // Act
      await login(credentials.email, credentials.password);

      // Assert
      expect(axios.defaults.headers.common["Cookie"]).toBe(
        mockCookies.join("; "),
      );
    });
  });

  describe("logout", () => {
    it("should call auth logout endpoint", async () => {
      // Arrange
      mockAxios.post.mockResolvedValueOnce({ status: 200 });

      // Act
      await logout();

      // Assert
      expect(axios.post).toHaveBeenCalledWith("/auth/logout");
      expect(signOut).toHaveBeenCalled();
    });
  });
});
