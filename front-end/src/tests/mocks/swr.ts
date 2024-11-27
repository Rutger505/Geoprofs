const mockUseSWR = jest.fn();

jest.mock("swr", () => mockUseSWR);

export { mockUseSWR };
console.log("swr");
