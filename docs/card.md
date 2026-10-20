# Card

> Groups related content and actions on one surface.

Page: https://paneui.dev/docs/card/

## Installation

```bash
npx shadcn@latest add @paneui/card
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/card.json
```

Packages: `class-variance-authority`, `@base-ui/react`.

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
```

```tsx
<Card>
  <CardHeader>
    <CardTitle>Weekly digest</CardTitle>
    <CardDescription>Every Monday at 9:00.</CardDescription>
  </CardHeader>
  <CardContent>Sales, stock and open tasks.</CardContent>
</Card>
```

## Composition

```text
Card
├── CardHeader
│   ├── CardTitle
│   ├── CardDescription
│   └── CardAction
├── CardContent
└── CardFooter

Card variant="inset"
├── CardPanel
│   ├── CardHeader
│   └── CardContent
└── CardFooter
```

## Examples

### Variants

```tsx
import { Card, CardContent, CardDescription, CardHeader, CardPanel, CardTitle } from "@/registry/base-nova/ui/card"

const variants = ["default", "outline", "ghost"] as const

export default function CardVariants() {
  return (
    <div className="grid w-full max-w-2xl grid-cols-2 items-start gap-3">
      {variants.map((variant) => (
        <Card key={variant} variant={variant}>
          <CardHeader>
            <CardTitle className="capitalize">{variant}</CardTitle>
            <CardDescription>Weekly active users</CardDescription>
          </CardHeader>
          <CardContent className="text-2xl font-semibold tabular-nums">1,284</CardContent>
        </Card>
      ))}
      <Card variant="inset">
        <CardPanel>
          <CardHeader>
            <CardTitle>Inset</CardTitle>
            <CardDescription>Weekly active users</CardDescription>
          </CardHeader>
          <CardContent className="text-2xl font-semibold tabular-nums">1,284</CardContent>
        </CardPanel>
      </Card>
    </div>
  )
}
```

### Sizes

```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/base-nova/ui/card"

export default function CardSizes() {
  return (
    <div className="grid w-full max-w-2xl grid-cols-3 items-start gap-3">
      {(["sm", "default", "lg"] as const).map((size) => (
        <Card key={size} size={size}>
          <CardHeader>
            <CardTitle>{size === "sm" ? "Small" : size === "lg" ? "Large" : "Default"}</CardTitle>
            <CardDescription>Open tasks</CardDescription>
          </CardHeader>
          <CardContent className="text-2xl font-semibold tabular-nums">12</CardContent>
        </Card>
      ))}
    </div>
  )
}
```

### With Form

```tsx
import { Button } from "@/registry/base-nova/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/registry/base-nova/ui/card"
import { Input } from "@/registry/base-nova/ui/input"
import { Label } from "@/registry/base-nova/ui/label"

export default function CardWithForm() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Invite a teammate</CardTitle>
        <CardDescription>They get access to every shared project.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="invite-name">Name</Label>
          <Input id="invite-name" placeholder="Dana Reyes" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="invite-email">Email</Label>
          <Input id="invite-email" type="email" placeholder="dana@example.com" />
        </div>
      </CardContent>
      <CardFooter className="justify-end">
        <Button variant="ghost" size="sm">
          Cancel
        </Button>
        <Button size="sm">Send invite</Button>
      </CardFooter>
    </Card>
  )
}
```

### Inset With Media

```tsx
import { ImageIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardPanel, CardTitle } from "@/registry/base-nova/ui/card"

export default function CardInsetMedia() {
  return (
    <Card variant="inset" className="w-full max-w-sm">
      <CardPanel className="pt-0">
        <div className="flex aspect-video items-center justify-center bg-linear-to-br from-primary/25 to-primary/5 text-primary">
          <ImageIcon className="size-6" />
        </div>
        <CardHeader>
          <CardTitle>Kyoto, autumn</CardTitle>
          <CardDescription>48 photos from Nov 12–18.</CardDescription>
        </CardHeader>
        <CardContent className="text-muted-foreground">Shared with 3 people.</CardContent>
      </CardPanel>
      <CardFooter className="justify-end py-3">
        <Button variant="secondary" size="sm">
          Open album
        </Button>
      </CardFooter>
    </Card>
  )
}
```

### Link Cards

```tsx
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons"
import { Card } from "@/registry/base-nova/ui/card"

export default function CardLinkCards() {
  return (
    <nav aria-label="Pagination" className="grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
      <Card interactive size="sm" render={<a href="#" rel="prev" />} className="gap-1 px-4">
        <span className="flex items-center gap-1 text-ui-sm text-muted-foreground">
          <ArrowLeftIcon className="size-3.5 rtl:-scale-x-100" />
          Previous
        </span>
        <span className="text-ui-lg font-medium">Installation</span>
      </Card>
      <Card interactive size="sm" render={<a href="#" rel="next" />} className="items-end gap-1 px-4 text-end">
        <span className="flex items-center gap-1 text-ui-sm text-muted-foreground">
          Next
          <ArrowRightIcon className="size-3.5 rtl:-scale-x-100" />
        </span>
        <span className="text-ui-lg font-medium">Theming</span>
      </Card>
    </nav>
  )
}
```

### Inset With Code

```tsx
import { Card, CardFooter, CardPanel } from "@/registry/base-nova/ui/card"

export default function CardInsetCode() {
  return (
    <Card variant="inset" className="w-full max-w-sm">
      <CardFooter className="justify-between py-2">
        <span className="font-mono text-xs text-muted-foreground">terminal</span>
        <span className="text-xs text-muted-foreground">pnpm</span>
      </CardFooter>
      <CardPanel className="px-4 font-mono text-xs">
        pnpm dlx shadcn@latest add @paneui/card
      </CardPanel>
    </Card>
  )
}
```

## API Reference

### Card

Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Sets `--card-spacing` (12, 16 or 24px), used by every part for padding and gaps. |
| `interactive` | `boolean` | `false` | The whole card is one link or button: the shadow steps up on hover and focus shows the ring. |
| `render` | `React.ReactElement \| (props, state) => React.ReactElement` | — | Render the card as another element, such as `<a href>` or your router's link. |
| `variant` | `"default" \| "outline" \| "ghost" \| "inset"` | `"default"` | `outline` is a 1px border with no fill or shadow, `ghost` has no surface, and `inset` turns the card into a tinted frame (4px padding) that holds a `CardPanel`. |

| Data attribute | Description |
| --- | --- |
| `data-size` | The `size` value. |
| `data-variant` | The `variant` value. |

### CardPanel

The raised inner surface of an inset card. Also accepts every prop of `div`.

### CardHeader

Title, description and an optional `CardAction` in the top-right corner. Also accepts every prop of `div`.

### CardTitle

Also accepts every prop of `div`.

### CardDescription

Also accepts every prop of `div`.

### CardAction

Placed in the header's right column, spanning the title and description rows. Also accepts every prop of `div`.

### CardContent

Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `typeset` | `boolean \| "docs" \| "reading" \| "chat"` | `false` | Turn prose styles back on for the content inside a `typeset` container, or name a preset when it stands alone. |

### CardFooter

A row with a 8px gap between items. Also accepts every prop of `div`.
