
import { test, expect, Page } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();


async function login(page: Page) {
    await page.goto(process.env.UAT_URL || '');
    await page.getByText('Company ID').nth(1).click();
    await page.getByTestId('companyId').fill(process.env.COMPID || '');
    await page.getByTestId('companyId').press('Tab');
    await page.getByTestId('userId').fill(process.env.USERID || '');
    await page.getByTestId('userId').press('Tab');
    await page.getByTestId('password').fill(process.env.PASSWORD || '');
    await page.getByTestId('signOnButton').click();
    const heading = page.getByRole('heading', { name: 'Hello, Kushal' })
    await page.waitForTimeout(6000);
    await expect(heading).toBeVisible();

    await page.getByTestId('66dfc4bef281ad0f2529f64f').locator('a').click();
    await page.locator('a').filter({ hasText: 'Go to Markets dashboard' }).click();

    await page.getByRole('textbox', { name: 'Passcode Passcode' }).fill(process.env.TOKEN || '');
    await page.getByRole('button', { name: 'Continue' }).click();

}

test.beforeEach(async ({ page }) => {
    await login(page);
});

test('usd vol', async ({ page }) => {

    await page.locator('.highcharts-point').first().click();
    await page.locator('.highcharts-point').first().click();
    await page.locator('.highcharts-halo').click();
    await page.getByRole('region', { name: 'USD Volume traded header' }).getByLabel('Clear Currency pair').click();
    await page.getByTestId('popup-balloon-id').getByText('EUR/USD').click();
    await page.getByTestId('popup-balloon-id').locator('div').first().click();
    await page.getByTestId('popup-balloon-id').locator('div').first().click();
});