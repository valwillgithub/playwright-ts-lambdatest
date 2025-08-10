import { test, expect } from '@playwright/test';

/**
 * Specsavers Critical Path Smoke Tests
 *
 * This is a focused test suite that covers the most critical user journeys
 * for quick validation after deployments. Designed to run fast (~5-10 minutes).
 *
 * Critical Paths:
 * 1. Homepage loads properly
 * 2. Main navigation works
 * 3. Eye test booking flow starts
 * 4. Product browsing works
 * 5. Key offers are accessible
 */

test.describe('Specsavers Critical Path Smoke Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Set timeout for each test
    test.setTimeout(60000);

    // Navigate with increased timeout
    await page.goto('https://www.specsavers.co.uk/', {
      waitUntil: 'domcontentloaded',
      timeout: 45000,
    });

    // Accept cookies if banner appears
    const cookieButton = page.getByRole('button', {
      name: 'Accept All Cookies',
    });
    if (await cookieButton.isVisible()) {
      await cookieButton.click();
      await page.waitForTimeout(1000); // Brief wait for cookie acceptance
    }
  });

  test('Critical Path: Homepage loads with essential elements', async ({
    page,
  }) => {
    // Verify page loads correctly
    await expect(page).toHaveTitle(/Welcome to Specsavers Opticians/);

    // Check core navigation
    await expect(
      page.getByRole('link', { name: 'Glasses', exact: true })
    ).toBeVisible();
    await expect(page.getByRole('link', { name: 'Eye tests' })).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Contact lenses' })
    ).toBeVisible();

    // Verify critical action buttons
    await expect(
      page.getByRole('link', { name: 'Book appointment' })
    ).toBeVisible();

    // Check key content sections load
    await expect(page.getByText('Book your appointment today')).toBeVisible();
    await expect(page.getByText('Advanced eye health scan')).toBeVisible();
  });

  test('Critical Path: Eye test booking flow accessible', async ({ page }) => {
    // Navigate to eye tests
    await page.getByRole('link', { name: 'Eye tests' }).click();
    await expect(page).toHaveURL(/.*eye-test/);

    // Start booking process
    await page.getByRole('link', { name: 'Book now' }).first().click();
    await expect(page).toHaveURL(/.*book\/location/);

    // Verify booking system loads with all steps
    await expect(page.getByText('1. Location')).toBeVisible();
    await expect(page.getByText('2. Appointment type')).toBeVisible();
    await expect(page.getByText('3. Date and time')).toBeVisible();
    await expect(page.getByText('4. Personal details')).toBeVisible();
    await expect(page.getByText('5. Recap')).toBeVisible();
  });

  test('Critical Path: Glasses catalog browsing works', async ({ page }) => {
    // Navigate to glasses
    await page.getByRole('link', { name: 'Glasses', exact: true }).click();
    await expect(page).toHaveURL(/.*glasses\/all-glasses/);

    // Verify catalog loads
    await expect(
      page.getByRole('heading', { name: 'Prescription glasses' })
    ).toBeVisible();

    // Check filtering options available
    await expect(page.getByRole('button', { name: 'Brand' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Price' })).toBeVisible();

    // Verify products display
    await expect(page.getByText('Showing', { exact: false })).toBeVisible();
    await expect(page.getByText('£', { exact: false })).toBeVisible();
  });

  test('Critical Path: Contact lens categories accessible', async ({
    page,
  }) => {
    // Navigate to contact lenses
    await page.getByRole('link', { name: 'Contact lenses' }).click();
    await expect(page).toHaveURL(/.*contact-lenses/);

    // Verify main categories
    await expect(page.getByRole('link', { name: 'Daily' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Monthly' })).toBeVisible();

    // Check re-order functionality
    await expect(
      page.getByRole('link', { name: 'Re-order contact lenses' })
    ).toBeVisible();
  });

  test('Critical Path: Offers page loads with key promotions', async ({
    page,
  }) => {
    // Navigate to offers
    await page.getByRole('link', { name: 'Offers' }).click();
    await expect(page).toHaveURL(/.*offers/);

    // Verify key offers
    await expect(page.getByText('2 for 1 glasses from £70')).toBeVisible();
    await expect(page.getByText('Complete glasses from £15')).toBeVisible();

    // Check offer categories
    await expect(
      page.getByRole('link', { name: 'Glasses', exact: true })
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Contact Lenses' })
    ).toBeVisible();
  });

  test('Critical Path: Store finder accessible', async ({ page }) => {
    // Click store finder
    await page.getByRole('link', { name: 'Find a store' }).click();

    // Verify navigation works (store finder loads)
    await expect(page).toHaveURL(/.*stores/);
    await expect(page).not.toHaveTitle(/Error/);
  });

  test('Critical Path: Hearing services page loads', async ({ page }) => {
    // Navigate to hearing
    await page.getByRole('link', { name: 'Hearing' }).click();
    await expect(page).toHaveURL(/.*hearing/);

    // Check key content
    await expect(
      page.getByText('Book free with Specsavers audiology')
    ).toBeVisible();
    await expect(page.getByText('from £495')).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Book a free hearing test' })
    ).toBeVisible();
  });

  test('Critical Path: User account options available', async ({ page }) => {
    // Check account-related links are present
    await expect(page.getByRole('link', { name: 'Log in' })).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Your shopping' })
    ).toBeVisible();
    await expect(page.getByRole('link', { name: 'Favourites' })).toBeVisible();
  });

  test('Critical Path: Footer loads with legal links', async ({ page }) => {
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Check essential footer elements
    await expect(page.getByText('© Specsavers 2025')).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Privacy policy' })
    ).toBeVisible();

    // Check social links present
    await expect(page.getByRole('button', { name: 'Facebook' })).toBeVisible();
  });

  test('Critical Path: Mobile responsiveness check', async ({ page }) => {
    // Test on mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Reload to ensure mobile view
    await page.reload();

    // Accept cookies again if needed
    const cookieButton = page.getByRole('button', {
      name: 'Accept All Cookies',
    });
    if (await cookieButton.isVisible()) {
      await cookieButton.click();
    }

    // Verify core functionality still works
    await expect(
      page.getByRole('link', { name: 'Glasses', exact: true })
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Book appointment' })
    ).toBeVisible();
  });
});
