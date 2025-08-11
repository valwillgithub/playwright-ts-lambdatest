import { Page, test as base } from '@playwright/test';

// Permissions
export type Permission = 'VIEW' | 'EDIT_SALARY';

// HR User Type
export type HRUser = {
  name: string;
  role: string;
  permissions: Permission[];
  credentials: {
    username: string;
    password: string;
  };
  login: (page: Page) => Promise<void>;
};

// Users
const HRManager: HRUser = {
  name: 'Alice HR Manager',
  role: 'HR Manager',
  permissions: ['VIEW', 'EDIT_SALARY'],
  credentials: {
    username: 'alice.manager',
    password: 'securepassword',
  },
  login: async (page: Page) => {
    await loginAs(page, 'alice.manager', 'securepassword');
  },
};

const HRAssistant: HRUser = {
  name: 'Bob HR Assistant',
  role: 'HR Assistant',
  permissions: ['VIEW'],
  credentials: {
    username: 'bob.assistant',
    password: 'securepassword',
  },
  login: async (page: Page) => {
    await loginAs(page, 'bob.assistant', 'securepassword');
  },
};

// Shared login helper
async function loginAs(page: Page, username: string, password: string) {
  await page.goto('/login');
  await page.getByLabel('Username').fill(username);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
}

type HRUserFixture = {
  hrUser: HRUser;
};

// Fixture for HR Users
export const test = base.extend<HRUserFixture>({
  hrUser: async ({ page }, use, testInfo) => {
    const userType = testInfo.title.includes('HR Manager')
      ? HRManager
      : HRAssistant;
    await userType.login(page);
    await use(userType);
  },
}); // Fixture for HR Users with specific user

// Export
export const hrUsers: HRUser[] = [HRManager, HRAssistant];
export { expect } from '@playwright/test';
