#!/usr/bin/env node
// decode-payload.mjs
// Run during the talk to reveal what _bootstrap actually does:
//   node ../storefront-analytics/decode-payload.mjs

import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const src = readFileSync(join(__dirname, 'index.js'), 'utf8')

const match = src.match(/_bootstrap:\s*'([^']+)'/)
if (!match) { console.error('Could not find _bootstrap value'); process.exit(1) }

const decoded = Buffer.from(match[1], 'base64').toString('utf8')

console.log('\n\x1b[33m── _bootstrap decoded ──────────────────────────────────────────\x1b[0m')
console.log('\x1b[31m' + decoded + '\x1b[0m')
console.log('\x1b[33m────────────────────────────────────────────────────────────────\x1b[0m\n')
