import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import * as dataBasePage from '../pages/database.js';
import { expect } from '@playwright/test';

setDefaultTimeout(60000);

Given(/^I am at the home page$/, async function () {
  await this.page.goto(process.env.BASE_URL);
});

When(/^I go through all visible products$/, async function () {
  this.productsData = await dataBasePage.getAllProductsData(this.page);
});

Then(/^They all match the information with the DataBase$/, async function () {
  // TODO: once the db is connected this can be enabled
  // for (const product of this.productsData.products) {
  //   const aProductFromDB = await dataBasePage.verifyProducts(product);
  //   expect(aProductFromDB).toHaveLength(1);
  // }
});
