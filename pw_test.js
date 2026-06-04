const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 400 });
  const page = await browser.newPage();
  await page.goto("http://localhost:5173");
  await page.screenshot({ path: "screenshot_login.png" });

  // login
  await page.fill('input[type="email"], input[name="email"]', "admin@example.com");
  await page.fill('input[type="password"]', "password");
  await page.screenshot({ path: "screenshot_filled.png" });
  await page.click('button[type="submit"]');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: "screenshot_after_login.png" });

  console.log("URL after login:", page.url());
  await browser.close();
})();
