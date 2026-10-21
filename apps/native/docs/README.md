# Native docs

The browser shell is `../App.web.tsx`. Device builds use `../App.tsx` and the same example modules.

Add an example at `examples/<slug>/<id>.tsx`, then add it to the component’s `examples` array in `registry.ts`.
Each example supplies an `id`, an English and Chinese title, and its `Example` component.
Categories and the A–Z order come from the same registry.
Keep each module self-contained so the Code view can show the source without hidden helpers.
Add its slug to `routes.json`; the export writes a directory and `index.html` for each route.
`guides.ts` contains English and Chinese guide content.

`pnpm native:build` regenerates `sources.generated.ts` before bundling.
Set `NATIVE_BASE_PATH=/native` for the combined deployment. Asset URLs and document links
use that prefix. Routes work on a static file server without a catch-all rewrite.

After exporting, serve the output on port 3130 and run `pnpm native:smoke`.
For a prefixed export, serve it under `/native` and set
`NATIVE_DOCS_URL=http://localhost:3130/native/`. The smoke check exercises every
route, source views, example actions, system theme and keyboard navigation.
