import Home from "@/app/page";

import { render, screen } from "@testing-library/react";

describe("Home", () => {
  it("renders the logo", () => {
    render(<Home />);
    expect(screen.getByText("Logo")).toBeInTheDocument();
  });

  it("renders desktop navigation items", () => {
    render(<Home />);
    const navigation = ["Product", "Features", "About", "Contact"];
    navigation.forEach((item) => {
      expect(screen.getAllByText(item)[0]).toBeInTheDocument();
    });
  });

  it("renders hero section with correct content", () => {
    render(<Home />);
    expect(screen.getByText("Welcome to our")).toBeInTheDocument();
    expect(screen.getByText("Amazing Platform")).toBeInTheDocument();
    expect(screen.getByText("Get started")).toBeInTheDocument();
  });

  it("renders all feature cards", () => {
    render(<Home />);
    expect(screen.getByText("Our Features")).toBeInTheDocument();
    expect(screen.getByText("feature 1")).toBeInTheDocument();
    expect(screen.getByText("Feature 2")).toBeInTheDocument();
    expect(screen.getByText("Feature 3")).toBeInTheDocument();
  });

  it("renders footer with navigation sections", () => {
    render(<Home />);
    const navigation = ["Product", "Features", "About", "Contact"];
    navigation.forEach((item) => {
      expect(screen.getAllByText(item)[1]).toBeInTheDocument();
    });
    expect(
      screen.getByText("© 2024 Your Company. All rights reserved."),
    ).toBeInTheDocument();
  });

  it("renders correct number of feature cards", () => {
    render(<Home />);
    const features = [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ut esfdsfsdfsfddsfdnim ad minim veniam, quis nostrud exercitation ullamco.",
    ];

    features.forEach((description) => {
      expect(screen.getByText(description)).toBeInTheDocument();
    });
  });

  it("renders footer links", () => {
    render(<Home />);
    const links = screen.getAllByText(/Link [12]/);
    expect(links).toHaveLength(8); // 2 links per navigation item (4 items)
  });
});
