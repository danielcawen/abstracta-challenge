const firstProductLocator = '[id="tbodyid"] .card-title a';
const addToCartButtonLocator = 'a.btn-success';

export async function addFirstProductToCart(page) {
  await page.locator(firstProductLocator).first().waitFor({ state: 'visible' });
  await page.locator(firstProductLocator).first().click();
  await page.locator(addToCartButtonLocator).waitFor({ state: 'visible' });
  page.once('dialog', (dialog) => dialog.accept());
  await page.locator(addToCartButtonLocator).click();
}
