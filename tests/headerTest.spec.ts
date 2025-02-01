import {expect, test} from '@playwright/test';

// Reusable login function
async function loginAsAdmin(page) {
    await page.goto('/');
    await page.getByLabel('Email').fill('admin@example.com');
    await page.getByLabel('Wachtwoord').fill('secret');
    await page.getByRole('button', {name: 'Inloggen'}).click();

    // Verify successful login
    await expect(
        page.getByRole('heading', {name: 'Welcome Admin!'}),
    ).toBeVisible();
}

test.describe('Admin Actions', () => {
    test('should successfully login and access the dashboard', async ({page}) => {
        await loginAsAdmin(page);
        // Additional assertions or actions for this test
    });

    test('should press the switchModeButton after login', async ({page}) => {
        await loginAsAdmin(page);

        // Interact with the button
        await page.getByTitle('switchModeButton').click();

        // Add assertions or additional steps
        await expect(
            page.getByText('Contract')
        ).toHaveCount(0);
    });
});
