import {
  mockAuthenticatedUser,
  mockUnauthenticatedUser,
} from "@/__tests__/__mocks__/auth";
import { act, render, screen } from "@testing-library/react";
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

    it("renders sign out button when signed in", () => {
      mockAuthenticatedUser();

      render(<Header />);

      const signOutButton = screen.getByRole("button", { name: "Uitloggen" });
      expect(signOutButton).toBeInTheDocument();
    });

    it("doesn't render sign out button when not signed in", () => {
      mockUnauthenticatedUser();

      render(<Header />);

      const signOutButton = screen.getByRole("button", { name: "Uitloggen" });
      expect(signOutButton).toBeInTheDocument();
    });
  });

  describe("Mobile navigation", () => {
    function setMobileWidth() {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 375, // Mobile device width
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

    it("renders sign out button when signed in", async () => {
      mockAuthenticatedUser();

      render(<Header />);

      await openMobileNavigation(async () => {
        const signOutButton = screen.getByRole("button", { name: "Uitloggen" });
        expect(signOutButton).toBeInTheDocument();
      });
    });

    it("doesn't render sign out button when not signed in", async () => {
      mockUnauthenticatedUser();

      render(<Header />);

      await openMobileNavigation(async () => {
        const signOutButton = screen.getByRole("button", { name: "Uitloggen" });
        expect(signOutButton).toBeInTheDocument();
      });
    });
  });
});
