import { test, expect } from '@playwright/test';

/**
 * Specsavers Smoke Test Suite
 *
 * This test suite covers critical user journeys and core functionality
 * to ensure the website is functioning properly after deployments.
 *
 * Test Categories:
 * 1. Homepage and Navigation
 * 2. Product Catalog (Glasses & Contact Lenses)
 * 3. Service Pages (Eye Tests, Hearing)
 * 4. Booking System
 * 5. Store Locator
 * 6. Offers and Promotions
 */

test.describe('Specsavers Smoke Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage and accept cookies for all tests
    await page.goto('https://www.specsavers.co.uk/');

    // Accept cookies if banner appears
    const cookieButton = page.getByRole('button', {
      name: 'Accept All Cookies',
    });
    if (await cookieButton.isVisible()) {
      await cookieButton.click();
    }
  });

  test.describe('Homepage and Core Navigation', () => {
    test('should load homepage with all essential elements', async ({
      page,
    }) => {
      // Verify page loads correctly
      await expect(page).toHaveTitle(/Welcome to Specsavers Opticians/);

      // Check main navigation is present
      await expect(
        page.getByRole('link', { name: 'Glasses', exact: true })
      ).toBeVisible();
      await expect(
        page.getByRole('link', { name: 'Contact lenses' })
      ).toBeVisible();
      await expect(page.getByRole('link', { name: 'Eye tests' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Hearing' })).toBeVisible();
      await expect(
        page.getByRole('link', { name: 'Home visits' })
      ).toBeVisible();
      await expect(page.getByRole('link', { name: 'Offers' })).toBeVisible();

      // Check key action buttons
      await expect(
        page.getByRole('link', { name: 'Book appointment' })
      ).toBeVisible();
      await expect(
        page.getByRole('link', { name: 'Find a store' })
      ).toBeVisible();

      // Verify main content areas
      await expect(
        page.getByRole('heading', { name: 'Book your appointment today' })
      ).toBeVisible();
      await expect(page.getByText('Advanced eye health scan')).toBeVisible();
      await expect(page.getByText('Our freshest frames')).toBeVisible();
    });

    test('should navigate to main product categories', async ({ page }) => {
      // Test Glasses navigation
      await page.getByRole('link', { name: 'Glasses', exact: true }).click();
      await expect(page).toHaveURL(/.*glasses\/all-glasses/);
      await expect(page).toHaveTitle(/Prescription glasses/);

      // Test Contact Lenses navigation
      await page.getByRole('link', { name: 'Contact lenses' }).click();
      await expect(page).toHaveURL(/.*contact-lenses/);
      await expect(page).toHaveTitle(/Buy Contact Lenses Online/);

      // Test Eye Tests navigation
      await page.getByRole('link', { name: 'Eye tests' }).click();
      await expect(page).toHaveURL(/.*eye-test/);
      await expect(page).toHaveTitle(/Book an eye test/);
    });
  });

  test.describe('Product Catalog - Glasses', () => {
    test('should display glasses catalog with filtering options', async ({
      page,
    }) => {
      await page.getByRole('link', { name: 'Glasses', exact: true }).click();

      // Verify page loads
      await expect(
        page.getByRole('heading', { name: 'Prescription glasses' })
      ).toBeVisible();

      // Check filter options are available
      await expect(
        page.getByRole('button', { name: 'Age & Gender' })
      ).toBeVisible();
      await expect(page.getByRole('button', { name: 'Brand' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Colour' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Price' })).toBeVisible();

      // Verify sort options
      await expect(
        page.getByRole('combobox', { name: 'Sort by' })
      ).toBeVisible();

      // Check product listings appear
      await expect(page.getByText('Showing', { exact: false })).toBeVisible();

      // Verify pagination
      await expect(
        page.getByRole('navigation', { name: 'Pagination' })
      ).toBeVisible();
    });

    test('should display individual product details and actions', async ({
      page,
    }) => {
      await page.getByRole('link', { name: 'Glasses', exact: true }).click();

      // Wait for products to load
      await page.waitForSelector('h2:has-text("Specsavers")');

      // Check first product has essential elements
      const firstProduct = page
        .locator('[data-testid="product-tile"]')
        .first()
        .or(
          page
            .locator('article')
            .first()
            .or(page.locator('li').filter({ hasText: 'Specsavers' }).first())
        );

      // Verify price is displayed
      await expect(page.getByText('£', { exact: false })).toBeVisible();

      // Check virtual try-on button exists (if available)
      const virtualTryOn = page.getByText('Virtual Try-on');
      if (await virtualTryOn.isVisible()) {
        await expect(virtualTryOn).toBeVisible();
      }

      // Check favourites functionality exists
      const favouriteButton = page
        .locator('[data-testid="favourite-button"]')
        .first()
        .or(
          page.getByRole('checkbox', { name: /Toggle.*in favourites/ }).first()
        );
      if (await favouriteButton.isVisible()) {
        await expect(favouriteButton).toBeVisible();
      }
    });
  });

  test.describe('Contact Lenses', () => {
    test('should display contact lens categories and re-order option', async ({
      page,
    }) => {
      await page.getByRole('link', { name: 'Contact lenses' }).click();

      // Verify main categories
      await expect(page.getByRole('link', { name: 'Daily' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Monthly' })).toBeVisible();
      await expect(
        page.getByRole('link', { name: 'Twice Monthly' })
      ).toBeVisible();

      // Check re-order functionality
      await expect(
        page.getByRole('link', { name: 'Re-order contact lenses' })
      ).toBeVisible();

      // Verify pricing information
      await expect(page.getByText('£7.50 a month')).toBeVisible();
      await expect(page.getByText('free delivery')).toBeVisible();
    });
  });

  test.describe('Eye Test Information and Booking', () => {
    test('should display comprehensive eye test information', async ({
      page,
    }) => {
      await page.getByRole('link', { name: 'Eye tests' }).click();

      // Verify main content
      await expect(
        page.getByRole('heading', { name: 'Book an eye test' })
      ).toBeVisible();
      await expect(page.getByRole('link', { name: 'Book now' })).toBeVisible();

      // Check pricing information
      await expect(page.getByText('£20 - £25')).toBeVisible();

      // Verify test details sections
      await expect(
        page.getByText('What happens at an eye test?')
      ).toBeVisible();
      await expect(
        page.getByText('How long does an eye test take?')
      ).toBeVisible();
      await expect(
        page.getByText('How often should you have an eye test?')
      ).toBeVisible();

      // Check OCT scan information
      await expect(page.getByText('OCT scan')).toBeVisible();

      // Verify children's eye test info
      await expect(page.getByText('child under 15')).toBeVisible();
    });

    test('should access booking system with correct flow steps', async ({
      page,
    }) => {
      await page.getByRole('link', { name: 'Eye tests' }).click();
      await page.getByRole('link', { name: 'Book now' }).first().click();

      // Verify booking system loads
      await expect(page).toHaveURL(/.*book\/location/);
      await expect(page).toHaveTitle(/Book Online.*Book an Appointment/);

      // Check booking steps are visible
      await expect(page.getByText('1. Location')).toBeVisible();
      await expect(page.getByText('2. Appointment type')).toBeVisible();
      await expect(page.getByText('3. Date and time')).toBeVisible();
      await expect(page.getByText('4. Personal details')).toBeVisible();
      await expect(page.getByText('5. Recap')).toBeVisible();

      // Verify map region is present for location selection
      await expect(
        page.getByRole('region', { name: /Map.*United Kingdom/ })
      ).toBeVisible();
    });
  });

  test.describe('Hearing Services', () => {
    test('should display hearing services with key information', async ({
      page,
    }) => {
      await page.getByRole('link', { name: 'Hearing' }).click();

      // Verify main content
      await expect(
        page.getByRole('heading', {
          name: 'Book free with Specsavers audiology',
        })
      ).toBeVisible();
      await expect(
        page.getByRole('link', { name: 'Book a free hearing test' })
      ).toBeVisible();

      // Check key service features
      await expect(
        page.getByText('20 years of our audiology services')
      ).toBeVisible();
      await expect(page.getByText('Best value price promise')).toBeVisible();
      await expect(
        page.getByText('100 day money back guarantee')
      ).toBeVisible();
      await expect(page.getByText('4 year hearing aid warranty')).toBeVisible();

      // Verify pricing information
      await expect(page.getByText('from £495')).toBeVisible();

      // Check additional services
      await expect(page.getByText('Earwax removal')).toBeVisible();
      await expect(page.getByText('NHS-funded hearing aids')).toBeVisible();
      await expect(page.getByText('Free online hearing check')).toBeVisible();
    });
  });

  test.describe('Offers and Promotions', () => {
    test('should display offers page with key promotions', async ({ page }) => {
      await page.getByRole('link', { name: 'Offers' }).click();

      // Verify page loads
      await expect(page).toHaveTitle(/Offers on Glasses, Contact Lenses/);
      await expect(
        page.getByRole('heading', { name: 'Offers to smile about' })
      ).toBeVisible();

      // Check category tabs
      await expect(
        page.getByRole('link', { name: 'Glasses', exact: true })
      ).toBeVisible();
      await expect(
        page.getByRole('link', { name: 'Contact Lenses' })
      ).toBeVisible();
      await expect(
        page.getByRole('link', { name: 'Hearing', exact: true })
      ).toBeVisible();

      // Verify key offers are present
      await expect(page.getByText('2 for 1 glasses from £70')).toBeVisible();
      await expect(page.getByText('Complete glasses from £15')).toBeVisible();
      await expect(page.getByText('Student discount 25% off')).toBeVisible();
      await expect(page.getByText('NHS customers')).toBeVisible();

      // Check offer details are clickable
      await expect(
        page.getByRole('link', { name: /2 for 1 glasses from £70.*View offer/ })
      ).toBeVisible();
    });
  });

  test.describe('Store Locator', () => {
    test('should access store finder functionality', async ({ page }) => {
      await page.getByRole('link', { name: 'Find a store' }).click();

      // Verify store finder loads
      await expect(page).toHaveURL(/.*stores/);

      // Basic check that page loads (specific elements may vary)
      await expect(page).not.toHaveTitle(/Error/);

      // Should have content related to store finding
      const hasStoreContent =
        (await page.getByText('store').isVisible()) ||
        (await page.getByText('location').isVisible()) ||
        (await page.getByText('find').isVisible());
      expect(hasStoreContent).toBeTruthy();
    });
  });

  test.describe('User Account Features', () => {
    test('should display login and account options', async ({ page }) => {
      // Check login link is present
      await expect(page.getByRole('link', { name: 'Log in' })).toBeVisible();

      // Check shopping and favourites links
      await expect(
        page.getByRole('link', { name: 'Your shopping' })
      ).toBeVisible();
      await expect(
        page.getByRole('link', { name: 'Favourites' })
      ).toBeVisible();

      // Check re-order functionality
      await expect(
        page.getByRole('link', { name: 'Re-order contact lenses' })
      ).toBeVisible();
    });
  });

  test.describe('Footer and Legal', () => {
    test('should display complete footer with all sections', async ({
      page,
    }) => {
      // Scroll to footer
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

      // Check main footer sections
      await expect(page.getByRole('heading', { name: 'Browse' })).toBeVisible();
      await expect(
        page.getByRole('heading', { name: 'Services' })
      ).toBeVisible();
      await expect(
        page.getByRole('heading', { name: 'Eye and ear health' })
      ).toBeVisible();
      await expect(page.getByRole('heading', { name: 'About' })).toBeVisible();

      // Check social media links
      await expect(
        page.getByRole('button', { name: 'Facebook' })
      ).toBeVisible();
      await expect(page.getByRole('button', { name: 'Twitter' })).toBeVisible();
      await expect(
        page.getByRole('button', { name: 'Instagram' })
      ).toBeVisible();
      await expect(page.getByRole('button', { name: 'YouTube' })).toBeVisible();

      // Check copyright and legal links
      await expect(page.getByText('© Specsavers 2025')).toBeVisible();
      await expect(
        page.getByRole('link', { name: 'Privacy policy' })
      ).toBeVisible();
      await expect(
        page.getByRole('link', { name: 'Legal policies' })
      ).toBeVisible();
    });
  });

  test.describe('Search Functionality', () => {
    test('should have search capability', async ({ page }) => {
      // Check if search link/button exists
      const searchButton = page.getByRole('link', { name: 'Search' });
      await expect(searchButton).toBeVisible();

      // Could expand to test search functionality if needed
    });
  });

  test.describe('Responsive Design Check', () => {
    test('should work on mobile viewport', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });

      // Navigate to homepage
      await page.goto('https://www.specsavers.co.uk/');

      // Accept cookies if banner appears
      const cookieButton = page.getByRole('button', {
        name: 'Accept All Cookies',
      });
      if (await cookieButton.isVisible()) {
        await cookieButton.click();
      }

      // Verify page loads properly on mobile
      await expect(page).toHaveTitle(/Welcome to Specsavers Opticians/);

      // Check main navigation is accessible (may be in hamburger menu)
      await expect(
        page.getByRole('link', { name: 'Glasses', exact: true })
      ).toBeVisible();

      // Check key action buttons are still visible
      await expect(
        page.getByRole('link', { name: 'Book appointment' })
      ).toBeVisible();
    });
  });

  test.describe('Performance and Accessibility', () => {
    test('should load homepage within reasonable time', async ({ page }) => {
      const startTime = Date.now();

      await page.goto('https://www.specsavers.co.uk/');

      // Accept cookies
      const cookieButton = page.getByRole('button', {
        name: 'Accept All Cookies',
      });
      if (await cookieButton.isVisible()) {
        await cookieButton.click();
      }

      // Wait for main content to be visible
      await expect(
        page.getByRole('heading', { name: 'Book your appointment today' })
      ).toBeVisible();

      const loadTime = Date.now() - startTime;

      // Assert page loads within 10 seconds (adjust as needed)
      expect(loadTime).toBeLessThan(10000);
    });

    test('should have proper page titles for SEO', async ({ page }) => {
      // Homepage
      await expect(page).toHaveTitle(/Welcome to Specsavers Opticians/);

      // Glasses page
      await page.getByRole('link', { name: 'Glasses', exact: true }).click();
      await expect(page).toHaveTitle(/Prescription glasses/);

      // Eye test page
      await page.getByRole('link', { name: 'Eye tests' }).click();
      await expect(page).toHaveTitle(/Book an eye test/);

      // Contact lenses page
      await page.getByRole('link', { name: 'Contact lenses' }).click();
      await expect(page).toHaveTitle(/Buy Contact Lenses Online/);
    });
  });
});
