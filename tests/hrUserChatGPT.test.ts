import { hrUsers, test, expect } from '../fixture/hrUsersFixtureChatGPT';

hrUsers.forEach((user) => {
  test.describe(`${user.role}`, () => {
    test(`${
      user.permissions.includes('EDIT_SALARY') ? 'can' : 'cannot'
    } increase employee salary`, async ({ page, hrUser }) => {
      await page.goto('/employees/123');

      const increaseButton = page.getByRole('button', {
        name: /Increase Salary/i,
      });

      if (hrUser.permissions.includes('EDIT_SALARY')) {
        await expect(increaseButton).toBeVisible();
        await increaseButton.click();

        await page.getByLabel('New Salary').fill('95000');
        await page.getByRole('button', { name: /Submit/i }).click();
        await expect(page.getByRole('alert')).toHaveText(
          /Salary updated successfully/i
        );
      } else {
        await expect(increaseButton).toBeHidden();
      }
    });
  });
});
