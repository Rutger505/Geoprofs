const mockAxios = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  defaults: { headers: { common: {} } },
};

jest.mock("@/lib/axios", () => mockAxios);

export { mockAxios };
console.log("axios");
