import { expect, test } from "@playwright/test";

async function loginAsAdmin(page) {
 await page.goto("/");
 await page.getByLabel("Email").fill("admin@example.com"); 
 await page.getByLabel("Wachtwoord").fill("secret");
 await page.getByRole("button", { name: "Inloggen" }).click();
}

test.describe("User", () => {
 test("should be able to register user", async ({ page }) => {
   await loginAsAdmin(page);

   await page.getByRole("link", { name: "Werknemers" }).click();
   await page.getByRole("link", { name: "Registreer nieuwe medewerker" }).click();

   await page.getByLabel("Voornaam").fill("Test");
   await page.getByLabel("Achternaam").fill("user");
   await page.getByLabel("Email").fill(randomEmail());
   await page.getByLabel("Datum in dienst").fill("2025-01-24");
   await page.getByLabel("Contracten").selectOption("3");

   await page.getByRole("button", { name: "Registreer" }).click();

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

 test("should change user last name", async ({ page }) => {
   await loginAsAdmin(page);

   await page.getByRole("link", { name: "Werknemers" }).click();
   await page.locator("div").filter({ hasText: /^Employee Example$/ }).getByRole("link").click();

   const newName = randomString();
   await page.getByLabel("Achternaam").fill(newName);

   await page.locator("form").filter({ hasText: "EmailVoornaamAchternaamOpslaan" }).getByRole("button").click();
   await expect(page.locator("h1")).toContainText(newName);

   await page.getByLabel("Achternaam").fill("Example");
   await page.locator("form").filter({ hasText: "EmailVoornaamAchternaamOpslaan" }).getByRole("button").click();
   await expect(page.locator("h1")).toContainText("Example");
 });

 test("should save section selection", async ({ page }) => {
   await loginAsAdmin(page);

   await page.getByRole("link", { name: "Werknemers" }).click();
   await page.locator("div").filter({ hasText: /^Employee Example$/ }).getByRole("link").click();

   await page.getByLabel("Sectie").selectOption("1");
   await page.getByRole("button", { name: "Opslaan" }).first().click();

   await expect(page.getByLabel("Sectie")).toHaveValue("1");
 });

 test("should save project selection", async ({ page }) => {
   await loginAsAdmin(page);

   await page.getByRole("link", { name: "Werknemers" }).click();
   await page.locator("div").filter({ hasText: /^Employee Example$/ }).getByRole("link").click();

   await page.getByLabel("Project").selectOption("1"); 
   await page.getByRole("button", { name: "Opslaan" }).nth(1).click();

   await expect(page.getByLabel("Project")).toHaveValue("1");
 });
});