import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // Recording...



  await page.goto('https://auportal-dev.geoanalytics.group/');
  await page.getByRole('button', { name: 'Browse featured layers  Browse' }).click();
  await page.locator('div:nth-child(11) > .col').click();
  await page.getByRole('button', { name: 'Add' }).nth(2).click();
  await page.getByRole('button', { name: 'Close active layers panel' }).click();
  await page.getByRole('button', { name: 'Browse featured layers  Browse' }).click();
  await page.locator('a').filter({ hasText: 'NSW Drillhole Geochemistry -' }).click();
  await page.locator('a').filter({ hasText: 'Groundwater' }).click();
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('button', { name: 'Remove layer' }).nth(1).click();
  await page.getByRole('button', { name: 'Remove layer' }).click();
  await page.getByRole('button', { name: 'Browse featured layers  Browse' }).click();
  await page.locator('a').filter({ hasText: 'Indigenous Data' }).click();
  await page.locator('div:nth-child(23) > .col').click();
  await page.getByRole('button', { name: 'Add' }).nth(3).click();




});