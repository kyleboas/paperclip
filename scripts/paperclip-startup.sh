#!/bin/sh
set -e

DATA_DIR="${PAPERCLIP_HOME:-/paperclip}"

# Fix volume ownership — Railway mounts volumes as root:root
# This runs as root BEFORE the node user takes over
if [ "$(id -u)" = "0" ]; then
  chown -R node:node "$DATA_DIR" 2>/dev/null || true
  echo "[init] Fixed ownership on $DATA_DIR"
  exec su-exec node:node "$0" "$@"
fi

# Below here runs as 'node' user
PUBLIC_URL="${PAPERCLIP_PUBLIC_URL:-}"

# Ensure data directories exist
mkdir -p "$DATA_DIR/instances/default"
mkdir -p "$DATA_DIR/.hermes"

# Set up Hermes config if not already present
HERMES_DIR="$DATA_DIR/.hermes"
if [ ! -f "$HERMES_DIR/config.yaml" ]; then
  echo "[init] Setting up Hermes Agent config..."
  printf "model: glm-5.1\nprovider: zai\napprovals:\n  mode: off\n" > "$HERMES_DIR/config.yaml"
fi

# Run Paperclip onboard if no config exists
if [ ! -f "$DATA_DIR/instances/default/config.json" ]; then
  echo "[init] Running Paperclip onboard..."
  pnpm paperclipai onboard -y -d "$DATA_DIR" 2>&1 || echo "[init] Onboard skipped"
fi

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
