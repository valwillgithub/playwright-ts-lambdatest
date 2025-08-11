import { test, expect } from '@playwright/test';

/**
 * Specsavers End-to-End User Journey Tests
 *
 * This test suite covers complete user journeys that customers would
 * typically follow on the Specsavers website.
 */

test.describe('Specsavers User Journey Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.specsavers.co.uk/');

    // Accept cookies
    const cookieButton = page.getByRole('button', {
      name: 'Accept All Cookies',
    });
    if (await cookieButton.isVisible()) {
      await cookieButton.click();
    }
  });

  test('User Journey: Browse glasses and add to favourites', async ({
    page,
  }) => {
    // Navigate to glasses
    await page.getByRole('link', { name: 'Glasses', exact: true }).click();

    // Wait for page to load
    await expect(
      page.getByRole('heading', { name: 'Prescription glasses' })
    ).toBeVisible();

    // Apply a filter (Price filter)
    await page.getByRole('button', { name: 'Price' }).click();

    // Wait for filter options to appear and select a price range
    await page.waitForTimeout(1000);

    // Try to add first product to favourites if favourite button exists
    const favouriteButton = page
      .getByRole('checkbox', { name: /Toggle.*in favourites/ })
      .first();
    if (await favouriteButton.isVisible()) {
      await favouriteButton.click();
    }

    // Verify we can navigate to product details
    const firstProductLink = page
      .getByRole('link')
      .filter({ hasText: /Specsavers|HUGO|Vivienne/ })
      .first();
    if (await firstProductLink.isVisible()) {
      await firstProductLink.click();

      // Verify we're on a product detail page
      await expect(page).toHaveURL(/.*glasses\/.+/);
    }
  });

  test('User Journey: Book an eye test appointment', async ({ page }) => {
    // Start from homepage
    await page.getByRole('link', { name: 'Book appointment' }).click();

    // Should navigate to booking system
    await expect(page).toHaveURL(/.*book\/location/);

    // Verify booking flow is accessible
    await expect(page.getByText('1. Location')).toBeVisible();

    // Note: We don't complete the booking to avoid creating test appointments
    // In a real scenario, you might use test data or mock services
  });

  test('User Journey: Research eye test information before booking', async ({
    page,
  }) => {
    // User researches eye tests
    await page.getByRole('link', { name: 'Eye tests' }).click();

    // Read about costs
    await expect(page.getByText('£20 - £25')).toBeVisible();

    // Learn about what happens in an eye test
    await expect(page.getByText('What happens at an eye test?')).toBeVisible();

    // Check information about children's tests
    await expect(page.getByText('child under 15')).toBeVisible();

    // Finally decide to book
    await page.getByRole('link', { name: 'Book now' }).first().click();
    await expect(page).toHaveURL(/.*book\/location/);
  });

  test('User Journey: Explore contact lenses and learn about re-ordering', async ({
    page,
  }) => {
    // Navigate to contact lenses
    await page.getByRole('link', { name: 'Contact lenses' }).click();

    // Explore daily lenses
    await page.getByRole('link', { name: 'Daily' }).click();

    // Go back to contact lenses main page
    await page.goBack();

    // Check re-order functionality
    await page.getByRole('link', { name: 'Re-order contact lenses' }).click();

    // Should navigate to login (since user is not logged in)
    await expect(page).toHaveURL(/.*login/);
  });

  test('User Journey: Check offers before purchasing', async ({ page }) => {
    // User checks offers first
    await page.getByRole('link', { name: 'Offers' }).click();

    // Look at glasses offers
    await expect(page.getByText('2 for 1 glasses from £70')).toBeVisible();

    // Click on specific offer
    await page
      .getByRole('link', { name: /2 for 1 glasses from £70.*View offer/ })
      .click();

    // Should navigate to offer details
    await expect(page).toHaveURL(/.*offers\/.+/);

    // User then goes to browse glasses with offer in mind
    await page.getByRole('link', { name: 'Glasses', exact: true }).click();
    await expect(
      page.getByRole('heading', { name: 'Prescription glasses' })
    ).toBeVisible();
  });

  test('User Journey: Find local store before visiting', async ({ page }) => {
    // User wants to find local store
    await page.getByRole('link', { name: 'Find a store' }).click();

    // Verify store finder loads
    await expect(page).toHaveURL(/.*stores/);

    // Check that we're not on an error page
    await expect(page).not.toHaveTitle(/Error/);

    // User then goes back to book appointment
    await page.getByRole('link', { name: 'Book appointment' }).click();
    await expect(page).toHaveURL(/.*book\/location/);
  });

  test('User Journey: Hearing concerns to booking flow', async ({ page }) => {
    // User navigates to hearing section
    await page.getByRole('link', { name: 'Hearing' }).click();

    // Reads about services
    await expect(
      page.getByText('Book free with Specsavers audiology')
    ).toBeVisible();
    await expect(page.getByText('from £495')).toBeVisible();

    // Decides to book hearing test
    await page.getByRole('link', { name: 'Book a free hearing test' }).click();

    // Should navigate to booking system with hearing context
    await expect(page).toHaveURL(/.*book\/location/);
  });

  test('User Journey: Home visit inquiry', async ({ page }) => {
    // User explores home visits
    await page.getByRole('link', { name: 'Home visits' }).click();

    // Should navigate to home visits page
    await expect(page).toHaveURL(/.*home-visits/);

    // User might check eligibility or request visit
    // Verify page loads properly
    await expect(page).not.toHaveTitle(/Error/);
  });

  test('User Journey: Student looking for discount', async ({ page }) => {
    // Student checks offers for discounts
    await page.getByRole('link', { name: 'Offers' }).click();

    // Looks for student discount
    await expect(page.getByText('Student discount 25% off')).toBeVisible();

    // Clicks on student offer
    await page
      .getByRole('link', { name: /Student discount.*View offer/ })
      .click();

    // Should navigate to student offer page
    await expect(page).toHaveURL(/.*offers\/student/);

    // Student then browses glasses
    await page.getByRole('link', { name: 'Glasses', exact: true }).click();
    await expect(
      page.getByRole('heading', { name: 'Prescription glasses' })
    ).toBeVisible();
  });
});
