#!/usr/bin/env bash
# Smoke test for the chapter page proxy.
# Usage: scripts/smoke-pages.sh [base-url] [valid-page-id]
# Without a valid page id only the negative cases run.
set -euo pipefail

BASE_URL="${1:-http://localhost:3000}"
VALID_ID="${2:-}"
UNKNOWN_ID="5b3f0c1e-6a52-4a52-9a3b-0d6c5a1e7f10"
failures=0

expect_status() {
	local label="$1" expected="$2"
	shift 2
	local actual
	actual="$(curl -s -o /dev/null -w '%{http_code}' "$@")"
	if [[ "$actual" == "$expected" ]]; then
		echo "ok   $label ($actual)"
	else
		echo "FAIL $label: expected $expected, got $actual"
		failures=$((failures + 1))
	fi
}

expect_status "unknown id is 404" 404 "$BASE_URL/api/pages/$UNKNOWN_ID"
expect_status "malformed id is 404" 404 "$BASE_URL/api/pages/not-a-uuid"
expect_status "cross-site request is 403" 403 \
	-H "Sec-Fetch-Site: cross-site" "$BASE_URL/api/pages/$UNKNOWN_ID"

if [[ -n "$VALID_ID" ]]; then
	expect_status "valid id is 200" 200 \
		-H "Sec-Fetch-Site: same-origin" "$BASE_URL/api/pages/$VALID_ID"
	content_type="$(curl -s -o /dev/null -w '%{content_type}' \
		-H "Sec-Fetch-Site: same-origin" "$BASE_URL/api/pages/$VALID_ID")"
	if [[ "$content_type" == image/* ]]; then
		echo "ok   valid id serves an image ($content_type)"
	else
		echo "FAIL valid id content type: $content_type"
		failures=$((failures + 1))
	fi
fi

exit "$failures"
