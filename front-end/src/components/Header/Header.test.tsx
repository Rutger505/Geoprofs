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

  it("renders navigation links for normal header responsive header", () => {
    render(<Header />);

    navigation.forEach((item) => {
      const links = screen.getAllByRole("link", { name: item.name });
      expect(links).toHaveLength(2); // One for desktop and one for mobile

      expect(links[0]).toHaveTextContent(item.name);
      expect(links[0]).toHaveAttribute("href", item.href);
      expect(links[1]).toHaveTextContent(item.name);
      expect(links[1]).toHaveAttribute("href", item.href);
    });
  });

  it("renders correct number of navigation items", () => {
    render(<Header />);

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(navigation.length * 2 + 1); // normal and responsive header + logo
  });
});
