/**
 * Image rendering is off while the story ships as text only (light-novel
 * style). Flip to `true` when a new batch of commissioned art is ready.
 *
 * Gates the reader on `/<chapter-slug>`, the `/api/pages/<id>` proxy and the
 * home page bookmarks. Manifest data and bookmarks in browsers are kept.
 */
export const IMAGES_ENABLED = false;
