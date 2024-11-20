import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "./LoginForm";

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

  it("displays validation errors for empty fields", async () => {
    render(<LoginForm />);

    fireEvent.click(screen.getByRole("button", { name: "Inloggen" }));

    await waitFor(() => {
      expect(screen.getByText("Email is required")).toBeInTheDocument();
      expect(screen.getByText("Password is required")).toBeInTheDocument();
    });
  });

  it("displays error for invalid email format", async () => {
    render(<LoginForm />);

    await userEvent.type(screen.getByLabelText("Email"), "invalid-email");
    fireEvent.submit(screen.getByRole("button", { name: "Inloggen" }));

    await waitFor(() => {
      expect(screen.getByText("Invalid email address")).toBeInTheDocument();
    });
  });
});
