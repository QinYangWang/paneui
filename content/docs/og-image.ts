import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import satori from "satori"
import { Resvg } from "@resvg/resvg-js"
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, OgImage } from "@/components/og-image"`,
    code: `const svg = await satori(
  <OgImage title={page.title} description={page.description} siteName="Field Notes" accent="green" fontFamily="og" />,
  {
    width: OG_IMAGE_WIDTH,
    height: OG_IMAGE_HEIGHT,
    fonts: [
      { name: "og", data: regular, weight: 400, style: "normal" },
      { name: "og", data: bold, weight: 700, style: "normal" },
    ],
  }
)
const png = new Resvg(svg).render().asPng()`,
  },
  examples: [
    { id: "modes", title: "Accents and Modes", description: "Pass the site's `accent` and `mode` so the card matches the pages it links to." },
    { id: "cjk", title: "CJK Titles" },
  ],
  notes: [
    {
      title: "Rendering",
      body: "The card is drawn for build-time renderers that turn JSX into SVG: inline styles, flexbox, fixed sizes on every text box and sRGB hex colours only, with no hooks, context, classes or browser APIs, so it imports from a plain script with no bundler. It is always 1200 × 630. The previews on this page draw the same component in the browser; the PNG is what gets shared.",
    },
    {
      title: "Fonts",
      body: "The renderer reads `.ttf`, `.otf` and `.woff` files, not `.woff2`. Register one family at weights 400 and 700 and pass its name as `fontFamily`; without it the renderer's first font is used. A full CJK font is over 10 MB, so load a subset that holds only the characters on the card: a local TTF from your config, or a web font requested with a `text=` parameter (a non-browser user agent gets TTF back). Add `#`, `·` and `…` to the subset, since the tags, the byline and the clamp draw them.",
    },
    {
      title: "Titles",
      body: "The title is clamped to three lines and sized by length, counting CJK and full-width characters double: 76px up to 28, 64px up to 48, 54px up to 80 and 46px beyond. `ogImageTitleSize(title)` returns the size. The description gets two lines under the two larger sizes and one under the smaller.",
    },
    {
      title: "Colours",
      body: "`OG_IMAGE_TOKENS` holds the theme's background, card, foreground, muted foreground, border and primary roles for every accent in both modes. It is generated from the theme, with translucent roles flattened over the background and wide-gamut values converted to sRGB, so a theme update reaches the card when you reinstall it. `colors` overrides single roles.",
    },
    {
      title: "Images",
      body: "`logo` (square, beside the site name) and `avatar` (round, beside the author) take a URL or a data URI of a PNG, JPEG or SVG; WebP is not supported. Both are decorative, so give the page's `og:image:alt` the title instead.",
    },
  ],
  api: [
    {
      name: "OgImage",
      props: [
        { name: "title", type: "string", required: true, description: "Clamped to three lines and sized by length." },
        { name: "siteName", type: "string", required: true, description: "Shown at the top, beside `logo`." },
        { name: "description", type: "string", description: "One or two lines under the title." },
        { name: "author", type: "string", description: "Shown in the footer, before `date`." },
        { name: "avatar", type: "string", description: "Round image beside the author." },
        { name: "logo", type: "string", description: "Square image beside the site name." },
        { name: "date", type: "string", description: "Shown as given, so format it in the page's language." },
        { name: "tags", type: "string[]", description: "The first three are shown, each with a leading `#`." },
        { name: "accent", type: `"blue" | "neutral" | "green" | "orange" | "rose" | "violet"`, default: `"blue"`, description: "The theme accent preset." },
        { name: "mode", type: `"light" | "dark"`, default: `"light"`, description: "The theme mode." },
        { name: "colors", type: "Partial<OgImageColors>", description: "Overrides for single roles, on top of the accent and mode." },
        { name: "fontFamily", type: "string", description: "The family name the fonts were registered under." },
        { name: "style", type: "React.CSSProperties", description: "Merged onto the root, for a background image or a renderer quirk." },
      ],
      dataAttributes: [{ name: "data-slot", description: "`og-image` on the root." }],
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
