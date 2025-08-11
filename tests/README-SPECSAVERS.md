# Specsavers Website Smoke Test Suite

This comprehensive test suite ensures the critical functionality of the Specsavers website (https://www.specsavers.co.uk) is working properly after deployments.

## Test Files Overview

### 1. `specsavers-critical-path.test.ts` ⚡

**Purpose**: Fast-running smoke tests for CI/CD pipeline  
**Run Time**: ~5-10 minutes  
**Coverage**: Most critical user paths that must work

**Key Tests:**

- Homepage loads with essential elements
- Eye test booking flow accessible
- Glasses catalog browsing works
- Contact lens categories accessible
- Offers page loads with key promotions
- Store finder accessible
- Mobile responsiveness check

**Usage**: Run after every deployment to master branch

```bash
npx playwright test specsavers-critical-path.test.ts
```

### 2. `specsavers-smoke.test.ts` 🔍

**Purpose**: Comprehensive smoke testing  
**Run Time**: ~15-25 minutes  
**Coverage**: All major website functionality

**Test Categories:**

- Homepage and Core Navigation
- Product Catalog (Glasses & Contact Lenses)
- Service Pages (Eye Tests, Hearing)
- Booking System
- Store Locator
- Offers and Promotions
- User Account Features
- Footer and Legal
- Search Functionality
- Responsive Design
- Performance and Accessibility

**Usage**: Run for thorough testing before major releases

```bash
npx playwright test specsavers-smoke.test.ts
```

### 3. `specsavers-user-journeys.test.ts` 👥

**Purpose**: End-to-end user journey validation  
**Run Time**: ~10-15 minutes  
**Coverage**: Complete customer workflows

**User Journeys Tested:**

- Browse glasses and add to favourites
- Book an eye test appointment
- Research eye test information before booking
- Explore contact lenses and re-ordering
- Check offers before purchasing
- Find local store before visiting
- Hearing concerns to booking flow
- Home visit inquiry
- Student looking for discount

**Usage**: Run weekly or before major feature releases

```bash
npx playwright test specsavers-user-journeys.test.ts
```

## Website Functionality Covered

### Core Services ✅

- **Glasses**: Product catalog, filtering, virtual try-on, pricing (£15-£170)
- **Contact Lenses**: Daily/Monthly/Twice Monthly categories, re-ordering
- **Eye Tests**: Information, booking flow (5-step process), OCT scans
- **Hearing**: Hearing aids (from £495), tests, earwax removal
- **Home Visits**: Eligibility checks, booking system

### Key Features ✅

- **Navigation**: Main menu, breadcrumbs, footer links
- **Search**: Product search and filtering
- **Booking System**: 5-step appointment booking
- **Store Locator**: 900+ locations finder
- **Offers**: 2-for-1 deals, student discounts, NHS offers
- **Account Features**: Login, favourites, shopping cart
- **Mobile Responsive**: Cross-device compatibility

### Critical User Flows ✅

1. **Homepage → Product Browsing → Details**
2. **Eye Test Information → Booking Flow**
3. **Offers Research → Product Purchase**
4. **Store Finding → Appointment Booking**
5. **Contact Lens Re-ordering**

## Running the Tests

### Prerequisites

```bash
npm install
npx playwright install
```

### Run All Specsavers Tests

```bash
npx playwright test specsavers
```

### Run Specific Test Suite

```bash
# Critical path only (fast)
npx playwright test specsavers-critical-path

# Full smoke tests (comprehensive)
npx playwright test specsavers-smoke

# User journey tests
npx playwright test specsavers-user-journeys
```

### Run in Different Browsers

```bash
# Chrome
npx playwright test specsavers --project=chromium

# Firefox
npx playwright test specsavers --project=firefox

# Safari
npx playwright test specsavers --project=webkit
```

### Run in Headed Mode (Visual)

```bash
npx playwright test specsavers --headed
```

### Debug Mode

```bash
npx playwright test specsavers --debug
```

## CI/CD Integration

### For Continuous Integration

Add to your CI pipeline (e.g., GitHub Actions, Jenkins):

```yaml
# Example GitHub Actions workflow
- name: Run Specsavers Critical Path Tests
  run: npx playwright test specsavers-critical-path.test.ts

- name: Upload Test Results
  uses: actions/upload-artifact@v3
  if: failure()
  with:
    name: playwright-report
    path: playwright-report/
```

### Test Execution Strategy

1. **After every commit to master**: Run `specsavers-critical-path.test.ts`
2. **Before releases**: Run `specsavers-smoke.test.ts`
3. **Weekly regression**: Run all test suites
4. **After major changes**: Run `specsavers-user-journeys.test.ts`

## Test Configuration

The tests are configured to:

- Handle cookie acceptance automatically
- Wait for page loads appropriately
- Test mobile responsiveness
- Verify page titles for SEO
- Check performance (load times)
- Validate critical error scenarios

## Key Website Elements Tested

### Navigation

- Main navigation menu (Glasses, Contact lenses, Eye tests, Hearing, Home visits, Offers)
- Footer navigation and legal links
- Breadcrumb navigation
- Search functionality

### Product Features

- Product listing and filtering
- Virtual try-on capabilities
- Price display and offers
- Favourites functionality
- Pagination

### Booking System

- 5-step booking process:
  1. Location selection
  2. Appointment type
  3. Date and time
  4. Personal details
  5. Recap and confirmation

### Content Verification

- Service information accuracy
- Pricing information (£20-£25 for eye tests, from £495 for hearing aids)
- Offer details (2-for-1, student discounts, NHS options)
- Contact and location information

## Maintenance Notes

### Regular Updates Needed

- Update expected prices if they change
- Modify selectors if UI changes significantly
- Add new tests for new features
- Update user journey flows for new processes

### Monitoring Points

- Page load performance (currently set to 10 second timeout)
- Mobile responsiveness across devices
- Cross-browser compatibility
- Accessibility compliance

## Troubleshooting

### Common Issues

1. **Cookie banner**: Tests handle automatic cookie acceptance
2. **Slow loading**: Timeouts are configured appropriately
3. **Mobile view**: Tests include responsive design checks
4. **Dynamic content**: Tests wait for elements to be visible

### Test Failure Analysis

- Check if website structure has changed
- Verify if new cookie/privacy banners have been added
- Confirm if pricing or offer information has been updated
- Validate if new features have been deployed

## Contact

For questions about these tests or website functionality, refer to the development team or update the test documentation as needed.

---

**Last Updated**: January 2025  
**Test Coverage**: Specsavers UK Website (https://www.specsavers.co.uk)  
**Framework**: Playwright with TypeScript
