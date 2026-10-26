import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Cover images for posts and cards.", "zh": "为文章和卡片生成封面。"},
  usage: {
    imports: `import { CoverArt } from "@/components/ui/cover-art"`,
    code: `<CoverArt seed={post.slug} aria-label={post.title} className="aspect-video rounded-xl" />
<CoverArt image={post.image} className="aspect-video" />`,
  },
  examples: [
    { id: "seed", title: { en: "From a Seed", zh: "按种子生成" } },
    { id: "shader", title: { en: "Palette", zh: "配色" }, description: { en: "Use when the cover should match your brand colours.", zh: "封面需要贴合品牌配色时使用。" } },
    { id: "image", title: { en: "Image", zh: "图片" }, description: { en: "Use when the post already has its own artwork.", zh: "文章已有配图时使用。" } },
    { id: "rtl", title: { en: "RTL", zh: "从右到左" } },
  ],
  notes: [
    {
      title: "Shader",
      body: "Without `image` the cover renders [Shader Background](/docs/shader-background), which pauses offscreen and under reduced motion. A `seed` picks a random palette from a stable hash, so the same slug gets the same colours on every visit and in `OgCoverArt`. `palette=\"random\"` without a seed picks new colours after mount; with neither, the shader uses the theme colours.",
    },
    {
      title: "Accessibility",
      body: "The art is `role=\"img\"`, named by the locale’s `coverArt` label (“Abstract cover illustration” in English) through a hidden element. Pass `aria-label` with the post title, or `aria-hidden` when a caption next to it already names the post.",
    },
    {
      title: "Share images",
      body: "This art is WebGL for the page. For an `opengraph-image` route use `OgCoverArt` from [OG Image](/docs/og-image): the same `image`, `palette` and `seed`, with the shader drawn as a still frame of the same colours. Clip the cover with a wrapper (`overflow-hidden rounded-xl`) to round its corners.",
    },
  ],
  api: [
    {
      name: "CoverArt",
      extends: "div",
      props: [
        { name: "image", type: "string", description: "Image URL drawn edge to edge. Wins over the shader." },
        { name: "palette", type: 'string[] | "random"', description: "Shader colours, or a random set. Defaults to random with `seed`, else the theme." },
        { name: "shader", type: "ShaderVariant", default: '"mesh-gradient"', description: "Which shader to draw." },
        { name: "seed", type: "string", description: "Keeps the random palette stable, from a hash of the string." },
      ],
      dataAttributes: [{ name: "data-variant", description: "`image` or `shader`." }],
    },
  ],
} satisfies ComponentDoc
