import { test, expect } from '@playwright/test';

await page.goto('https://www.google.com/sorry/index?continue=https://www.google.com/search%3Fq%3D%2527https%253A%252F%252Fauportal-dev.geoanalytics.group%252F%26oq%3D%2527https%253A%252F%252Fauportal-dev.geoanalytics.group%252F%26gs_lcrp%3DEgZjaHJvbWUyBggAEEUYOdIBBzU4NGowajKoAgCwAgE%26sourceid%3Dchrome%26ie%3DUTF-8%26sei%3DjFUqatf5JLzt2roP3frDyQI&q=EhAkBbAAAwAAsAAAAAAAAAcgGI2rqdEGIjAES6ZKplfP6iHw5PmwaG6HVu4opQgs6n6FHiTVO0iOHt_pO86k4B4n9YjkJMPxnjMyAVJaAUM');
await page.locator('iframe[name="a-6j2nx07iuo4"]').contentFrame().getByRole('checkbox', { name: 'I\'m not a robot' }).click();
await page.goto('https://auportal-dev.geoanalytics.group/');
await page.getByRole('button', { name: 'Browse featured layers  Browse' }).click();
await page.locator('a').filter({ hasText: 'Earth Resources v1' }).click();
await page.getByText('Add Earth Resource Mine', { exact: true }).click();
await page.getByRole('button', { name: 'Add' }).first().click();test('test', async ({ page }) => {
  // Recording...
});