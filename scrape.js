name: Playwright Table Scraper
on: [push, workflow_dispatch]

jobs:
  scrape:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: 24f2002015@ds.study.iitm.ac.in - Install Playwright
        run: npm install playwright
      - name: Install browsers
        run: npx playwright install chromium
      - name: Run scraper
        run: node scrape.js  # runs from repo root
