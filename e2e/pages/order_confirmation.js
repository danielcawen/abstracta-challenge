const successTitleLocator = '.sweet-alert h2';
const confirmButtonLocator = '.sweet-alert .confirm';

export async function getPurchaseConfirmationTitle(page) {
  await page.locator(successTitleLocator).waitFor({ state: 'visible' });
  return page.locator(successTitleLocator).innerText();
}

export async function dismissConfirmation(page) {
  await page.locator(confirmButtonLocator).click();
}
