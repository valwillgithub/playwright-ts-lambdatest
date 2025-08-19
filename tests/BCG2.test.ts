import { test, expect } from '@playwright/test';

const cookies = [
  {
    name: 'notice_behaviour',
    value: 'expressed,eu',
    path: '/',
    domain: '.bcg.com',
  },
  {
    name: 'notice_gdpr_prefs',
    value: '0,1,2',
    path: '/',
    domain: '.bcg.com',
  },
];
test('test', async ({ page }) => {
  await page.context().addCookies(cookies);
  await page.goto('https://www.bcg.com/');
  await page
    .getByRole('button', { name: 'Link to open BCG site menu' })
    .click();
  await expect(page.getByRole('link', { name: 'Industries' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Capabilities' })).toBeVisible();
  await expect(page.locator('nav')).toContainText('BCG X');
  await expect(page.locator('nav')).toMatchAriaSnapshot(`- text: Our Services`);
  await expect(page.getByRole('link', { name: 'Our Insights' })).toBeVisible();

  const firstCount = await page
    .locator('.global-navigation__primary-nav-items > li')
    .count();

  let index = 1;
  const selector = `.global-navigation__primary-nav-items > li:nth-child(${index})`;
  const selector2 = `.global-navigation__primary-nav-items > li:nth-child(${index}) > ul > li`;

  const fiveListItems = page.locator(selector2);

  let myArray: string[] = [];
  for (let i = 1; i <= firstCount; i++) {
    const sel1 = `.global-navigation__primary-nav-items > li:nth-child(${i})`;
    const rc1 = (await page.locator(sel1).innerText()).trim();
    myArray.push(rc1);
    const selector2 = `.global-navigation__primary-nav-items > li:nth-child(${i}) > ul > li`;
    const rc2Count = await page.locator(selector2).count();
    for (let j = 1; j <= rc2Count; j++) {
      const sel2 = `.global-navigation__primary-nav-items > li:nth-child(${i}) > ul > li:nth-child(${j})`;
      const rc2 = (await page.locator(sel2).innerText()).trim();
      myArray.push(rc2);
    }
  }
  console.log('==================================================');
  console.log('myArray => ', myArray);
  console.log('==================================================');
});
