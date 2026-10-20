# Cover Art

> Generated cover images for posts and cards, drawn in theme colours.

Page: https://paneui.dev/docs/cover-art/

## Installation

```bash
npx shadcn@latest add @paneui/cover-art
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/cover-art.json
```

Registry items it builds on: `@paneui/theme`, `@paneui/locale-provider`.

## Usage

```tsx
import { CoverArt } from "@/components/ui/cover-art"
```

```tsx
<CoverArt variant={2} className="aspect-video" />
<CoverArt seed={post.slug} aria-label={post.title} className="aspect-video rounded-xl" />
```

## Examples

### From a Seed

```tsx
import { CoverArt } from "@/registry/base-nova/ui/cover-art"

const posts = [
  { slug: "plain-text", title: "Plain text" },
  { slug: "small-websites", title: "Small websites" },
  { slug: "summer-reading", title: "Summer reading" },
  { slug: "concentric-corners", title: "Concentric corners" },
  { slug: "desktop-density", title: "Designing for desktop density" },
  { slug: "one-accent", title: "One accent, eight roles" },
]

export default function CoverArtSeed() {
  return (
    <div className="grid w-full max-w-2xl grid-cols-2 gap-4 sm:grid-cols-3">
      {posts.map((p) => (
        <article key={p.slug} className="flex flex-col gap-2">
          <div className="overflow-hidden rounded-xl shadow-raised">
            <CoverArt seed={p.slug} aria-label={`Cover for ${p.title}`} className="aspect-video" />
          </div>
          <p className="text-ui font-medium">{p.title}</p>
        </article>
      ))}
    </div>
  )
}
```

### Mirror and Tones

```tsx
import { CoverArt } from "@/registry/base-nova/ui/cover-art"

const looks = [
  { mirror: "none", ramp: 0 },
  { mirror: "x", ramp: 1 },
  { mirror: "xy", ramp: 2 },
] as const

export default function CoverArtTones() {
  return (
    <div className="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
      {looks.map((l) => (
        <div key={l.mirror} className="overflow-hidden rounded-xl shadow-raised">
          <CoverArt variant={6} mirror={l.mirror} ramp={l.ramp} className="aspect-video" />
        </div>
      ))}
    </div>
  )
}
```

### RTL

```tsx
import { CoverArt } from "@/registry/base-nova/ui/cover-art"

export default function CoverArtRtl() {
  return (
    <div dir="rtl" className="grid w-full max-w-md grid-cols-2 gap-3">
      <div className="overflow-hidden rounded-xl shadow-raised">
        <CoverArt variant={1} aria-label="غلاف مقال" className="aspect-video" />
      </div>
      <div className="overflow-hidden rounded-xl shadow-raised">
        <CoverArt variant={3} aria-label="غلاف مقال" className="aspect-video" />
      </div>
    </div>
  )
}
```

## Accessibility

The art is `role="img"`, named by the locale’s `coverArt` label (“Abstract cover illustration” in English) through a hidden element, so it works without client code. Pass `aria-label` with the post title, or `aria-hidden` when a caption next to it already names the post.

## Colours

Every colour is a theme token, so the art follows the accent and dark mode. Clip it with a wrapper (`overflow-hidden rounded-xl`) to round its corners.

## Share images

This art is CSS for the page. For an `opengraph-image` route use `OgCoverArt` from [OG Image](https://paneui.dev/docs/og-image): the same compositions in inline styles, and the same seed picks the same art.

## Seeds

A seed sets the composition, the mirror, the tone offset and a pattern for the tile, dot and digit compositions, so slugs next to each other in a list look different. `variant` on its own draws the composition with no mirror and the first tones; `0` to `3` look as they did before `4` to `7` were added. Digits never mirror; a seed changes the numbers instead.

## API Reference

### CoverArt

Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7` | — | Which composition to draw. Wins over `seed`; without either it is `0`. |
| `seed` | `string` | — | Picks composition, mirror, tones and pattern from a stable hash of the string. |
| `mirror` | `"none" \| "x" \| "y" \| "xy"` | — | Flips the composition. Defaults to the seed's, or `"none"`. |
| `ramp` | `0 \| 1 \| 2` | — | Shifts the tones along the accent ladder. Defaults to the seed's, or `0`. |

| Data attribute | Description |
| --- | --- |
| `data-variant` | The composition drawn, `0` to `7`. |
| `data-mirror` | The mirror applied. |
| `data-ramp` | The tone offset applied. |

### coverArtVariant

`coverArtVariant(seed)` returns the variant a seed picks, for a matching thumbnail elsewhere.

### coverArtStyle

`coverArtStyle(seed)` returns `{ variant, mirror, ramp, pattern }`, everything the seed decides.
