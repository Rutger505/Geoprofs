import {expect, test} from "@playwright/test";

async function loginAsMedewerker(page, password: string) {
    await page.goto('/');
    await page.getByLabel('Email').fill('employee@example.com');
    await page.getByLabel('Wachtwoord').fill(password);
    await page.getByRole('button', {name: 'Inloggen'}).click();
}

test.describe("Login", () => {
    test("should successfully login and access the dashboard", async ({page}) => {
        await loginAsMedewerker(page, 'secret');

        await expect(
            page.getByRole("heading", {name: "Welcome Employee!"}),
        ).toBeVisible();
    });

    test("should show error message with invalid credentials", async ({page}) => {
        await loginAsMedewerker(page, 'invalid');

        // Check for error message
        await expect(page.getByText("Invalid credentials.")).toBeVisible();
    });
});

test.describe("Logout", () => {
    test("should show login page", async ({page}) => {
        await loginAsMedewerker(page, 'secret');

        await page.getByText('Uitloggen').click();

        await expect(page.getByRole('heading', {name: 'Inloggen'})).toBeVisible();
    });
});