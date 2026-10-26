import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Cover images for posts and cards.", "zh": "为文章和卡片生成封面。"},
  usage: {
    imports: `import { CoverArt } from "@/components/ui/cover-art"`,
    code: `<CoverArt className="aspect-video" />
<CoverArt seed={post.slug} aria-label={post.title} className="aspect-video rounded-xl" />`,
  },
  examples: [
    { id: "sky", title: { en: "Sky", zh: "天空" }, description: { en: "Omit variant and seed for sky; seeds keep the original eight compositions.", zh: "不传 variant 和 seed 时使用天空；种子仍从原有八种构图中选择。" } },
    { id: "seed", title: { en: "From a Seed", zh: "按种子生成" },  },
    { id: "tones", title: { en: "Mirror and Tones", zh: "镜像与色调" },  },
    { id: "image", title: { en: "Image", zh: "图片" }, description: { en: "Use when the post already has its own artwork.", zh: "文章已有配图时使用。" } },
    { id: "shader", title: { en: "Shader", zh: "Shader" }, description: { en: "Use for a moving cover; a seed keeps each post's colours.", zh: "需要动态封面时使用；种子让每篇文章保持自己的配色。" } },
    { id: "rtl", title: { en: "RTL", zh: "从右到左" },  },
  ],
  notes: [
    {
      title: "Shader",
      body: "The shader variant renders [Shader Background](/docs/shader-background) and pauses offscreen and under reduced motion. `palette=\"random\"` with a `seed` gives the same colours on every visit and in `OgCoverArt`; without a seed it picks new colours after mount.",
    },
    {
      title: "Accessibility",
      body: "The art is `role=\"img\"`, named by the locale’s `coverArt` label (“Abstract cover illustration” in English) through a hidden element, so it works without client code. Pass `aria-label` with the post title, or `aria-hidden` when a caption next to it already names the post.",
    },
    {
      title: "Colours",
      body: "Sky uses fixed artwork colours and an embedded cloud image, with no external asset requests. It follows dark mode. Variants `0`–`7` follow the accent. Clip it with a wrapper (`overflow-hidden rounded-xl`) to round its corners.",
    },
    {
      title: "Share images",
      body: "This art is CSS for the page. For an `opengraph-image` route use `OgCoverArt` from [OG Image](/docs/og-image): the eight geometric compositions in inline styles, with matching seeds. `image` and `palette` work there too; the shader becomes a still frame of the same colours. Sky is only available in `CoverArt`.",
    },
    {
      title: "Seeds",
      body: "Seeds keep choosing from the original eight compositions (`0`–`7`). A seed sets the composition, the mirror, the tone offset and a pattern for the tile, dot and digit compositions, so slugs next to each other in a list look different. `variant` on its own draws the composition with no mirror and the first tones; `0` to `3` look as they did before `4` to `7` were added. Digits never mirror; a seed changes the numbers instead.",
    },
  ],
  api: [
    {
      name: "CoverArt",
      extends: "div",
      props: [
        { name: "variant", type: '"sky" | "shader" | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7', description: "Which composition to draw. Wins over `seed`; without either it is `sky`." },
        { name: "image", type: "string", description: "Image URL drawn edge to edge. Wins over `variant`." },
        { name: "palette", type: 'string[] | "random"', description: "Shader colours, or a random set picked by `seed`. Implies `variant=\"shader\"`." },
        { name: "shader", type: "ShaderVariant", default: '"mesh-gradient"', description: "Which shader the `shader` variant draws." },
        { name: "seed", type: "string", description: "Picks composition, mirror, tones and pattern from a stable hash of the string." },
        { name: "mirror", type: `"none" | "x" | "y" | "xy"`, description: "Flips the composition. Defaults to the seed's, or `\"none\"`." },
        { name: "ramp", type: "0 | 1 | 2", description: "Shifts geometric tones along the accent ladder; ignored by sky. Defaults to the seed's, or `0`." },
      ],
      dataAttributes: [
        { name: "data-variant", description: "The composition drawn: `sky`, `image`, `shader` or `0` to `7`." },
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
