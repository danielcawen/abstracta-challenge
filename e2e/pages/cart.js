const cartNavLinkLocator = '#cartur';
const placeOrderButtonLocator = 'button[data-target="#orderModal"]';
const nameFieldLocator = '#name';
const countryFieldLocator = '#country';
const cityFieldLocator = '#city';
const cardFieldLocator = '#card';
const monthFieldLocator = '#month';
const yearFieldLocator = '#year';
const purchaseButtonLocator = 'button[onclick="purchaseOrder()"]';

export async function goToCart(page) {
  await page.locator(cartNavLinkLocator).click();
  await page.waitForURL(/cart/);
}

export async function placeOrder(page) {
  await page.locator(placeOrderButtonLocator).waitFor({ state: 'visible' });
  await page.locator(placeOrderButtonLocator).click();
  await page.locator(nameFieldLocator).waitFor({ state: 'visible' });
}

export async function fillOrderForm(page, { name, country, city, card, month, year }) {
  await page.locator(nameFieldLocator).fill(name);
  await page.locator(countryFieldLocator).fill(country);
  await page.locator(cityFieldLocator).fill(city);
  await page.locator(cardFieldLocator).fill(card);
  await page.locator(monthFieldLocator).fill(month);
  await page.locator(yearFieldLocator).fill(year);
  await page.locator(purchaseButtonLocator).click();
}
