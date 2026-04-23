import { Before, After, BeforeAll, AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, firefox, webkit } from 'playwright';

setDefaultTimeout(30000);

let browser;

BeforeAll(async function () {
  const browserType = process.env.BROWSER || 'chromium';
  const headless = process.env.HEADED !== 'true';

  const options = {
    headless,
    slowMo: 0,
  };

  if (browserType === 'firefox') {
    browser = await firefox.launch(options);
  } else if (browserType === 'webkit') {
    browser = await webkit.launch(options);
  } else {
    browser = await chromium.launch(options);
  }
});

Before(async function () {
  this.context = await browser.newContext();
  this.page = await this.context.newPage();

  const width = process.env.WIDTH ? parseInt(process.env.WIDTH) : 1200;
  this.isMobile = width < 768;

  if (process.env.WIDTH && process.env.HEIGHT) {
    await this.page.setViewportSize({
      width: parseInt(process.env.WIDTH),
      height: parseInt(process.env.HEIGHT),
    });
  }
});

After(async function (scenario) {
  if (scenario.result.status === 'FAILED') {
    const screenshot = await this.page.screenshot({
      path: `./e2e/screenshots/failure-${scenario.pickle.name.replace(/ /g, '-')}.png`,
      fullPage: true,
    });
    this.attach(screenshot, 'image/png');
  }
  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
});

AfterAll(async function () {
  if (browser) await browser.close();
});
