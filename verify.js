const { chromium } = require('@playwright/test');
(async () => {
  const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  p.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  p.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));
  await p.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  const check = await p.evaluate(() => {
    const q = s => document.querySelectorAll(s).length;
    return {
      navbar: q('header'),
      hero: q('section') >= 7,
      marquee: q('.marquee-track'),
      sections: q('section'),
      featured: document.body.innerText.includes("Season's"),
      heritage: document.body.innerText.includes('Shantiniketan'),
      jewellery: document.body.innerText.includes('Golden'),
      instagram: document.body.innerText.includes('@sumams.boutique'),
      footer: document.body.innerText.includes('SUMAM'),
      bodyH: document.body.scrollHeight,
    };
  });
  console.log(JSON.stringify({ check, errors }, null, 2));
  await b.close();
})();
