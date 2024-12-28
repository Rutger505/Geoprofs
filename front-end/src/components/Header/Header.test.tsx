import { act, render, screen } from "@testing-library/react";
import { Header, Navigation } from "./Header";

// This component is async and is not supported by testing-library. This will be end to end tested as suggested by next.js.
jest.mock("@/components/Auth/server", () => ({
  SignOutButton: () => <button>Uitloggen</button>,
}));

export const navigation: Navigation[] = [
  { name: "Dashboard", href: "#" },
  { name: "Aanvragen", href: "#" },
  { name: "Verlofsaldo", href: "#" },
];

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

    // The sign out button is for desktop is async and must be tested with end to end testing.
  });

  describe("Mobile navigation", () => {
    function setMobileWidth() {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 375,
      });
      window.dispatchEvent(new Event("resize"));
    }

    async function openMobileNavigation(
      postOpenNavigation: () => void | Promise<void>,
    ) {
      const mobileNavigationButton = screen.getByRole("button", {
        name: "Open navigation",
      });
      expect(mobileNavigationButton).toBeInTheDocument();

      await act(async () => {
        mobileNavigationButton.click();
        await postOpenNavigation();
      });
    }

    beforeEach(() => {
      setMobileWidth();
    });

    it("renders navigation links", async () => {
      render(<Header />);

      await openMobileNavigation(async () => {
        navigation.forEach((item) => {
          const link = screen.getByRole("link", { name: item.name });
          expect(link).toBeInTheDocument();
          expect(link).toHaveTextContent(item.name);
          expect(link).toHaveAttribute("href", item.href);
        });
      });
    });
  });
});
