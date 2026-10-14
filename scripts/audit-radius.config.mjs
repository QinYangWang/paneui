/**
 * Config for scripts/audit-radius.mjs.
 *
 * actions: interactions run after the resting audit on a page, each followed by a re-measure.
 *   { page: "<docs name>", selector, type: "hover" | "click" | "contextmenu", nth?, wait?,
 *     thenHover?, thenHoverNth? }
 *   `selector` is a Playwright selector; only visible matches count (`nth` picks among them).
 *   Clicks are closed with Escape afterwards. `thenHover` hovers a row inside what the click
 *   opened (a menu item) and measures again. Keep the list small: one per surface that only
 *   shows a rounded child on interaction.
 *
 * allow: intentional findings to drop from the report. Every field is optional and all given
 *   fields must match: { page, scope (example id | "main-demo" | "site" | "portal" | "gallery"),
 *   slot, ancestorSlot, selector (substring of the reported selector), control (true for buttons,
 *   inputs, tabs, icon chips, badges, kbd), minInset (every flagged corner is inset ≥ this many px),
 *   level ("must" | "should"), reason }.
 *   Always give a reason; see notes/radius-audit.md for the triage behind each entry.
 */
const MAIN = "main [role='tabpanel']"

export default {
  actions: [
    { page: "menu", selector: `${MAIN} [aria-haspopup='menu']`, type: "click", thenHover: "[role='menuitem']" },
    { page: "context-menu", selector: `${MAIN} [data-slot='context-menu-trigger']`, type: "contextmenu", thenHover: "[role='menuitem']" },
    { page: "select", selector: `${MAIN} [data-slot='select-trigger']`, type: "click", thenHover: "[role='option']", thenHoverNth: 1 },
    { page: "select-morph", selector: `${MAIN} [data-slot='morph-select-trigger']`, type: "click", wait: 700, thenHover: "[role='option']", thenHoverNth: 1 },
    { page: "combobox", selector: `${MAIN} [data-slot='combobox-input']`, type: "click", thenHover: "[role='option']", thenHoverNth: 1 },
    { page: "multi-select", selector: `${MAIN} [data-slot='multi-select-input']`, type: "click", thenHover: "[role='option']", thenHoverNth: 1 },
    { page: "popover", selector: `${MAIN} [aria-haspopup='dialog']`, type: "click" },
    { page: "popover-morph", selector: `${MAIN} [data-slot='morph-popover-trigger']`, type: "click", wait: 700 },
    { page: "color-picker", selector: `${MAIN} [data-slot='color-picker-trigger']`, type: "click", wait: 600 },
    { page: "date-range-picker", selector: `${MAIN} [data-slot='date-range-picker-trigger']`, type: "click", wait: 600 },
  ],
  allow: [
    {
      control: true,
      minInset: 9,
      level: "should",
      reason:
        "Self-contained controls (buttons, icon chips, inputs) placed 9–15px in keep their own token radius; " +
        "concentric is enforced for surfaces (rows, panels, media) and for any inset ≤ 8px.",
    },
    {
      slot: "citation-favicon",
      selector: "img",
      reason: "A square favicon (3px corners) shown inside a round badge: the round frame is the shape, the glyph keeps its own.",
    },
    {
      slot: "project-folder",
      reason: "Decorative folder illustration: tab/flap shapes and paper sheets are drawn shapes, not nested surfaces.",
    },
    {
      slot: "segmented-control",
      minInset: 9,
      level: "should",
      reason: "A segmented control is a self-contained control: 9–15px in, it keeps its own token like buttons do.",
    },
    {
      slot: "swatch-picker-item",
      selector: "span.absolute.h-px",
      reason: "The diagonal strike of the \"none\" swatch is a 1px line drawn across a round dot, not a nested surface.",
    },
    {
      page: "email-editor",
      selector: "node-section > div.frame-xl.frame-p-1",
      reason:
        "An email section dropped inside a Show-if block is a third frame level (show-if → content → section); " +
        "editor chrome only, latent (dashed outline on hover), and the exported HTML has no radius there.",
    },
  ],
}
