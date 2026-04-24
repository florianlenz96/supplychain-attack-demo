import { reactive } from 'vue'

/**
 * Central config – reactive so the UI updates when values change.
 * The PayPal address is the key value that Phase 2 of the demo will mutate.
 */
export const config = reactive({
  paypalAddress: import.meta.env.VITE_PAYPAL_ADDRESS || 'shop@swagshop.dev',
  shopName: 'SwagShop',
  currency: 'EUR',
})

// Expose the reactive proxy on window so external code (and the evil package)
// can reach it. Mutating window.__swagConfig.paypalAddress will trigger a
// Vue re-render on every component that reads config.paypalAddress.
;(window as unknown as Record<string, unknown>)['__swagConfig'] = config
