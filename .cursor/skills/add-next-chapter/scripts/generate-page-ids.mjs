#!/usr/bin/env node
/**
 * Print N UUIDs (one per line) for new manifest page ids.
 * Usage: node .cursor/skills/add-next-chapter/scripts/generate-page-ids.mjs 15
 */
import { randomUUID } from "node:crypto";

const count = Number.parseInt(process.argv[2] ?? "", 10);
if (!Number.isFinite(count) || count < 1 || count > 500) {
	console.error("Usage: generate-page-ids.mjs <count>  (1–500)");
	process.exit(1);
}

for (let i = 0; i < count; i += 1) {
	console.log(randomUUID());
}
