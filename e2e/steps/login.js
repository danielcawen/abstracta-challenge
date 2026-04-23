import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import * as loginPage from '../pages/login.js';

Given(/^I am at the login modal$/, async function () {
  await this.page.goto(process.env.BASE_URL);
  await loginPage.openLoginModal(this.page);
});

When(/^I set a valid username and a valid password$/, async function () {
  await loginPage.fillCredentials(
    this.page,
    process.env.VALID_USERNAME,
    process.env.VALID_PASSWORD
  );
  await loginPage.submitLogin(this.page);
});

When(/^I don't set a username nor a password$/, async function () {
  this.alertMessage = await loginPage.submitLoginExpectingDialog(this.page);
});

When(/^I set an script as the username and password$/, async function () {
  await loginPage.fillCredentials(
    this.page,
    '<script>alert("XSS execution")</script>',
    '<script>alert("XSS execution")</script>'
  );
  this.scriptExecuted = false;
  this.alertMessage = await loginPage.submitLoginExpectingDialog(this.page);
  this.xssMessage = await loginPage.waitForOptionalDialog(this.page);
  if (this.xssMessage !== null) this.scriptExecuted = true;
});

Then(/^I am logged in$/, async function () {
  const logoutVisible = await loginPage.isLogoutVisible(this.page);
  expect(logoutVisible).toBe(true);
});

Then(/^an alert is displayed with the error "([^"]*)"$/, async function (expectedMessage) {
  expect(this.alertMessage).toBe(expectedMessage);
});

Then(/^the script wasn't executed$/, async function () {
  expect(this.scriptExecuted).toBe(false);
  expect(this.xssMessage).toBe(null);
});
