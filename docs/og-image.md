# OG Image

> Creates page share images.

Page: https://paneui.dev/docs/og-image/

## Installation

```bash
npx shadcn@latest add @paneui/og-image
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/og-image.json
```

## Usage

```tsx
import { ImageResponse } from "next/og"
import { OgImage, ogImageContentType, ogImageSize } from "@/components/ui/og-image"
```

```tsx
// app/opengraph-image.tsx
export const alt = "Field Notes"
export const size = ogImageSize
export const contentType = ogImageContentType

export default async function Image() {
  return new ImageResponse(
    <OgImage title="Field Notes" description="Essays on interface density." siteName="Field Notes" fontFamily="Inter" />,
    { ...size, fonts }
  )
}
```

## Examples

### Accents and Modes

```tsx
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, OgImage, type OgImageProps } from "@/registry/base-nova/ui/og-image"

function Preview(props: OgImageProps) {
  return (
    <div className="overflow-hidden rounded-xl shadow-raised">
      <svg viewBox={`0 0 ${OG_IMAGE_WIDTH} ${OG_IMAGE_HEIGHT}`} role="img" aria-label={props.title} className="block h-auto w-full">
        <foreignObject width={OG_IMAGE_WIDTH} height={OG_IMAGE_HEIGHT}>
          <OgImage {...props} />
        </foreignObject>
      </svg>
    </div>
  )
}

export default function OgImageModes() {
  return (
    <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-2">
      <Preview title="One accent, eight roles" siteName="Field Notes" date="Sep 2, 2026" accent="green" />
      <Preview title="One accent, eight roles" siteName="Field Notes" date="Sep 2, 2026" accent="green" mode="dark" />
      <Preview title="Small websites" siteName="Field Notes" tags={["web"]} accent="rose" />
      <Preview title="Small websites" siteName="Field Notes" tags={["web"]} accent="neutral" mode="dark" />
    </div>
  )
}
```

### Cover Art

```tsx
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, OgCoverArt } from "@/registry/base-nova/ui/og-image"

const SLUGS = ["designing-for-desktop-density", "one-accent-eight-roles", "small-websites", "a-registry-in-an-afternoon"]

export default function OgImageCoverArt() {
  return (
    <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-2">
      {SLUGS.map((slug) => (
        <div key={slug} className="overflow-hidden rounded-xl shadow-raised">
          <svg viewBox={`0 0 ${OG_IMAGE_WIDTH} ${OG_IMAGE_HEIGHT}`} role="img" aria-label={`Cover for ${slug}`} className="block h-auto w-full">
            <foreignObject width={OG_IMAGE_WIDTH} height={OG_IMAGE_HEIGHT}>
              <OgCoverArt seed={slug} />
            </foreignObject>
          </svg>
        </div>
      ))}
    </div>
  )
}
```

### CJK Titles

```tsx
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, OgImage } from "@/registry/base-nova/ui/og-image"

export default function OgImageCjk() {
  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-xl shadow-raised">
      <svg viewBox={`0 0 ${OG_IMAGE_WIDTH} ${OG_IMAGE_HEIGHT}`} role="img" aria-label="中文分享卡片预览" className="block h-auto w-full">
        <foreignObject width={OG_IMAGE_WIDTH} height={OG_IMAGE_HEIGHT}>
          <OgImage
            title="构建时生成分享卡片：中文标题按字符换行，最多三行"
            description="字体子集、颜色映射与深色模式。"
            siteName="田野笔记"
            author="陈米拉"
            date="2026年10月17日"
            tags={["前端", "工具"]}
            accent="violet"
            mode="dark"
          />
        </foreignObject>
      </svg>
    </div>
  )
}
```

## Route files

`npx shadcn@latest add @paneui/og-image-route` writes `app/opengraph-image.tsx` and `app/twitter-image.tsx`; edit the `SITE` object at the top. Next.js links the image from every page under that folder and renders it at build time. `@paneui/og-image-post-route` writes `app/blog/[slug]/opengraph-image.tsx`, which reads `params` and draws `OgCoverArt` from the slug behind the title. For several images in one route, export `generateImageMetadata` and read `id` in the image function.

## Static export

With `output: "export"`, `opengraph-image` is written without an extension, and some static hosts then serve it as a download, which share previews ignore. Render the image from a route handler at `app/og.png/route.tsx` instead (a `GET` that returns the `ImageResponse`, with `dynamic = "force-static"`), and list `/og.png` in `metadata.openGraph.images`; metadata URLs don't get `basePath`, so prefix it yourself.

