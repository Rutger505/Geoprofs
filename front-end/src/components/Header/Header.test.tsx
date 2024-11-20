import { render, screen } from "@testing-library/react";
import { Header, navigation } from "./Header";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

describe("Header", () => {
  it("renders logo", () => {
    render(<Header />);
    const logo = screen.getByAltText("Geoprofs Logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/logo.webp");
    expect(logo).toHaveAttribute("width", "42");
    expect(logo).toHaveAttribute("height", "42");
  });

  it("renders navigation links", () => {
    render(<Header />);

    navigation.forEach((item) => {
      const link = screen.getByRole("link", { name: item.name });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", item.href);
    });
  });

  it("renders correct number of navigation items", () => {
    render(<Header />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(navigation.length);
  });
});
