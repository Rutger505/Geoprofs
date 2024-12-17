const signIn = jest.fn();
const signOut = jest.fn();
const handlers = jest.fn();

const mockNextAuth = {
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
  ...mockNextAuth,
}));

export { mockNextAuth };
