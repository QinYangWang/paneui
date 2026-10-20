# Brand Icon

> Shows brand logos.

Page: https://paneui.dev/docs/brand-icon/

## Installation

```bash
npx shadcn@latest add @paneui/brand-icon
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/brand-icon.json
```

Packages: `simple-icons`.

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
import { siGithub } from "simple-icons"

import { BrandIcon } from "@/components/ui/brand-icon"
```

```tsx
<BrandIcon icon={siGithub} />
```

## Examples

### Colors

```tsx
import { siDiscord, siFigma, siGithub, siStripe, siVercel } from "simple-icons"

import { BrandIcon } from "@/registry/base-nova/ui/brand-icon"

const BRANDS = [siGithub, siVercel, siFigma, siStripe, siDiscord]

export default function BrandIconColors() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-4 text-muted-foreground">
        {BRANDS.map((b) => (
          <BrandIcon key={b.slug} icon={b} size={24} title={b.title} />
        ))}
      </div>
      <div className="flex items-center gap-4">
        {BRANDS.map((b) => (
          <BrandIcon key={b.slug} icon={b} size={24} color="brand" title={b.title} />
        ))}
      </div>
    </div>
  )
}
```

### Sizes

```tsx
import { siLinear } from "simple-icons"

import { BrandIcon } from "@/registry/base-nova/ui/brand-icon"
import { IconChip } from "@/registry/base-nova/ui/icon-chip"

export default function BrandIconSizes() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      <div className="flex items-end gap-4">
        {[14, 16, 18, 24].map((size) => (
          <BrandIcon key={size} icon={siLinear} size={size} color="brand" />
        ))}
      </div>
      <div className="flex items-center gap-3">
        {(["sm", "default", "lg", "xl"] as const).map((size) => (
          <IconChip key={size} size={size}>
            <BrandIcon icon={siLinear} color="brand" />
          </IconChip>
        ))}
      </div>
    </div>
  )
}
```

### Sign-in Buttons

```tsx
import { siApple, siGithub, siGoogle } from "simple-icons"

import { BrandIcon } from "@/registry/base-nova/ui/brand-icon"
import { Button } from "@/registry/base-nova/ui/button"

export default function BrandIconSignIn() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Button variant="outline">
        <BrandIcon icon={siGithub} data-icon="inline-start" />
        Continue with GitHub
      </Button>
      <Button variant="outline">
        <BrandIcon icon={siGoogle} color="brand" data-icon="inline-start" />
        Continue with Google
      </Button>
      <Button variant="outline">
        <BrandIcon icon={siApple} data-icon="inline-start" />
        Continue with Apple
      </Button>
    </div>
  )
}
```

### Integrations

```tsx
"use client"

import * as React from "react"
import { siGithub, siLinear, siNotion, siSentry } from "simple-icons"

import { BrandIcon } from "@/registry/base-nova/ui/brand-icon"
import { IconChip } from "@/registry/base-nova/ui/icon-chip"
import { Switch } from "@/registry/base-nova/ui/switch"

const APPS = [
  { icon: siGithub, detail: "Open pull requests from agent runs" },
  { icon: siLinear, detail: "Turn issues into tasks" },
  { icon: siSentry, detail: "Send new errors to triage" },
  { icon: siNotion, detail: "Publish run summaries" },
]

export default function BrandIconIntegrations() {
  const [on, setOn] = React.useState<Record<string, boolean>>({ GitHub: true, Linear: true })
  return (
    <ul className="flex w-full max-w-md flex-col divide-y divide-border rounded-xl bg-card shadow-raised">
      {APPS.map(({ icon, detail }) => (
        <li key={icon.slug} className="flex items-center gap-3 px-4 py-3">
          <IconChip>
            <BrandIcon icon={icon} color="brand" />
          </IconChip>
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="text-ui font-medium">{icon.title}</span>
            <span className="truncate text-ui-sm text-muted-foreground">{detail}</span>
          </div>
          <Switch
            checked={!!on[icon.title]}
            onCheckedChange={(v) => setOn((s) => ({ ...s, [icon.title]: v }))}
            aria-label={`Connect ${icon.title}`}
          />
        </li>
      ))}
    </ul>
  )
}
```

### Your Own Marks

Use for a brand the package leaves out, or for your own product.

```tsx
import { ApertureIcon } from "@/components/icons"
import { BrandIcon, type BrandIconData } from "@/registry/base-nova/ui/brand-icon"
import { IconChip } from "@/registry/base-nova/ui/icon-chip"

/** Your own 24×24 mark, for a brand the package does not carry. */
const acme: BrandIconData = {
  title: "Acme",
  hex: "6E56CF",
  path: "M12 2 22 20H2L12 2Zm0 5.2L6.4 17h11.2L12 7.2Z",
}

export default function BrandIconOwnMarks() {
  return (
    <div className="flex items-center gap-3">
      <IconChip>
        <BrandIcon icon={acme} color="brand" />
      </IconChip>
      <IconChip>
        <ApertureIcon />
      </IconChip>
    </div>
  )
}
```

## Bundle size

Import each logo by name (`import { siGithub } from "simple-icons"`). The package is marked side-effect free, so only the logos you import reach the bundle. Avoid `import * as icons` and slug lookups in app code: the full set is several megabytes.

## Brands that are not in the package

Brands whose owners asked for removal or never gave permission are not in the package: Microsoft and its products (Teams, Outlook, Azure, VS Code, LinkedIn, Xbox), Amazon and AWS, OpenAI, Salesforce and Slack, Adobe, Oracle and Java, IBM, Twilio and Yahoo, among others. Use the brand's own asset under its guidelines, or a neutral glyph from the icon set (the templates use one for the Codex agent)

## Dark marks

With `color="brand"`, near-black logos (GitHub, Vercel, X) switch to the foreground colour in dark mode and near-white ones do the same in light mode, so no logo disappears on either theme.

## Trademarks

The logos belong to their owners. Showing one says which service a feature connects to; it does not imply endorsement. Check each brand's guidelines before using its colour or mark more prominently.

## Accessibility

Without `title` the logo is hidden from assistive tech, which is right when a visible name sits next to it. Pass `title` for a logo that stands alone.

## API Reference

### BrandIcon

One brand logo on the icon set's grid. Also accepts every prop of `svg`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `icon` (required) | `{ title: string; path: string; hex?: string }` | — | An icon object from the package, or your own 24×24 mark in the same shape. |
| `color` | `"current" \| "brand"` | `"current"` | Follow the text colour, or paint the brand's colour. |
| `size` | `number` | `18` | Pixel size. Buttons, menus and icon chips size their icons themselves. |
| `title` | `string` | — | Accessible name for a logo without a visible label. |
| `inset` | `boolean` | `true` | Keep the icon set's 2px margin so logos sit at the same optical size as icons. |

| Data attribute | Description |
| --- | --- |
| `data-brand` | The brand's name, for styling or tests. |
