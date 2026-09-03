const { chromium } = require('@playwright/test')
const fs = require('fs')
const BASE = 'http://localhost:3000'
const EXE = 'C:\\Users\\adity\\AppData\\Local\\ms-playwright\\chromium-1208\\chrome-win64\\chrome.exe'

;(async () => {
  const browser = await chromium.launch({ executablePath: fs.existsSync(EXE) ? EXE : undefined })
  const page = await browser.newPage()
  const errs = []
  page.on('pageerror', (e) => errs.push('pageerror: ' + e.message))
  page.on('console', (m) => { if (m.type() === 'error') errs.push('console: ' + m.text()) })
  await page.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 30000 })
  await page.waitForTimeout(1500)
  const info = await page.evaluate(() => ({
    title: document.title,
    bodyText: (document.body.innerText || '').slice(0, 300),
    linkCount: document.querySelectorAll('a').length,
    h1: document.querySelectorAll('h1').length,
    sections: document.querySelectorAll('section').length,
    reveals: document.querySelectorAll('[style*="opacity"][style*="translateY"]').length,
    revealVisible: document.querySelectorAll('[style*="opacity: 1"][style*="translateY(0px)"]').length,
    navLinks: Array.from(document.querySelectorAll('a')).slice(0, 8).map((a) => a.getAttribute('href')),
  }))
  console.log('INFO', JSON.stringify(info, null, 2))
  console.log('ERRORS', errs.length ? errs : 'none')
  await page.screenshot({ path: 'live-probe.png', fullPage: false })
  await browser.close()
})().catch((e) => { console.error('FATAL', e.message); process.exit(1) })