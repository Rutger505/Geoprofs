const mockUseSWR = jest.fn(() => ({
  data: null,
  error: null,
  mutate: jest.fn(),
}));

jest.mock("swr", () => ({
  __esModule: true,
  default: mockUseSWR,
}));

export { mockUseSWR };
