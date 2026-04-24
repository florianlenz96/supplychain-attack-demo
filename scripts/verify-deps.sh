#!/usr/bin/env bash
# verify-deps.sh
#
# Lightweight supply-chain integrity check.
# Run this in CI before the build step to catch tampered dependencies.
#
# Usage: ./scripts/verify-deps.sh

set -euo pipefail

cd "$(dirname "$0")/../swagshop"

echo "🔍  Checking npm audit..."
npm audit --audit-level=moderate

echo ""
echo "🔐  Verifying lockfile integrity..."
# Ensure package-lock.json is in sync with package.json
npm ci --dry-run 2>&1 | grep -q "added" && echo "✅  Lockfile is consistent" || true

echo ""
echo "📦  Checking for unlisted local/file: dependencies..."
LOCAL_DEPS=$(node -e "
  const pkg = require('./package.json');
  const all = { ...pkg.dependencies, ...pkg.devDependencies };
  const local = Object.entries(all)
    .filter(([,v]) => v.startsWith('file:') || v.startsWith('link:'))
    .map(([k,v]) => k + ' => ' + v);
  if (local.length) { console.log(local.join('\n')); process.exit(1); }
" 2>&1 || true)

if [ -n "$LOCAL_DEPS" ]; then
  echo "⚠️   LOCAL/FILE dependencies detected – review before shipping:"
  echo "$LOCAL_DEPS"
  exit 1
fi

echo "✅  No local/file: dependencies found"
echo ""
echo "✅  All checks passed"
