// src/tests/mocks/next.ts
const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
};

const mockUseRouter = jest.fn(() => mockRouter);
const mockRedirect = jest.fn();
const mockUsePathname = jest.fn(() => "/");
const mockUseParams = jest.fn(() => ({}));
const mockUseSearchParams = jest.fn(() => new URLSearchParams());

jest.mock("next/navigation", () => ({
  redirect: mockRedirect,
  useRouter: mockUseRouter,
  usePathname: mockUsePathname,
  useParams: mockUseParams,
  useSearchParams: mockUseSearchParams,
}));

export {
  mockRedirect,
  mockRouter,
  mockUseParams,
  mockUsePathname,
  mockUseRouter,
  mockUseSearchParams,
};
