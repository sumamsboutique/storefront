const { chromium } = require('@playwright/test')
const fs = require('fs')
const BASE = 'http://localhost:3001'
const EXE = 'C:\\Users\\adity\\AppData\\Local\\ms-playwright\\chromium-1208\\chrome-win64\\chrome.exe'
const log = (...a) => console.log('[verify-live]', ...a)

;(async () => {
  const browser = await chromium.launch({ executablePath: fs.existsSync(EXE) ? EXE : undefined })
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  const errors = []
  const hydrWarn2 = /hydration|Expected server HTML/i
  page.on('pageerror', (e) => { if (!hydrWarn2.test(e.message)) errors.push('pageerror: ' + e.message) })
  page.on('console', (m) => { if (m.type() === 'error' && !hydrWarn2.test(m.text())) errors.push('console: ' + m.text()) })

  await page.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 30000 })

  // Homepage reveal: scroll slowly, pause at intervals, then wait for transitions
  await page.evaluate(async () => {
    const step = 500
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 150))
    }
    window.scrollTo(0, 0)
  })
  await page.waitForTimeout(1200)
  const stats = await page.evaluate(() => ({
    hidden: document.querySelectorAll('[style*="translateY(22px)"]').length,
    visible: document.querySelectorAll('[style*="translateY(0px)"][style*="opacity: 1"]').length,
  }))
  log('REVEAL:', JSON.stringify(stats))

  // FeaturedCollection ADD TO BAG -> cart drawer opens
  const addBtn = page.locator('button[aria-label*=" to bag"]:visible').first()
  const hasAdd = (await addBtn.count()) > 0
  if (hasAdd) {
    await addBtn.evaluate((el) => el.scrollIntoView({ block: 'center', behavior: 'instant' }))
    await page.waitForTimeout(1200) // let reveal transition complete
    await addBtn.click({ timeout: 8000 })
    await page.waitForTimeout(800)
    const open = await page.evaluate(() =>
      document.querySelector('[aria-label="Shopping bag"]')?.classList.contains('translate-x-0') ?? false
    )
    const drawer = await page.locator('aside[role="dialog"][aria-label="Shopping bag"]').count()
    log('after ADD TO BAG, cart drawer present:', drawer, 'open(translate-x-0):', open)
  }
  log('cart nav badge:', (await page.locator('text=/[0-9]/').count()) > 0 ? 'present' : 'n/a')

  await browser.close()
  log('non-hydration errors:', errors.length ? errors : 'none')
  log('RESULT:', stats.visible > 0 && hasAdd ? 'PASS' : 'CHECK')
})().catch((e) => { console.error('FATAL', e.message); process.exit(1) })