/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PAYPAL_ADDRESS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
