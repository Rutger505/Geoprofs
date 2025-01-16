import { expect, test } from "@playwright/test";

test.describe("Login", () => {
  test("should successfully login and access dashboard the", async ({
    page,
  }) => {
    await page.goto("/");

    await page.getByLabel("Email").fill("employee@example.com");

    await page.getByLabel("Wachtwoord").fill("secret");

    await page.getByRole("button", { name: "Inloggen" }).click();

    await expect(
      page.getByRole("heading", { name: "Welcome Employee!" }),
    ).toBeVisible();
  });

  test("should show error message with invalid credentials", async ({
    page,
  }) => {
    await page.goto("/");

    await page.getByLabel("Email").fill("invalid@example.com");
    await page.getByLabel("Wachtwoord").fill("wrongpassword");
    await page.getByRole("button", { name: "Inloggen" }).click();

    // Check for error message
    await expect(page.getByText("Ongeldige inloggegevens")).toBeVisible();
  });
});
