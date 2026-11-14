# Reader protection: threat model and operations

Chapter pages are private UploadThing files, served only through `app/api/pages/[id]/route.ts` and shown by `ProtectedReader`. This is a deterrent system for casual saving and bulk scraping, not DRM. Browsers cannot detect or black out screenshots or screen recordings.

## What each control stops

| Control                                                                    | Stops                                                 | Bypassed by                                           |
| -------------------------------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- |
| Private ACL on UploadThing                                                 | Guessing or sharing a plain `ufs.sh` URL              | Nothing without the API key                           |
| Random page ids in `/api/pages/<id>`                                       | Enumerating pages, learning file keys                 | Loading the chapter page (ids are in its HTML)        |
| `Sec-Fetch-Site` check                                                     | Hotlinking from other sites, opening the URL directly | Any non-browser client that sets the header           |
| Vercel Firewall rate limit (configure in the dashboard for `/api/pages/*`) | Bulk scraping from one source                         | Distributed scraping                                  |
| `publishedAt`                                                              | Early access to unreleased chapters                   | Nothing (the proxy returns 404 until the time passes) |
| Context menu, drag, selection, print CSS                                   | Casual "save image" and print                         | DevTools, extensions, screenshots                     |
| Blanking while the tab is hidden                                           | Some background capture tools                         | Foreground screenshots and recordings                 |
| Visible watermark                                                          | Makes reposting less appealing, carries the site name | Deleting the overlay in DevTools, cropping            |

DevTools Network always shows the proxied bytes. Accepting that is part of the design.

## Rules to keep

- File keys live only in `lib/chapterManifest.ts` (server-only). Never export them through a barrel: `TitleHero` is a client component that imports `@constants`.
- Never log the signed UploadThing URL or raw upstream error objects (the URL carries its signature). `lib/uploadthing.ts` logs status codes only.
- The proxy sends `Cache-Control: private, max-age=3600`. Do not add `generateStaticParams` to the proxy route; it would prerender image bytes at build time.
- A plain `<img>` is intentional. `next/image` would re-fetch the proxy server-side without browser fetch metadata and cache the result publicly.
- Unknown chapter slugs render the not-found UI (with `noindex`) but with a 200 status, because the shell streams before `notFound()` runs under Cache Components.

## Adding pages

1. Prepare web copies: WebP, about 1600 px wide, roughly 200 to 400 KB each. Do not upload print-resolution scans.
2. Upload in the UploadThing dashboard (app default ACL set to private) and copy each file key.
3. Generate an id per page: `node -e "console.log(crypto.randomUUID())"`.
4. Add the chapter to `RAW_MANIFEST` in `lib/chapterManifest.ts`:

```ts
{
	"chapter-1": {
		aspectRatio: 2 / 3,
		pages: [{ id: "<uuid>", fileKey: "<file key>" }],
	},
}
```

5. Set `pageCount` and `publishedAt` for the chapter in `app/_constants/chapters.ts`. The build fails if `pageCount` does not match the manifest, ids repeat, or a manifest chapter is unknown.
6. Optional per page: `alt` (default is "<chapter label>, page N") and `aspectRatio` (default is the chapter value).
7. Run `scripts/smoke-pages.sh http://localhost:3000 <page id>`.

## Phase 2 (only if pages are actually reposted)

Replace `<img>` with a windowed `<canvas>` (`createImageBitmap`, release off-screen pages, handle device pixel ratio) and bake a watermark into the pixels. Per-session ids only trace to a session, not a person, because there are no accounts and IP logging is forbidden; decide what the id would be matched against first.

## Future

Per-chapter transcripts are the realistic text alternative for text inside images (WCAG).
