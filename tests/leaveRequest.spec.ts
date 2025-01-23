import {test} from '@playwright/test';
import {loginAsMedewerker} from './auth.spec';

test.describe('Admin Actions', () => {
    test('should successfully login and access the dashboard', async ({page}) => {
        await loginAsMedewerker(page);
        // Additional assertions or actions for this test
    });


});
