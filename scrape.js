const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const seeds = [63, 64, 65, 66, 67, 68, 69, 70, 71, 72];
  const baseUrl = 'https://sanand0.github.io/tdsdata/js_table/?seed=';

  let grandTotal = 0;

  for (const seed of seeds) {
    await page.goto(baseUrl + seed, { waitUntil: 'networkidle' });
    await page.waitForSelector('table', { timeout: 10000 });

    const numbers = await page.$$eval('table td, table th', cells =>
      cells.map(c => parseFloat(c.innerText.trim())).filter(n => !isNaN(n))
    );

    const sum = numbers.reduce((a, b) => a + b, 0);
    console.log(`Seed ${seed}: sum = ${sum}`);
    grandTotal += sum;
  }

  console.log(`GRAND TOTAL: ${grandTotal}`);
  await browser.close();
})();
