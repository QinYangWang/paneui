import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { CoverArt } from "@/components/ui/cover-art"`,
    code: `<CoverArt variant={2} className="aspect-video" />
<CoverArt seed={post.slug} aria-label={post.title} className="aspect-video rounded-xl" />`,
  },
  examples: [
    { id: "seed", title: "From a Seed", description: "Use `seed` for lists of posts or projects, so each one keeps the same cover on every render." },
    { id: "rtl", title: "RTL", description: "For right-to-left pages, set `dir=\"rtl\"` on a parent; the digits stay left to right." },
  ],
  notes: [
    {
      title: "Accessibility",
      body: "The art is `role=\"img\"` with the label “Abstract cover illustration”. Pass `aria-label` with the post title, or `aria-hidden` when a caption next to it already names the post.",
    },
    {
      title: "Colours",
      body: "Every colour is a theme token, so the art follows the accent and dark mode. Clip it with a wrapper (`overflow-hidden rounded-xl`) to round its corners.",
    },
  ],
  api: [
    {
      name: "CoverArt",
      extends: "div",
      props: [
        { name: "variant", type: "0 | 1 | 2 | 3", description: "Which composition to draw. Wins over `seed`; without either it is `0`." },
        { name: "seed", type: "string", description: "Picks a composition from a stable hash of the string." },
      ],
      dataAttributes: [{ name: "data-variant", description: "The composition drawn, `0` to `3`." }],
    },
    {
      name: "coverArtVariant",
      description: "`coverArtVariant(seed)` returns the variant a seed picks, for a matching thumbnail elsewhere.",
      props: [],
    },
  ],
} satisfies ComponentDoc
