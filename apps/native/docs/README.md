# Native docs

The browser shell is `../App.web.tsx`. Device builds use `../App.tsx` and the same example modules.

Add an example at `examples/<slug>/<id>.tsx`, then add it to the component’s `examples` array in `registry.ts`.
Each example supplies an `id`, an English and Chinese title, and its `Example` component.
Categories and the A–Z order come from the same registry.
Keep each module’s interaction self-contained so the Code view shows its behaviour.
Add its slug to `routes.json`; the export writes a directory and `index.html` for each route.
`guides.ts` contains English and Chinese guide content.

`pnpm native:build` regenerates `sources.generated.ts` before bundling.
Set `NATIVE_BASE_PATH=/native` for the combined deployment. Asset URLs and document links
use that prefix. Routes work on a static file server without a catch-all rewrite.

After exporting, serve the output on port 3130 and run `pnpm native:smoke`.
For a prefixed export, serve it under `/native` and set
`NATIVE_DOCS_URL=http://localhost:3130/native/`. The smoke check exercises every
route, source views, example actions, system theme and keyboard navigation.

Component pages have three to six examples. `language.tsx` supplies `useExampleText()`
for the preview language; it defaults to English in the device catalogue. Keep
example behaviour in the example module, and translate all visible labels and hints.
Use component labels for overlay dismissal as well.

`reference.ts` holds bilingual usage snippets and accessibility guidance. Compound
parts share their parent page. The theme provider has its own page; the notification
provider and hook are covered on the Toast page.

`tooling/scripts/native-api.mjs` reads prop declarations and destructuring defaults
from library source into `api.generated.ts` during the build. It resolves local
prop intersections and omissions, includes option records, and lists inherited
primitive types. Card parts list common forwarded view props. Update the bilingual
prop descriptions in that script when adding a prop; do not edit generated tables.

For the full component-page browser check, run
`node tooling/scripts/native-component-pages-smoke.mjs` against the static export.
`NATIVE_DOCS_URL` selects the deployment path. Set `SCREENSHOT_DIR` to capture key
pages at both viewport widths, themes and languages and check overflow on all pages.

Run `node tooling/scripts/native-gaps-smoke.mjs` for the added component interactions,
minimum touch targets and RTL layout. Set `SCREENSHOT_DIR` to save all eight pages
at both viewport widths, in each language and theme.
