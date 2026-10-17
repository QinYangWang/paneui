import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { Outline, OutlinePopover, type OutlineItem } from "@/components/ui/outline"`,
    code: `const items: OutlineItem[] = [
  { id: "installation", title: "Installation", depth: 2 },
  { id: "usage", title: "Usage", depth: 2 },
  { id: "props", title: "Props", depth: 3 },
]

<aside className="sticky top-20 w-48 max-xl:hidden">
  <Outline items={items} />
</aside>
<OutlinePopover items={items} className="xl:hidden" />`,
  },
  composition: `Outline              nav: title, scrolling list with the track, Back to top
OutlinePopover       nav: a button with the current section, the same list in a popover
useActiveHeading     the id of the section being read`,
  examples: [
    { id: "popover", title: "Popover", description: "Use below the breakpoint where the rail no longer fits, or on full-width pages." },
    { id: "router-links", title: "Router Links", description: "Use `renderLink` when the links must go through your router or scroll a panel instead of the window." },
    { id: "rtl", title: "RTL", description: "For right-to-left languages, wrap the tree in `DirectionProvider` and set `dir=\"rtl\"` on its root." },
  ],
  notes: [
    {
      title: "Headings",
      body: "Items point at headings by `id`, so ids from rehype-slug or your own anchors both work. The list renders on the server; the track and the current section are measured after hydration.",
    },
    {
      title: "Current section",
      body: "A heading is current once its top passes `activeLine` (px from the top of the viewport); at the end of the page the last heading wins. Set `activeLine` below your sticky header.",
    },
    {
      title: "Motion",
      body: "The lit stretch of the track slides between entries over 300ms. Under reduced motion it moves without a transition, and scrolling the list to keep the entry in view jumps instead of gliding.",
    },
  ],
  api: [
    {
      name: "Outline",
      extends: "nav",
      props: [
        { name: "items", type: "readonly OutlineItem[]", required: true, description: "`{ id, title, depth }`, with `depth` 2 for an h2 and 3 for an h3." },
        { name: "title", type: "React.ReactNode", default: "`labels.onThisPage`", description: "Heading above the list; `null` hides it. The default comes from the locale." },
        { name: "activeLine", type: "number", default: "112", description: "Px from the top of the viewport a heading must pass to become current." },
        { name: "backToTop", type: "boolean", default: "true", description: "Shows the locale's `backToTop` link under the list after 320px of scrolling. The row and its divider fade in together; before that the row keeps its space but shows nothing." },
        { name: "maxHeight", type: "string", default: `"calc(100svh - 6.5rem)"`, description: "Cap for the outline; the list scrolls inside it." },
        { name: "renderLink", type: "(props, item) => React.ReactElement", description: "Swap each `<a>` for your own element; spread `props` onto it." },
      ],
    },
    {
      name: "OutlinePopover",
      extends: "nav",
      description: "The trigger fills the nav, so size it with `className`.",
      props: [
        { name: "items", type: "readonly OutlineItem[]", required: true, description: "Same as `Outline`." },
        { name: "title", type: "React.ReactNode", default: "`labels.onThisPage`", description: "Button label before the current section. The default comes from the locale." },
        { name: "activeLine", type: "number", default: "112", description: "Same as `Outline`." },
        { name: "backToTop", type: "boolean", default: "true", description: "Back to top in the popover once the page has scrolled." },
        { name: "renderLink", type: "(props, item) => React.ReactElement", description: "Same as `Outline`." },
      ],
    },
    {
      name: "useActiveHeading",
      description: "`useActiveHeading(ids, { line })` returns the id of the section being read.",
      props: [
        { name: "ids", type: "readonly string[]", required: true, description: "Heading ids in page order." },
        { name: "line", type: "number", default: "112", description: "Px from the top of the viewport." },
      ],
    },
  ],
} satisfies ComponentDoc
