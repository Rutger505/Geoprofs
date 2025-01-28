import {expect, test} from '@playwright/test';
import {loginAsEmployee} from './components/employeeLogin';

test.describe('Verlof verzoek', () => {
    test('request leave', async ({page}) => {

        await loginAsEmployee(page, 'secret');


        await page.getByRole('link', {name: 'Verlofverzoeken'}).click();

        await page.getByText("Nieuw Verlofverzoek").click();

        await page.getByLabel('Startdatum').fill('2030-01-01');


        await page.getByLabel('Einddatum').fill('2030-01-02');

        await page.getByLabel('Categorie').selectOption({label: 'Ziek'});

        await page.getByLabel('Reden').fill('Koorst heeft mij weer te pakken');

        await page.getByText('Verlof aanvragen').click();

        await expect(
            await page.getByText('Verlofaanvraag')
        ).toBeVisible();


    });


});
