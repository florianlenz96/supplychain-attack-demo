# SwagShop – Supply Chain Attack Demo

A conference demo application built with **Vue 3 + Vite + Tailwind CSS**.  
It walks through three acts live on stage.

---

## Act 1 – The Clean App (`main` / `v1.0.0`)

A polished conference merchandise shop. Products, a hero banner, and a PayPal buy button that reads the recipient address from an environment variable.

```
VITE_PAYPAL_ADDRESS=your-shop@example.com
```

### Run locally

```bash
cd swagshop
cp .env.example .env          # fill in your PayPal address
npm install
npm run dev
```

### Deploy

Push to `main` → GitHub Actions builds and deploys to GitHub Pages automatically.  
Set the `VITE_PAYPAL_ADDRESS` secret in *Settings → Secrets and variables → Actions*.

---

## Act 2 – The Attack (`v1.1.0-compromised`)

A "helpful" npm package (`@conf-demo/image-optimizer`) is added.  
It exports a legitimate-looking `resizeImage()` function, but **as a side-effect it rewrites the PayPal recipient address** in the running app to `attacker@evil.com`.

Because the config object is a Vue `reactive()` proxy exposed on `window.__swagConfig`, the mutation triggers a re-render — the address visibly changes in the UI half a second after page load, and every "Pay with PayPal" click now sends money to the attacker.

The package is added as a `file:` dependency for safe conference demos — in a real attack it would be published to npm under a plausible name.

```jsonc
// swagshop/package.json  (attack branch)
"dependencies": {
  "@conf-demo/image-optimizer": "file:../evil-package"
}
```

---

## Act 3 – Defences

### 1. `npm audit`
```bash
npm audit --audit-level=moderate
```
Catches known CVEs in the dependency tree. Doesn't catch novel malicious packages, but is a mandatory baseline.

### 2. Lockfile integrity (`npm ci`)
Always use `npm ci` (not `npm install`) in CI. It verifies the lockfile hash and refuses to run if `package-lock.json` is out of sync.

### 3. Dependabot
`.github/dependabot.yml` keeps dependencies up to date and surfaces vulnerable versions as PRs automatically.

### 4. Ban `file:` / `link:` dependencies in production
The included `scripts/verify-deps.sh` exits non-zero if any local file dependency is found — add it as a CI step *before* the build:

```yaml
- name: Supply chain check
  run: ./scripts/verify-deps.sh
```

### 5. Socket.dev / Provenance
- [Socket.dev](https://socket.dev) analyses packages for suspicious behaviour (network calls, obfuscated code, install scripts).
- npm **provenance** (`npm publish --provenance`) links a package to its source commit and build log — making it much harder to publish a tampered version.

### 6. Subresource Integrity (SRI)
For CDN-loaded scripts, always add `integrity` hashes so the browser rejects tampered files.

---

## Repository structure

```
supply-chain-attack/
├── swagshop/                  ← Vue 3 app
│   ├── src/
│   │   ├── App.vue
│   │   ├── config.ts          ← paypalAddress lives here
│   │   ├── components/
│   │   │   ├── NavBar.vue
│   │   │   ├── ProductCard.vue
│   │   │   └── PayPalButton.vue
│   │   └── data/products.ts
│   └── ...
├── evil-package/              ← @conf-demo/image-optimizer
│   ├── index.js
│   └── package.json
├── scripts/
│   └── verify-deps.sh
└── .github/
    ├── workflows/deploy.yml
    └── dependabot.yml
```
