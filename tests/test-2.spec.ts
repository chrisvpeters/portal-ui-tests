import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://auportal-dev.geoanalytics.group/');
  await page.getByRole('button', { name: 'Browse featured layers  Browse' }).click();
  await page.locator('div:nth-child(4) > .col').click();
  await page.getByText('Add National Virtual Core').click();
  await page.getByRole('button', { name: 'Add' }).nth(4).click();
  await page.locator('select').selectOption('0: Object');
  await page.getByRole('heading', { name: ' Active Layers National' }).locator('input[type="text"]').click();
  await page.getByRole('heading', { name: ' Active Layers National' }).locator('input[type="text"]').fill('MSDP04');
  await page.getByText('Apply Filter').click();


  await page.getByRole('button', { name: 'Reset map view' }).click();


  await page.getByRole('button', { name: '3D' }).click();
  await page.getByRole('button', { name: '3D' }).click();
  await page.getByRole('button', { name: '3D' }).click();
  await page.getByRole('button', { name: 'Columbus View' }).click();
  await page.getByRole('button', { name: 'Columbus View' }).click();
  await page.getByRole('button', { name: '2D' }).click();
  await page.getByRole('button', { name: '2D' }).click();
  await page.getByRole('button', { name: '2D' }).press('Escape');
  await page.getByRole('button', { name: '3D' }).click();
  await page.getByRole('button', { name: '2D' }).click();
});