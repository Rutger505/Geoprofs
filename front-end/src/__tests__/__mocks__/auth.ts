import user from "@/__tests__/__fixtures__/user.json";

const mockSignIn = jest.fn();
const mockSignOut = jest.fn();
const mockHandlers = jest.fn();
const mockAuthFn = jest.fn();

jest.mock("next-auth", () => ({
  __esModule: true,
  signIn: mockSignIn,
  signOut: mockSignOut,
  handlers: mockHandlers,
  auth: mockAuthFn,
  default: jest.fn(() => ({
    signIn: mockSignIn,
    signOut: mockSignOut,
    handlers: mockHandlers,
    auth: mockAuthFn,
  })),
  AuthError: class MockAuthError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "AuthError";
    }
  },
}));

export function mockAuthenticatedUser() {
  mockAuthFn.mockReturnValueOnce(Promise.resolve(user));
}

export function mockUnauthenticatedUser() {
  mockAuthFn.mockReturnValueOnce(Promise.resolve(null));
}
