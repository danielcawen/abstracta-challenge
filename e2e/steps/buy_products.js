import { Given, When, Then } from '@cucumber/cucumber';
import { faker } from '@faker-js/faker';
import { expect } from '@playwright/test';
import { addFirstProductToCart } from '../pages/product.js';
import { goToCart, placeOrder, fillOrderForm } from '../pages/cart.js';
import { getPurchaseConfirmationTitle, dismissConfirmation } from '../pages/order_confirmation.js';

Given(/^I am at the cart page with a product on it$/, async function () {
  await this.page.goto(process.env.BASE_URL);
  await addFirstProductToCart(this.page);
  await goToCart(this.page);
});

When(/^I place an order$/, async function () {
  await placeOrder(this.page);
});

When(/^Purchase it with all the order information set$/, async function () {
  this.orderData = {
    name: faker.person.fullName(),
    country: faker.location.country(),
    city: faker.location.city(),
    card: faker.finance.creditCardNumber({ issuer: 'visa' }),
    month: String(faker.number.int({ min: 1, max: 12 })),
    year: String(faker.number.int({ min: 2025, max: 2030 })),
  };
  await fillOrderForm(this.page, this.orderData);
});

Then(/^The purchase is correctly set$/, async function () {
  const title = await getPurchaseConfirmationTitle(this.page);
  expect(title.toLowerCase()).toContain('thank you');
  await dismissConfirmation(this.page);
});
