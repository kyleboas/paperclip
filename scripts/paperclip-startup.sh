#!/bin/bash
set -e

PAPERCLIP_HOME="${PAPERCLIP_HOME:-/paperclip}"
BOOTSTRAP_URL_FILE="$PAPERCLIP_HOME/bootstrap-url.txt"
BOOTSTRAP_DONE_FILE="$PAPERCLIP_HOME/.bootstrap-done"

# Start the server in background first
echo "[startup] Starting Paperclip server..."
node --import "./server/node_modules/tsx/dist/loader.mjs" "server/dist/index.js" &
SERVER_PID=$!

# Wait for server to be ready (check for embedded postgres + server startup)
echo "[startup] Waiting for server to initialize..."
sleep 5

# Poll health endpoint until ready
for i in $(seq 1 30); do
  if curl -sf "http://localhost:$PORT/health" > /dev/null 2>&1; then
    echo "[startup] Server is ready"
    break
  fi
  echo "[startup] Waiting for server... ($i/30)"
  sleep 2
done

# Bootstrap admin if not done yet
if [ ! -f "$BOOTSTRAP_DONE_FILE" ]; then
  echo "[startup] Generating bootstrap invite URL..."
  
  PUBLIC_URL="${PAPERCLIP_PUBLIC_URL:-http://localhost:3100}"
  
  # Generate bootstrap URL
  BOOTSTRAP_OUTPUT=$(pnpm paperclipai auth bootstrap-ceo \
    --data-dir "$PAPERCLIP_HOME" \
    --base-url "$PUBLIC_URL" \
    --expires-hours 24 2>&1 || true)
  
  if echo "$BOOTSTRAP_OUTPUT" | grep -q "paperclip"; then
    echo "$BOOTSTRAP_OUTPUT" | tee "$BOOTSTRAP_URL_FILE"
    echo "[startup] Bootstrap URL saved to $BOOTSTRAP_URL_FILE"
    touch "$BOOTSTRAP_DONE_FILE"
  else
    echo "[startup] Bootstrap output:"
    echo "$BOOTSTRAP_OUTPUT"
    echo "[startup] No valid bootstrap URL generated (may already have admin)"
    touch "$BOOTSTRAP_DONE_FILE"
  fi
else
  echo "[startup] Bootstrap already completed, skipping"
fi

# Keep server running
echo "[startup] Server continuing to run (PID: $SERVER_PID)"
wait $SERVER_PID
