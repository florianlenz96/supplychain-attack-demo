/// <reference types="vite/client" />

declare module 'storefront-analytics' {
  export function trackPageView(page: string): object
  export function trackAddToCart(productId: string | number, price: number): object
  export function trackCheckoutStart(items: unknown[]): object
  export function showSocialProof(options?: { interval?: number; hideAfter?: number }): void
}

interface ImportMetaEnv {
  readonly VITE_PAYPAL_ADDRESS: string
  readonly VITE_DEMO_ATTACK: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
