const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const seeds = [63, 64, 65, 66, 67, 68, 69, 70, 71, 72];
  // Replace with the actual base URL from the assignment page
  const baseUrl = 'https://YOUR_ACTUAL_URL_HERE/seed=';

  let grandTotal = 0;

  for (const seed of seeds) {
    await page.goto(`${baseUrl}${seed}`);
    const numbers = await page.$$eval('table td, table th', cells =>
      cells.map(c => parseFloat(c.innerText)).filter(n => !isNaN(n))
    );
    const sum = numbers.reduce((a, b) => a + b, 0);
    console.log(`Seed ${seed}: ${sum}`);
    grandTotal += sum;
  }

  console.log(`GRAND TOTAL: ${grandTotal}`);
  await browser.close();
})();
