# Citations

> Links an answer's claims to the sources behind them.

Page: https://paneui.dev/docs/citations/

## Installation

```bash
npx shadcn@latest add @paneui/citations
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/citations.json
```

Packages: `@base-ui/react`, `motion`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/locale-provider`.

## Usage

```tsx
import { Citation, CitationGroup, Citations } from "@/components/ui/citations"
```

```tsx
<CitationGroup sources={sources}>
  <p>The API shipped in Chrome 111<Citation sourceId="chrome" />.</p>
  <Citations />
</CitationGroup>
```

## Composition

```text
CitationGroup
├── Citation
└── Citations
    ├── CitationStack
    └── CitationList
        └── CitationFavicon
```

## Examples

### Standalone Marker

```tsx
import { Citation, type CitationSource } from "@/registry/base-nova/ui/citations"

const SOURCE: CitationSource = {
  id: "jma",
  title: "Weather forecast for Kyoto Prefecture",
  domain: "jma.go.jp",
  url: "https://www.jma.go.jp/bosai/forecast/",
  snippet: "Cloudy with occasional rain from the afternoon; chance of rain 70% after 15:00.",
  meta: "Japan Meteorological Agency",
}

export default function CitationsStandalone() {
  return (
    <p className="max-w-lg text-base leading-relaxed text-pretty">
      Pack an umbrella: rain is likely in Kyoto from mid-afternoon on Saturday
      <Citation source={SOURCE} index={1} />.
    </p>
  )
}
```

### File Sources

```tsx
import { CalendarDaysIcon, FileIcon, InboxIcon } from "@/components/icons"
import { Citation, CitationGroup, Citations, type CitationSource } from "@/registry/base-nova/ui/citations"

const SOURCES: CitationSource[] = [
  { id: "lease", title: "Lease agreement 2025.pdf", icon: <FileIcon />, snippet: "Either party may terminate with 60 days’ written notice.", meta: "Page 4" },
  { id: "email", title: "Re: Renewal terms", icon: <InboxIcon />, snippet: "Happy to renew at the current rate if you sign by November 30.", meta: "From the landlord · Oct 2" },
  { id: "calendar", title: "Lease ends", icon: <CalendarDaysIcon />, snippet: "All-day event · Jan 31, 2027" },
]

export default function CitationsFileSources() {
  return (
    <CitationGroup sources={SOURCES}>
      <div className="flex w-full max-w-lg flex-col gap-3">
        <p className="text-base leading-relaxed text-pretty">
          You need to give 60 days’ notice
          <Citation sourceId="lease" />, and the landlord will hold the current rent if you sign by November 30
          <Citation sourceId="email" />. The lease ends on January 31
          <Citation sourceId="calendar" />.
        </p>
        <Citations />
      </div>
    </CitationGroup>
  )
}
```

### Open by Default

```tsx
import { Citation, CitationGroup, Citations, type CitationSource } from "@/registry/base-nova/ui/citations"

const SOURCES: CitationSource[] = [
  { id: "a", title: "Tokyo to Osaka by Shinkansen", domain: "japan-guide.com", snippet: "The Nozomi takes about 2 hours 15 minutes." },
  { id: "b", title: "JR Pass prices from October 2023", domain: "jrpass.com", snippet: "A 7-day ordinary pass costs ¥50,000." },
]

export default function CitationsOpenList() {
  return (
    <CitationGroup sources={SOURCES} defaultOpen>
      <div className="flex w-full max-w-lg flex-col gap-3">
        <p className="text-base leading-relaxed text-pretty">
          The fastest train takes about 2 hours 15 minutes
          <Citation sourceId="a" />, and a 7-day rail pass now costs ¥50,000
          <Citation sourceId="b" />.
        </p>
        <Citations title="References" />
      </div>
    </CitationGroup>
  )
}
```

### Streaming Sources

```tsx
"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { CitationGroup, Citations, type CitationSource } from "@/registry/base-nova/ui/citations"

