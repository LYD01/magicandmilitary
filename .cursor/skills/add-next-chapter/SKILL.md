---
name: add-next-chapter
description: >-
  Wires manga chapter pages into the local reader after web copies are uploaded
  to UploadThing (private ACL). Asks for a page range (e.g. 1-15) and ordered file
  keys, then updates the manifest and chapter list for local review. Use when the
  user says add next chapter, wire chapter pages, publish a chapter, or gives a
  page range with UploadThing keys.
disable-model-invocation: true
---

# Add next chapter

Goal: the owner has already uploaded ordered page images to **UploadThing** (private). You collect which pages belong in the chapter, patch `lib/chapterManifest.ts` and `app/_constants/chapters.ts`, and leave the chapter ready to preview locally—**no commit or push** unless asked.

Ground truth: [docs/audits/reader-protection.md](../../docs/audits/reader-protection.md) (Adding pages).

## Before you edit

1. Read `app/_constants/chapters.ts` and `lib/chapterManifest.ts`.
2. Pick the **target chapter**:
   - Prefer the first entry with `pageCount === 0` (e.g. `chapter-2`).
   - If ambiguous, use **AskQuestion** (slug + label).
3. Assume **upload order = read order**. Page `1` in the user’s range is the first spread in the reader.

## What to ask the user

Use **AskQuestion** / chat in this order. Do not guess file keys.

| Input | Required | Notes |
| --- | --- | --- |
| Page range | Yes | e.g. `1-15`, `3-7`, or a single page `8`. Expand to a count: `1-15` → 15 pages. |
| UploadThing file keys | Yes | One key per page in range, **same order** as the range (paste from the dashboard or a numbered list). Count must match range length. |
| Chapter label | If new/renaming | Default: keep existing `label` on the `Chapter` row. |
| Chapter `aspectRatio` | Optional | Default: copy the previous chapter’s manifest `aspectRatio` (often `1600 / 894`). |
| Per-page `aspectRatio` | Optional | Only when a page’s dimensions differ (see chapter 1 page 8 in the manifest). |
| Go live now? | Optional | Default **no**: keep `publishedAt` in the far future (`2099-01-01T00:00:00Z`) so home shows **Coming soon** until they approve. If yes, set `publishedAt` to a real ISO instant (typically `now` or a scheduled time). |

Do **not** ask them to upload again—you only need keys and range.

## Generate page ids

Run once per page (or use the helper script):

```bash
node .cursor/skills/add-next-chapter/scripts/generate-page-ids.mjs <count>
```

Copy each printed UUID into a new manifest page entry. Ids must be unique across the whole manifest.

## Files to change

### `lib/chapterManifest.ts`

Add or replace the chapter key under `RAW_MANIFEST`:

```ts
"chapter-2": {
	aspectRatio: 1600 / 894,
	pages: [
		{ id: "<uuid>", fileKey: "<uploadthing-key>" },
		// one entry per page in the user’s range, in order
	],
},
```

Rules from the loader:

- Every manifest slug must exist in `CHAPTERS`.
- `pageCount` in `chapters.ts` must equal `pages.length`.
- No duplicate `id` values anywhere in the manifest.

### `app/_constants/chapters.ts`

For the target slug:

- Set `pageCount` to the number of pages added.
- Set `label` if the user supplied one.
- Set `publishedAt`:
  - **Review only:** keep far-future date (or add one if missing) so `/chapter-N` stays out of `getPublishedChapters()` until they publish.
  - **Go live:** set `publishedAt` to an ISO string ≤ now so the home link works and sitemap includes the route.

Never put file keys in `@constants`—only in `chapterManifest.ts`.

## Verify

1. `pnpm typecheck:baseline` or at least ensure the manifest load in `chapterManifest.ts` cannot throw (`pageCount` mismatch is the usual failure).
2. Remind them to run `pnpm dev` and open `http://localhost:3000/<slug>`.
3. Optional smoke test (needs `UPLOADTHING_TOKEN` and dev server):  
   `scripts/smoke-pages.sh http://localhost:3000 <first-page-uuid>`

## After local review

When the user approves:

- Set `publishedAt` to go live (if still on the placeholder date).
- Offer commit; split commits per repo rules (`feat(chapters): …` for manifest + constants).

## Do not

- Export manifest or file keys through `@constants` or client components.
- Log file keys or signed UploadThing URLs.
- Commit, push, or change production env without being asked.

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| Build throws `pageCount` mismatch | Align `chapters.ts` `pageCount` with manifest `pages.length`. |
| Home still “Coming soon” | `publishedAt` is still future or `pageCount` is 0; `ChapterList` uses `isChapterReadable`. |
| `/chapter-N` 404 | `publishedAt` must be ≤ now for the chapter route; bump date or use dev-only preview (user can temporarily set `publishedAt` to past). |
| Wrong page order | Reorder manifest `pages` to match upload order; ids can stay. |