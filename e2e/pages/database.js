import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEFAULT_OUTPUT_PATH = join(__dirname, '../../data/products.json');

const cardLocator = '[id="tbodyid"] .card';
const cardBlockLocator = '[class="card-block"]';
const productTitleLocator = '.card-title a';
const productPriceLocator = 'h5';
const nextButtonLocator = '[id*="next"]';

export async function getAllProductsData(page, outputPath = DEFAULT_OUTPUT_PATH) {
  const data = { products: [] };
  await collectAllPages(page, data, 1);
  writeFileSync(outputPath, JSON.stringify(data, null, 2));
  writeFileSync(outputPath.replace(/\.json$/, '.txt'), formatProductsTxt(data));
  return data;
}

function formatProductsTxt(data) {
  const lines = [
    'Product Catalog',
    '===============',
    `Total products: ${data.products.length}`,
    '',
  ];
  data.products.forEach((p, i) => {
    lines.push(`${String(i + 1).padStart(2)}. ${p.name}`);
    lines.push(`    Price: ${p.price}`);
    lines.push(`    Link:  ${p.link}`);
    lines.push('');
  });
  return lines.join('\n');
}

async function collectAllPages(page, data, pageNumber) {
  try {
    await page.locator(cardLocator).first().waitFor({ state: 'visible', timeout: 15000 });
  } catch (e) {
    console.error(`[DB] Page ${pageNumber}: timed out waiting for cards. URL: ${page.url()}`);
    throw e;
  }

  await getPageProductsData(page, data, pageNumber);
  await page.locator(nextButtonLocator).waitFor({ state: 'attached' });
  const style = await page.locator(nextButtonLocator).getAttribute('style');
  const hasNext = !style || !style.includes('display: none;');

  if (hasNext) {
    await Promise.all([
      page.waitForResponse((resp) => resp.url().includes('api.demoblaze.com'), { timeout: 10000 }),
      page.locator(nextButtonLocator).click(),
    ]);
    await collectAllPages(page, data, pageNumber + 1);
  }
}

async function getPageProductsData(page, data, pageNumber) {
  const allPageProducts = await page.locator(cardBlockLocator).all();

  for (let i = 0; i < allPageProducts.length; i++) {
    const aProduct = allPageProducts[i];
    try {
      const productName = await aProduct.locator(productTitleLocator).innerText();
      const productPrice = await aProduct.locator(productPriceLocator).innerText();
      const productLink = await aProduct.locator(productTitleLocator).getAttribute('href');
      data.products.push({
        name: productName,
        price: productPrice.replace('$', ''),
        link: productLink,
      });
    } catch (e) {
      console.error(`[DB] [${i + 1}] Failed to extract product data: ${e.message}`);
      throw e;
    }
  }
}

export async function isElementVisible(page, locator) {
  try {
    await page.waitForSelector(locator, { state: 'visible', timeout: 8000 });
    return true;
  } catch (e) {
    return false;
  }
}

export async function isElementClickable(page, locator) {
  try {
    await page.locator(locator).click({ trial: true, timeout: 5000 });
    return true;
  } catch (e) {
    return false;
  }
}
