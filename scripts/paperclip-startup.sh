#!/bin/sh
set -e

DATA_DIR="${PAPERCLIP_HOME:-/paperclip}"
PUBLIC_URL="${PAPERCLIP_PUBLIC_URL:-}"

# Auto-bootstrap admin on first run
DONE_FLAG="$DATA_DIR/.ceos-bootstrapped"
if [ ! -f "$DONE_FLAG" ]; then
  echo "[init] Bootstrapping first admin..."
  pnpm paperclipai auth bootstrap-ceo \
    --data-dir "$DATA_DIR" \
    --base-url "$PUBLIC_URL" \
    --expires-hours 48 2>&1 || echo "[init] Bootstrap skipped (may already exist)"
  touch "$DONE_FLAG"
fi

exec node --import "./server/node_modules/tsx/dist/loader.mjs" server/dist/index.js
