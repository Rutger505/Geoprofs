const randomEmail = () => `test-${Math.random().toString(36).substring(2)}@example.com`;

import { expect, test } from "@playwright/test";

test.describe("User", () => {
  test("should be able to register user", async ({
                                                   page
                                                 }) => {
    // arrange
    await page.goto("/");

    // login
    await page.getByLabel("Email").fill("admin@example.com");
    await page.getByLabel("Wachtwoord").fill("secret");
    await page.getByRole("button", { name: "Inloggen" }).click();

    // navigate to register user page
    await page.getByRole("link", { name: "Werknemers" }).click();
    await page.getByRole("link", { name: "Registreer nieuwe medewerker" }).click();

    // act
    // fill in form
    await page.getByLabel("Voornaam").fill("Test");
    await page.getByLabel("Achternaam").fill("user");
    await page.getByLabel("Email").fill(randomEmail());
    await page.getByLabel("Datum in dienst").fill("2025-01-24");
    await page.getByLabel("Contracten").selectOption("3");

    await page.getByRole("button", { name: "Registreer" }).click();

    // assert
    await expect(page.getByLabel("Rol")).toMatchAriaSnapshot(`
    - combobox "Rol":
      - option "CEO"
      - option "Employee" [selected]
      - option "Admin"
      - option "SectionManager"
      - option "ProjectManager"
    `);
    await expect(page.getByRole("paragraph")).toContainText("Medewerker geregistreerd!");
  });

  test("should show error message with invalid credentials", async ({
                                                                      page
                                                                    }) => {
    await page.goto("/");

    await page.getByLabel("Email").fill("invalid@example.com");
    await page.getByLabel("Wachtwoord").fill("wrongpassword");
    await page.getByRole("button", { name: "Inloggen" }).click();

    // Check for error message
    await expect(page.getByText("Invalid credentials.")).toBeVisible();
  });
});
