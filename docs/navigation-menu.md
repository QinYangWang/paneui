# Navigation Menu

> Site navigation with panels of links.

Page: https://paneui.dev/docs/navigation-menu/

## Installation

```bash
npx shadcn@latest add @paneui/navigation-menu
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/navigation-menu.json
```

Packages: `@base-ui/react`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`.

## Usage

```tsx
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
```

```tsx
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Product</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink href="/analytics">
          <span>Analytics</span>
          <span>Dashboards for every team.</span>
        </NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

## Composition

```text
NavigationMenu
└── NavigationMenuList
    └── NavigationMenuItem
        ├── NavigationMenuTrigger
        └── NavigationMenuContent
            └── NavigationMenuLink
```

## Examples

### Links Only

```tsx
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/registry/base-nova/ui/navigation-menu"

export default function NavigationMenuLinksOnly() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {["Overview", "Customers", "Pricing", "Blog"].map((l, i) => (
          <NavigationMenuItem key={l}>
            <NavigationMenuLink variant="trigger" href="#" active={i === 0}>
              {l}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
```

### Header Tabs

```tsx
"use client"

import * as React from "react"

import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/registry/base-nova/ui/navigation-menu"

const sections = ["Docs", "Components", "Templates", "Changelog"]

export default function NavigationMenuHeaderTabs() {
  const [current, setCurrent] = React.useState("Docs")
  return (
    <div className="flex h-12 w-full max-w-xl items-stretch border-b border-border px-2">
      <NavigationMenu aria-label="Sections" className="h-full">
        <NavigationMenuList className="h-full items-stretch gap-1">
          {sections.map((s) => (
            <NavigationMenuItem key={s}>
              <NavigationMenuLink
                variant="tab"
                href="#"
                active={s === current}
                aria-current={s === current ? "page" : undefined}
                onClick={(e) => {
                  e.preventDefault()
                  setCurrent(s)
                }}
              >
                {s}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
```

### RTL

```tsx
import { DirectionProvider } from "@base-ui/react/direction-provider"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/registry/base-nova/ui/navigation-menu"

const product = [
  { title: "التحليلات", text: "لوحات يتابعها فريقك كل يوم." },
  { title: "الأتمتة", text: "شغّل العمل وفق جدول أو حدث." },
  { title: "التكاملات", text: "اربط الأدوات التي تستخدمها." },
  { title: "الأمان", text: "تسجيل دخول موحد وسجلات تدقيق." },
]

export default function NavigationMenuRtl() {
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>المنتج</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-0.5 sm:w-md sm:grid-cols-2">
                  {product.map((p) => (
                    <li key={p.title}>
                      <NavigationMenuLink href="#">
                        <span>{p.title}</span>
                        <span>{p.text}</span>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink variant="trigger" href="#">
                الأسعار
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink variant="trigger" href="#">
                التوثيق
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </DirectionProvider>
  )
}
```

## Motion

One popup is shared by every panel: it resizes and the panels slide in from the side the pointer came from. Under reduced motion it only fades.

## Links

Use `render` on `NavigationMenuLink` for your router's link. The first `span` is the title and the second the muted line; `active` marks the current page.

## API Reference

Built on [the Navigation Menu primitive](https://base-ui.com/react/components/navigation-menu#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### NavigationMenu

Root plus the shared popup. Also accepts every prop of [NavigationMenu.Root](https://base-ui.com/react/components/navigation-menu#root).

### NavigationMenuTrigger

Adds the chevron. Also accepts every prop of [NavigationMenu.Trigger](https://base-ui.com/react/components/navigation-menu#trigger).

### NavigationMenuContent

A panel; size it with `className`. Also accepts every prop of [NavigationMenu.Content](https://base-ui.com/react/components/navigation-menu#content).

### NavigationMenuLink

Also accepts every prop of [NavigationMenu.Link](https://base-ui.com/react/components/navigation-menu#link).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"panel" \| "trigger" \| "tab"` | `"panel"` | `trigger` styles a top-level link like a trigger; `tab` is a full-height header section link with a 2px bar under the `active` one. |

### NavigationMenuList

Also accepts every prop of [NavigationMenu.List](https://base-ui.com/react/components/navigation-menu#list).

### NavigationMenuItem

Also accepts every prop of [NavigationMenu.Item](https://base-ui.com/react/components/navigation-menu#item).
