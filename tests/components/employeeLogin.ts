export async function loginAsMedewerker(page, password: string) {
    await page.goto('/');
    await page.getByLabel('Email').fill('employee@example.com');
    await page.getByLabel('Wachtwoord').fill(password);
    await page.getByRole('button', {name: 'Inloggen'}).click();
}