const loginNavLinkLocator = '#login2';
const loginModalLocator = '#logInModal';
const usernameFieldLocator = '#loginusername';
const passwordFieldLocator = '#loginpassword';
const loginButtonLocator = 'button[onclick="logIn()"]';
const logoutButtonLocator = '#logout2';

export async function openLoginModal(page) {
  await page.locator(loginNavLinkLocator).click();
  await page.locator(usernameFieldLocator).waitFor({ state: 'visible' });
}

export async function fillCredentials(page, username, password) {
  await page.locator(usernameFieldLocator).fill(username);
  await page.locator(passwordFieldLocator).fill(password);
}

export async function submitLogin(page) {
  await page.locator(loginButtonLocator).click();
}

export async function submitLoginExpectingDialog(page) {
  let message;
  await Promise.all([
    page.waitForEvent('dialog').then(async (dialog) => {
      message = dialog.message();
      await dialog.accept();
    }),
    page.locator(loginButtonLocator).click(),
  ]);
  return message;
}

export async function waitForOptionalDialog(page, timeout = 1000) {
  try {
    const dialog = await page.waitForEvent('dialog', { timeout });
    const message = dialog.message();
    await dialog.accept();
    return message;
  } catch {
    return null;
  }
}

export async function isLogoutVisible(page) {
  await page.locator(logoutButtonLocator).waitFor({ state: 'visible' });
  return page.locator(logoutButtonLocator).isVisible();
}
