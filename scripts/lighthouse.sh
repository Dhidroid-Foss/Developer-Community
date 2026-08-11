#!/usr/bin/env bash
#
# scripts/lighthouse.sh — build, serve and audit the static export with
# Lighthouse, asserting every audited category meets a threshold.
#
# Env overrides:
#   PORT                static server port (default 4173)
#   LIGHTHOUSE_URL      URL to audit (default http://localhost:$PORT)
#   LIGHTHOUSE_THRESHOLD score gate (default 90)
#   CHROME_PATH         explicit Chrome/Chromium binary to use
#
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PORT="${PORT:-4173}"
URL="${LIGHTHOUSE_URL:-http://localhost:${PORT}}"
THRESHOLD="${LIGHTHOUSE_THRESHOLD:-90}"
CHROME_PATH="${CHROME_PATH:-}"
# chrome-launcher honours the CHROME_PATH env var; the CLI --chrome-path flag
# is not passed through reliably, so keep env as the single source of truth.

if [[ ! -f "$ROOT/out/index.html" ]]; then
  echo "==> out/ missing, building static export first…"
  # bun run build can segfault at exit AFTER writing a complete out/; treat a
  # present index.html as success so the audit can proceed.
  set +e
  (cd "$ROOT" && bun run build)
  BUILD_EXIT=$?
  set -e
  if [[ $BUILD_EXIT -ne 0 ]] && [[ ! -f "$ROOT/out/index.html" ]]; then
    echo "!! Build failed (exit $BUILD_EXIT) and no output was produced." >&2
    exit $BUILD_EXIT
  fi
fi

echo "==> Starting static server on :$PORT"
PORT="$PORT" bun run "$ROOT/scripts/serve-static.ts" > "$ROOT/lighthouse-server.log" 2>&1 &
SERVER_PID=$!
trap 'kill "$SERVER_PID" 2>/dev/null || true' EXIT

for _ in $(seq 1 40); do
  if curl -sf -o /dev/null "$URL"; then break; fi
  sleep 0.25
done

echo "==> Auditing $URL with Lighthouse (threshold: ${THRESHOLD}%)"
# With multiple output formats and a single --output-path, Lighthouse writes
# <base>.report.json and <base>.report.html next to the base path.
RESULTS="$ROOT/lighthouse-results.report.json"
AUDIT_OK=0
for attempt in 1 2 3; do
  echo "    attempt $attempt"
  if (cd "$ROOT" && bunx lighthouse "$URL" \
      --output=json,html \
      --output-path="$ROOT/lighthouse-results" \
      --only-categories=performance,accessibility,best-practices,seo \
      --quiet \
      --chrome-flags="--headless=new --no-sandbox --disable-gpu --disable-dev-shm-usage"); then
    AUDIT_OK=1
    break
  fi
  rm -f "$RESULTS" "$ROOT/lighthouse-results.report.html"
  sleep 2
done

if [[ $AUDIT_OK -ne 1 ]] || [[ ! -f "$RESULTS" ]]; then
  echo "!! Lighthouse audit failed after 3 attempts." >&2
  exit 1
fi

echo "==> Asserting thresholds"
bun run "$ROOT/scripts/assert-lighthouse.mjs" "$THRESHOLD" "$RESULTS"
