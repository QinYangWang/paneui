# Installation

Page: https://paneui.dev/docs/installation/

Install the theme, then add components.

**Requirements**

A React project with Tailwind CSS 4 and shadcn initialised with the base-nova style. Run `shadcn init` first if you have no components.json yet. To start a new app from a template, see [Templates in one command](https://paneui.dev/docs/cli/#templates).

## Add the registry

Add the namespace to your components.json.

```json title="components.json"
{
  "registries": {
    "@paneui": "https://paneui.dev/r/{name}.json"
  }
}
```

## Install the theme

Every component reads the theme's tokens, so install it first, together with the icon set.

```bash
pnpm dlx shadcn@latest add @paneui/theme @paneui/icons
```

The accent is blue by default. To change it, add one accent preset after the theme. [Theming](https://paneui.dev/docs/theming/#accent-presets) lists the presets and what each token does.

```bash
pnpm dlx shadcn@latest add @paneui/theme-violet
```

## Add components

```bash
pnpm dlx shadcn@latest add @paneui/button @paneui/prompt-bar
```

The CLI also installs the components and npm packages each item depends on. Everything lands in your project as source, so edit it as you need.

## Use them

Import from the path your components.json aliases point to. Every component page lists its parts and props under API Reference.

```tsx title="save.tsx"
import { Button } from "@/components/ui/button"

export function Save() {
  return <Button>Save changes</Button>
}
```

For other commands, see [CLI & registry](https://paneui.dev/docs/cli/).
