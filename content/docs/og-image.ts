import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { ImageResponse } from "next/og"
import { OgImage, ogImageContentType, ogImageSize } from "@/components/ui/og-image"`,
    code: `// app/opengraph-image.tsx
export const alt = "Field Notes"
export const size = ogImageSize
export const contentType = ogImageContentType

export default async function Image() {
  return new ImageResponse(
    <OgImage title="Field Notes" description="Essays on interface density." siteName="Field Notes" fontFamily="Inter" />,
    { ...size, fonts }
  )
}`,
  },
  examples: [
    { id: "modes", title: "Accents and Modes", description: "Pass the site's `accent` and `mode` so the image matches the pages it links to." },
    { id: "cover-art", title: "Cover Art", description: "Use `OgCoverArt` for a post with no title image; the slug picks the art." },
    { id: "cjk", title: "CJK Titles" },
  ],
  notes: [
    {
      title: "Route files",
      body: "`npx shadcn@latest add @taimatsu/og-image-route` writes `app/opengraph-image.tsx` and `app/twitter-image.tsx`; edit the `SITE` object at the top. Next.js links the image from every page under that folder and renders it at build time. `@taimatsu/og-image-post-route` writes `app/blog/[slug]/opengraph-image.tsx`, which reads `params` and draws `OgCoverArt` from the slug behind the title. For several images in one route, export `generateImageMetadata` and read `id` in the image function.",
    },
    {
      title: "Static export",
      body: "With `output: \"export\"`, `opengraph-image` is written without an extension, and some static hosts then serve it as a download, which share previews ignore. Render the image from a route handler at `app/og.png/route.tsx` instead (a `GET` that returns the `ImageResponse`, with `dynamic = \"force-static\"`), and list `/og.png` in `metadata.openGraph.images`; metadata URLs don't get `basePath`, so prefix it yourself.",
    },
    {
      title: "Rendering",
      body: "The renderer behind `ImageResponse` lays out flexbox and absolute positioning only, with inline styles: no grid, classes, hooks, context or browser APIs. Every text box has a fixed size, and fades end on the same colour at alpha 0, since `transparent` blends through black there. Set `metadataBase` in the root layout so the image URL is absolute.",
    },
    {
      title: "Fonts",
      body: "The renderer reads `.ttf`, `.otf` and `.woff`, not `.woff2`. Load each weight with `readFile` from your repo, or fetch a subset from a font service with `text=` (a non-browser client gets TrueType back), and pass the family name as `fontFamily`; the route template does the fetch and falls back to the built-in font when it fails. A full CJK font is over 10 MB, so load only the characters on the image, plus `·` and `…`.",
    },
    {
      title: "Titles",
      body: "The title is sized by length, counting CJK and full-width characters double: 80px up to 24, 68px up to 44, 56px up to 72 and 46px beyond. The two larger sizes clamp to two lines, the smaller to three; the description clamps to two. `ogImageTitleSize(title)` returns the size.",
    },
    {
      title: "Colours",
      body: "`OG_IMAGE_TOKENS` holds the theme's background, card, foreground, muted foreground, border and primary roles for every accent in both modes. It is generated from the theme, with translucent roles flattened over the background and wide-gamut values converted to sRGB, so a theme update reaches the image when you reinstall it. `colors` overrides single roles.",
    },
    {
      title: "Images",
      body: "`logo` (square, beside the site name) and `avatar` (round, beside the author) take a URL or a data URI of a PNG, JPEG or SVG; WebP is not supported. Both are decorative, so the route's `alt` export carries the title.",
    },
    {
      title: "Previews",
      body: "The previews on this page draw the same components in the browser inside an SVG `foreignObject`, scaled from 1200 × 630.",
    },
  ],
  api: [
    {
      name: "OgImage",
      props: [
        { name: "title", type: "string", required: true, description: "Clamped to three lines and sized by length." },
        { name: "siteName", type: "string", required: true, description: "Shown at the top, beside `logo`." },
        { name: "url", type: "string", description: "Shown at the top right, such as the host and path." },
        { name: "description", type: "string", description: "One or two lines under the title." },
        { name: "author", type: "string", description: "Shown in the footer, before `date`." },
        { name: "avatar", type: "string", description: "Round image beside the author." },
        { name: "logo", type: "string", description: "Square image beside the site name." },
        { name: "date", type: "string", description: "Shown as given, so format it in the page's language." },
        { name: "tags", type: "string[]", description: "The first three are shown." },
        { name: "accent", type: `"blue" | "neutral" | "green" | "orange" | "rose" | "violet"`, default: `"blue"`, description: "The theme accent preset." },
        { name: "mode", type: `"light" | "dark"`, default: `"light"`, description: "The theme mode." },
        { name: "pattern", type: `"grid" | "dots" | "none"`, default: `"grid"`, description: "Backdrop behind the text, fading from the top corner." },
        { name: "colors", type: "Partial<OgImageColors>", description: "Overrides for single roles, on top of the accent and mode." },
        { name: "fontFamily", type: "string", description: "The family name the fonts were registered under." },
        { name: "style", type: "React.CSSProperties", description: "Merged onto the root, for a background image or a renderer quirk." },
      ],
      dataAttributes: [{ name: "data-slot", description: "`og-image` on the root." }],
    },
    {
      name: "OgCoverArt",
      description: "The eight cover-art compositions, drawn for the same renderer. The same `seed` picks the same art as the in-page cover art.",
      props: [
        { name: "seed", type: "string", description: "Picks composition, mirror, tones and pattern." },
        { name: "variant", type: "0 – 7", description: "The composition. Wins over `seed`." },
        { name: "mirror", type: `"none" | "x" | "y" | "xy"`, description: "Flips the composition." },
        { name: "ramp", type: "0 | 1 | 2", description: "Shifts the tones along the accent ladder." },
        { name: "accent", type: "OgImageAccent", default: `"blue"`, description: "The theme accent preset." },
        { name: "mode", type: `"light" | "dark"`, default: `"light"`, description: "The theme mode." },
        { name: "width", type: "number", default: "1200", description: "Width in px." },
        { name: "height", type: "number", default: "630", description: "Height in px." },
      ],
    },
    {
      name: "ogImageSize",
      description: "The 1200 × 630 size, for the route's `size` export and the `ImageResponse` options. `ogImageContentType` is `\"image/png\"`.",
      props: [],
    },
    {
      name: "ogImageColors",
      description: "`ogImageColors(accent, mode, overrides?)` returns the colours the card draws with.",
      props: [],
    },
    {
      name: "OG_IMAGE_TOKENS",
      description: "The generated map, `OG_IMAGE_TOKENS[accent][mode]`, with `background`, `card`, `foreground`, `mutedForeground`, `border`, `primary`, `primaryForeground`, `primarySubtle` and `primaryBorder` as opaque hex.",
      props: [],
    },
    {
      name: "ogImageTitleSize",
      description: "`ogImageTitleSize(title)` returns the title's font size in px.",
      props: [],
    },
  ],
} satisfies ComponentDoc
