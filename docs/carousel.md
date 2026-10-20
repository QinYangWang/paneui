# Carousel

> Scrolls through slides one at a time.

Page: https://paneui.dev/docs/carousel/

## Installation

```bash
npx shadcn@latest add @paneui/carousel
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/carousel.json
```

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/button`, `@paneui/locale-provider`.

## Usage

```tsx
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
```

```tsx
<Carousel aria-label="Photos">
  <CarouselContent>
    <CarouselItem>…</CarouselItem>
    <CarouselItem>…</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

## Composition

```text
Carousel
├── CarouselContent
│   └── CarouselItem × n
├── CarouselPrevious / CarouselNext
└── CarouselDots
```

## Examples

### Several per View

```tsx
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/registry/base-nova/ui/carousel"

export default function CarouselSeveralPerView() {
  return (
    <Carousel aria-label="Templates" className="w-full max-w-md">
      <div className="flex items-center gap-2">
      <CarouselPrevious />
      <CarouselContent>
        {Array.from({ length: 8 }, (_, i) => (
          <CarouselItem key={i} aria-label={`${i + 1} of 8`} className="basis-1/3">
            <div className="flex aspect-square items-center justify-center rounded-xl bg-card text-lg font-semibold tabular-nums shadow-raised">{i + 1}</div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext />
      </div>
    </Carousel>
  )
}
```

### RTL

```tsx
import { DirectionProvider } from "@base-ui/react/direction-provider"
import { Carousel, CarouselContent, CarouselDots, CarouselItem, CarouselNext, CarouselPrevious } from "@/registry/base-nova/ui/carousel"

const slides = [
  { title: "خطّط", tone: "bg-chart-1/20" },
  { title: "ابنِ", tone: "bg-chart-4/20" },
  { title: "أطلق", tone: "bg-chart-5/20" },
  { title: "قِس", tone: "bg-chart-3/20" },
]

export default function CarouselRtl() {
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl" className="w-full max-w-xs">
        <Carousel aria-label="مراحل الإصدار">
          <div className="flex flex-col gap-3">
            <CarouselContent>
              {slides.map((s, i) => (
                <CarouselItem key={s.title} aria-label={`${i + 1} من ${slides.length}`}>
                  <div className={`flex aspect-video items-center justify-center rounded-xl text-xl font-semibold ${s.tone}`}>{s.title}</div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex items-center justify-between">
              <CarouselPrevious aria-label="الشريحة السابقة" />
              <CarouselDots />
              <CarouselNext aria-label="الشريحة التالية" />
            </div>
          </div>
        </Carousel>
      </div>
    </DirectionProvider>
  )
}
```

## Behaviour

Slides scroll with native snapping, so touch, trackpad and wheel feel like the platform. ←/→ (↑/↓ when vertical) step one slide; with reduced motion the step jumps instead of scrolling smoothly.

## Accessibility

The root is a `region` with `aria-roledescription="carousel"` and each item a `slide` group. Label both, for example "2 of 5" on items.

## API Reference

### Carousel

Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Scroll axis. A vertical carousel needs a height. |
| `loop` | `boolean` | `false` | Buttons and keys wrap at the ends. |
| `onIndexChange` | `(index: number) => void` | — | Called when the current slide changes. |

### CarouselItem

`basis-full` by default. Also accepts every prop of `div`.

### CarouselContent

The scroll container; `className` goes on the track (gap, padding). Also accepts every prop of `div`.

### CarouselPrevious / CarouselNext

Also accepts every prop of [Button](/docs/button#api-reference).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `Button variant` | `"secondary"` |  |
| `size` | `Button size` | `"icon-sm"` |  |

### CarouselDots

Also accepts every prop of `div`.

### useCarousel

Inside a Carousel: `index`, `count`, `canPrev`, `canNext`, `scrollTo`, `scrollPrev`, `scrollNext`.
