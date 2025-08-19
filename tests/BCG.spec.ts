import { chromium, test, expect } from '@playwright/test';

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
test.describe('This describe method', async () => {
  // test.beforeEach('Set BCG cookies', async () => {
  //   const browser = await chromium.launch({ headless: false });
  //   // browserContext = await browser.newContext();
  //   const context = await browser.newContext();
  //   await context.addCookies(cookies);
  //   const page = await context.newPage();
  // });

  test('Verify Headings Test', async ({ page }) => {
    // let browser = await playwright.chromium.launch({ headless: false });
    // let browserContext = await browser.newContext();
    // await browserContext.addCookies(cookies);
    // let page = await browserContext.newPage();
    //let page = await browserContext.newPage();
    const columnHeadings = [
      'Industries',
      'Capabilities',
      'BCG X',
      'Featured Insights',
      'CareersVal',
      'About',
    ];
    await page.context().addCookies(cookies);
    await page.goto('https://www.bcg.com/');
    console.log(await page.context().cookies());
    const headings = await page
      .locator('div.wrapper ul.topbar__navLinks a.topbar__navLinks--a')
      .allTextContents();
    for (const val of columnHeadings) {
      expect
        .soft(headings.includes(val), 'Expected headings to include ' + val)
        .toBe(true);
    }
  });

  //====================================================
  test('Get Value from attribute', async ({ page }) => {
    await page.context().addCookies(cookies);
    await page.goto('https://www.bcg.com/');
    console.log(await page.context().cookies());

    await page.locator("div[id='toggle-side-nav']:visible").click();
    await page.locator("input[id='topbar-search']").first().fill('school');
    await page.keyboard.press('Enter');
    const attri = await page
      .locator("a[href*='chicago-public']")
      .getAttribute('data-path');
    console.log('attri', attri);
    // await page.pause();
  });
}); //test.describe
