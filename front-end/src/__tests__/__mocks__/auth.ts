import user from "@/__tests__/__fixtures__/user.json";

const signIn = jest.fn();
const signOut = jest.fn();
const handlers = jest.fn();

const mockAuth = {
  signIn,
  signOut,
  handlers,
  default: jest.fn(() => ({
    signIn,
    signOut,
    handlers,
  })),
  auth: jest.fn(),
};

jest.mock("next-auth", () => ({
  __esModule: true,
  ...mockAuth,
}));

export function mockAuthenticatedUser() {
  mockAuth.auth.mockReturnValueOnce(Promise.resolve(user));
}

export function mockUnauthenticatedUser() {
  mockAuth.auth.mockReturnValueOnce(Promise.resolve(null));
}

export { mockAuth };