const ALL: CitationSource[] = [
  { id: "1", title: "Best ramen in Fukuoka", domain: "timeout.com" },
  { id: "2", title: "Ichiran Tenjin opening hours", domain: "ichiran.com" },
  { id: "3", title: "Hakata tonkotsu, explained", domain: "seriouseats.com" },
  { id: "4", title: "Fukuoka food stalls (yatai) guide", domain: "yokanavi.com" },
]

export default function CitationsStreaming() {
  const [count, setCount] = React.useState(1)
  const sources = ALL.slice(0, count)
  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <CitationGroup sources={sources} defaultOpen>
        <Citations />
      </CitationGroup>
      <Button size="sm" variant="secondary" className="self-start" onClick={() => setCount((c) => (c >= ALL.length ? 1 : c + 1))}>
        {count >= ALL.length ? "Reset" : "Read another source"}
      </Button>
    </div>
  )
}
```

### No Remote Favicons

```tsx
import { Citation, CitationGroup, Citations, type CitationSource } from "@/registry/base-nova/ui/citations"

const SOURCES: CitationSource[] = [
  {
    id: "hko",
    title: "Tropical cyclone warning signals",
    url: "https://www.hko.gov.hk/en/wservice/tsheet/pms/tcws.htm",
    snippet: "Signal No. 8 is issued when gale or storm force winds are expected.",
  },
  {
    id: "mtr",
    title: "Train service during typhoons",
    url: "https://www.mtr.com.hk/en/customer/main/index.html",
    snippet: "Open-air sections may be suspended under Signal No. 8 or above.",
  },
]

export default function CitationsNoRemoteFavicons() {
  return (
    <CitationGroup sources={SOURCES} favicon={false} defaultOpen>
      <div className="flex w-full max-w-lg flex-col gap-3">
        <p className="text-base leading-relaxed text-pretty">
          Under Signal No. 8 offices close
          <Citation sourceId="hko" />, and open-air rail lines may stop running
          <Citation sourceId="mtr" />.
        </p>
        <Citations />
      </div>
    </CitationGroup>
  )
}
```

### List, Stack and Count

Use the parts on their own for custom layouts, like a sidebar.

```tsx
import { CitationCount, CitationList, CitationStack, type CitationSource } from "@/registry/base-nova/ui/citations"

const SOURCES: CitationSource[] = [
  { id: "nhk", title: "Typhoon No. 14 heads north", domain: "nhk.or.jp" },
  { id: "jma", title: "Storm warnings for Kyushu", domain: "jma.go.jp" },
  { id: "ana", title: "Flight status updates", domain: "ana.co.jp" },
  { id: "jr", title: "Shinkansen service suspensions", domain: "jr-central.co.jp" },
]

