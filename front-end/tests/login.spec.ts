import { test } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Email").fill("employee@example.com");
  await page.getByLabel("Wachtwoord").fill("secret");
  await page.getByRole("button", { name: "Inloggen" }).click();
  await page.getByRole("heading", { name: "Recente verlofverzoeken" }).click();
  await page.getByRole("heading", { name: "Vakantiedagen" }).click();
  await page.getByRole("heading", { name: "Verlofdagen" }).click();
});
