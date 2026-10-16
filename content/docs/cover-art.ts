import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { CoverArt } from "@/components/ui/cover-art"`,
    code: `<CoverArt variant={2} className="aspect-video" />
<CoverArt seed={post.slug} aria-label={post.title} className="aspect-video rounded-xl" />`,
  },
  examples: [
    { id: "seed", title: "From a Seed", description: "Use `seed` for lists of posts or projects, so each one keeps the same cover on every render." },
    { id: "tones", title: "Mirror and Tones", description: "Use `mirror` and `ramp` to vary a fixed composition across a series." },
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
    {
      title: "Seeds",
      body: "A seed sets the composition, the mirror, the tone offset and a pattern for the tile, dot and digit compositions, so slugs next to each other in a list look different. `variant` on its own draws the composition with no mirror and the first tones; `0` to `3` look as they did before `4` to `7` were added. Digits never mirror; a seed changes the numbers instead.",
    },
  ],
  api: [
    {
      name: "CoverArt",
      extends: "div",
      props: [
        { name: "variant", type: "0 | 1 | 2 | 3 | 4 | 5 | 6 | 7", description: "Which composition to draw. Wins over `seed`; without either it is `0`." },
        { name: "seed", type: "string", description: "Picks composition, mirror, tones and pattern from a stable hash of the string." },
        { name: "mirror", type: `"none" | "x" | "y" | "xy"`, description: "Flips the composition. Defaults to the seed's, or `\"none\"`." },
        { name: "ramp", type: "0 | 1 | 2", description: "Shifts the tones along the accent ladder. Defaults to the seed's, or `0`." },
      ],
      dataAttributes: [
        { name: "data-variant", description: "The composition drawn, `0` to `7`." },
        { name: "data-mirror", description: "The mirror applied." },
        { name: "data-ramp", description: "The tone offset applied." },
      ],
    },
    {
      name: "coverArtVariant",
      description: "`coverArtVariant(seed)` returns the variant a seed picks, for a matching thumbnail elsewhere.",
      props: [],
    },
    {
      name: "coverArtStyle",
      description: "`coverArtStyle(seed)` returns `{ variant, mirror, ramp, pattern }`, everything the seed decides.",
      props: [],
    },
  ],
} satisfies ComponentDoc