export default function CitationsListAndCount() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3 rounded-2xl bg-card p-4 shadow-raised">
      <div className="flex items-center justify-between gap-3">
        <CitationStack sources={SOURCES} limit={4} />
        <CitationCount count={SOURCES.length} />
      </div>
      <CitationList sources={SOURCES} />
    </div>
  )
}
```

## Behaviour

Inside a `CitationGroup`, markers number themselves from the `sources` order. Clicking one opens the list, scrolls to the matching row and highlights it for 1.8s. The preview opens after `delay` (250ms) on hover or focus.

## Favicons

By default `CitationFavicon` loads site icons from Google's favicon service when a source has a `url` (this sends the domain to Google), and falls back to the domain's first letter if that fails. The `favicon` prop works on the group and on `Citations`, `CitationList`, `CitationStack` and `Citation`. `favicon={false}` turns remote favicons off, `favicon={(domain) => url}` uses your own service, a source's `faviconSrc` sets its image directly, and `icon` replaces the image with your own node.

## API Reference

Built on [the Preview Card primitive](https://base-ui.com/react/components/preview-card#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### CitationGroup

Provider linking inline markers to the reference list.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `sources` (required) | `CitationSource[]` | — | Sources, in citation order. |
| `idPrefix` | `string` | — | Prefix for row ids (anchor targets). Generated when omitted. |
| `defaultOpen` | `boolean` | `false` | Start with the reference list open. |
| `open` | `boolean` | — | Controlled open state of the list. |
| `onOpenChange` | `(open: boolean) => void` | — | Called when the list opens or closes. |
| `favicon` | `boolean \| ((domain: string) => string \| undefined)` | `true` | Favicon source for everything inside the group. `true` uses Google's service, `false` makes no remote request (monogram), and a function returns your own URL. |
| `children` (required) | `ReactNode` | — | The response containing markers and `Citations`. |

### Citation

Inline numbered marker with a hover preview. Also accepts every prop of [PreviewCard.Trigger (a)](https://base-ui.com/react/components/preview-card#trigger).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `sourceId` | `string` | — | Source id to resolve from the surrounding `CitationGroup`. |
| `source` | `CitationSource` | — | Explicit source, when not inside a group. |
| `index` | `number` | — | Explicit number; derived from the group order when omitted. Shows `•` when neither is known. |
| `delay` | `number` | `250` | Hover delay in ms before the preview opens. |
| `favicon` | `boolean \| ((domain: string) => string \| undefined)` | — | Favicon source in the preview; defaults to the group's, then `true`. |

| Data attribute | Description |
| --- | --- |
| `data-popup-open` | Present while the preview is open (primary tint). |

### Citations

Collapsible Sources summary with favicon stack and count. Renders nothing without sources. Also accepts every prop of [Collapsible](https://base-ui.com/react/components/collapsible).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `sources` | `CitationSource[]` | — | Defaults to the group's sources. |
| `title` | `ReactNode` | `"Sources"` | Summary label. |
| `open` | `boolean` | — | Controlled open state; otherwise shared with the group. |
| `defaultOpen` | `boolean` | `false` | Initial state outside a group. |
| `onOpenChange` | `(open: boolean) => void` | — | Called when it opens or closes. |
| `favicon` | `boolean \| ((domain: string) => string \| undefined)` | — | Favicon source for the stack and list; defaults to the group's, then `true`. |
| `className` | `string` | — | Merged onto the root. |

### CitationList

Numbered reference rows (an `<ol>`); rows with a `url` are links, and without one the row and preview have no link.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `sources` | `CitationSource[]` | — | Defaults to the group's sources. |
| `favicon` | `boolean \| ((domain: string) => string \| undefined)` | — | Favicon source for the rows; defaults to the group's, then `true`. |
| `className` | `string` | — | Merged onto the list. |

| Data attribute | Description |
| --- | --- |
| `data-highlighted` | On the row a marker just pointed to. |

### CitationFavicon

Favicon chip; falls back to a monogram or `icon`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `source` (required) | `Pick<CitationSource, "url" \| "domain" \| "icon" \| "faviconSrc">` | — | Source to draw. |
| `favicon` | `boolean \| ((domain: string) => string \| undefined)` | `true` | `true` loads from Google's favicon service, `false` makes no remote request (monogram), a function maps the domain to your own URL. Defaults to the group's when inside one. |
| `className` | `string` | — | Merged onto the chip. |

### CitationStack

Overlapping favicons.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `sources` (required) | `CitationSource[]` | — | Sources to draw. |
| `limit` | `number` | `3` | Max favicons shown. |
| `favicon` | `boolean \| ((domain: string) => string \| undefined)` | — | Favicon source; defaults to the group's, then `true`. |
| `className` | `string` | — | Merged onto the stack. |

### CitationCount

Small "N sources" chip.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `count` (required) | `number` | — | Number of sources. |
| `className` | `string` | — | Merged onto the chip. |

### CitationSource

Shape of one source.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `id` (required) | `string` | — | Stable id used by `sourceId`. |
| `title` (required) | `ReactNode` | — | Source title. |
| `url` | `string` | — | Link target; also used for the favicon and domain. |
| `domain` | `string` | — | Display domain; derived from `url` when omitted. |
| `snippet` | `ReactNode` | — | Excerpt shown in the preview. |
| `meta` | `ReactNode` | — | Extra preview line, e.g. a publish date. |
| `icon` | `ReactNode` | — | Replaces the favicon. |
| `faviconSrc` | `string` | — | Explicit favicon URL (e.g. self-hosted); wins over the `favicon` option. |
