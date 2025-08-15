import { Page } from '@playwright/test';
/** 
<form action="/submit" method="post" class="loginForm">
  <input type="text" name="name" placeholder="username">
  <input type="password" name="password" placeholder="password">
  <input type="submit" name="submit" value="submit">
</form>
*/
async function grtFormMethodAttribute(page: Page): Promise<string | null> {
  const loginForm = page.locator('form.loginForm');
  if (!loginForm) return null;
  let postText = await loginForm.getAttribute('post');
  console.log('Post text: Modified ' + postText);
  console.log('Post text in dev-branch: ' + postText);
  return postText;
}
