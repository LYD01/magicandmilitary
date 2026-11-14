#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

pnpm exec tsc --noEmit -p tsconfig.json 2>&1 | pnpm exec tsc-baseline check