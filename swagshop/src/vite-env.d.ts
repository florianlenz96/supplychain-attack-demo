/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PAYPAL_ADDRESS: string
  readonly VITE_DEMO_ATTACK: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
