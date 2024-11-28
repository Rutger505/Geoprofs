import { render, screen } from "@testing-library/react";
import { Header, Navigation } from "./Header";

export const navigation: Navigation[] = [
  { name: "Dashboard", href: "#" },
  { name: "Aanvragen", href: "#" },
  { name: "Verlofsaldo", href: "#" },
];

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

  describe("Desktop navigation", () => {
    it("renders navigation links for normal header", () => {
      render(<Header />);

      navigation.forEach((item) => {
        const link = screen.getByRole("link", { name: item.name });
        expect(link).toBeInTheDocument();
        expect(link).toHaveTextContent(item.name);
        expect(link).toHaveAttribute("href", item.href);
      });
    });
  });

  describe("Mobile navigation", () => {
    it("renders navigation links for responsive header", () => {
      render(<Header />);

      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 375, // Mobile device width
      });
      window.dispatchEvent(new Event("resize"));

      const mobileNavigationButton = screen.getByRole("button", {
        name: "Open navigation",
      });
      expect(mobileNavigationButton).toBeInTheDocument();
      mobileNavigationButton.click();

      navigation.forEach((item) => {
        const link = screen.getByRole("link", { name: item.name });
        expect(link).toBeInTheDocument();
        expect(link).toHaveTextContent(item.name);
        expect(link).toHaveAttribute("href", item.href);
      });
    });
  });
});