## Rendering

The renderer behind `ImageResponse` lays out flexbox and absolute positioning only, with inline styles: no grid, classes, hooks, context or browser APIs. Every text box has a fixed size, and fades end on the same colour at alpha 0, since `transparent` blends through black there. Set `metadataBase` in the root layout so the image URL is absolute.

## Fonts

The renderer reads `.ttf`, `.otf` and `.woff`, not `.woff2`. Load each weight with `readFile` from your repo, or fetch a subset from a font service with `text=` (a non-browser client gets TrueType back), and pass the family name as `fontFamily`; the route template does the fetch and falls back to the built-in font when it fails. A full CJK font is over 10 MB, so load only the characters on the image, plus `·` and `…`.

## Titles

The title is sized by length, counting CJK and full-width characters double: 80px up to 24, 68px up to 44, 56px up to 72 and 46px beyond. The two larger sizes clamp to two lines, the smaller to three; the description clamps to two. `ogImageTitleSize(title)` returns the size.

## Colours

`OG_IMAGE_TOKENS` holds the theme's background, card, foreground, muted foreground, border and primary roles for every accent in both modes. It is generated from the theme, with translucent roles flattened over the background and wide-gamut values converted to sRGB, so a theme update reaches the image when you reinstall it. `colors` overrides single roles.

## Images

`logo` (square, beside the site name) and `avatar` (round, beside the author) take a URL or a data URI of a PNG, JPEG or SVG; WebP is not supported. Both are decorative, so the route's `alt` export carries the title.

## Previews

The previews on this page draw the same components in the browser inside an SVG `foreignObject`, scaled from 1200 × 630.

## API Reference

### OgImage

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` (required) | `string` | — | Clamped to three lines and sized by length. |
| `siteName` (required) | `string` | — | Shown at the top, beside `logo`. |
| `url` | `string` | — | Shown at the top right, such as the host and path. |
| `description` | `string` | — | One or two lines under the title. |
| `author` | `string` | — | Shown in the footer, before `date`. |
| `avatar` | `string` | — | Round image beside the author. |
| `logo` | `string` | — | Square image beside the site name. |
| `date` | `string` | — | Shown as given, so format it in the page's language. |
| `tags` | `string[]` | — | The first three are shown. |
| `accent` | `"blue" \| "neutral" \| "green" \| "orange" \| "rose" \| "violet"` | `"blue"` | The theme accent preset. |
| `mode` | `"light" \| "dark"` | `"light"` | The theme mode. |
| `pattern` | `"grid" \| "dots" \| "none"` | `"grid"` | Backdrop behind the text, fading from the top corner. |
| `colors` | `Partial<OgImageColors>` | — | Overrides for single roles, on top of the accent and mode. |
| `fontFamily` | `string` | — | The family name the fonts were registered under. |
| `style` | `React.CSSProperties` | — | Merged onto the root, for a background image or a renderer quirk. |

| Data attribute | Description |
| --- | --- |
| `data-slot` | `og-image` on the root. |

### OgCoverArt

The eight cover-art compositions, drawn for the same renderer. The same `seed` picks the same art as the in-page cover art.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `seed` | `string` | — | Picks composition, mirror, tones and pattern. |
| `variant` | `0 – 7` | — | The composition. Wins over `seed`. |
| `mirror` | `"none" \| "x" \| "y" \| "xy"` | — | Flips the composition. |
| `ramp` | `0 \| 1 \| 2` | — | Shifts the tones along the accent ladder. |
| `accent` | `OgImageAccent` | `"blue"` | The theme accent preset. |
| `mode` | `"light" \| "dark"` | `"light"` | The theme mode. |
| `width` | `number` | `1200` | Width in px. |
| `height` | `number` | `630` | Height in px. |

### ogImageSize

The 1200 × 630 size, for the route's `size` export and the `ImageResponse` options. `ogImageContentType` is `"image/png"`.

### ogImageColors

`ogImageColors(accent, mode, overrides?)` returns the colours the card draws with.

### OG_IMAGE_TOKENS

The generated map, `OG_IMAGE_TOKENS[accent][mode]`, with `background`, `card`, `foreground`, `mutedForeground`, `border`, `primary`, `primaryForeground`, `primarySubtle` and `primaryBorder` as opaque hex.

### ogImageTitleSize

`ogImageTitleSize(title)` returns the title's font size in px.
