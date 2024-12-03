import { LoginForm } from "@/components/Auth/LoginForm";
import { render, screen } from "@testing-library/react";

describe("LoginForm", () => {
  it("renders login form elements", () => {
    render(<LoginForm />);

    expect(
      screen.getByRole("heading", { name: "Inloggen" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Wachtwoord")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Inloggen" }),
    ).toBeInTheDocument();
  });
});
