const { chromium } = require('@playwright/test');
(async () => {
  const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await p.screenshot({ path: 'C:/Users/adity/AppData/Local/Temp/opencode/home-desktop.png', fullPage: true });
  await p.setViewportSize({ width: 390, height: 844 });
  await p.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await p.screenshot({ path: 'C:/Users/adity/AppData/Local/Temp/opencode/home-mobile.png', fullPage: true });
  await b.close();
})();
