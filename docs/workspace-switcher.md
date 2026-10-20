# Workspace Switcher

> Switches between workspaces or teams from the sidebar header.

Page: https://paneui.dev/docs/workspace-switcher/

## Installation

```bash
npx shadcn@latest add @paneui/workspace-switcher
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/workspace-switcher.json
```

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/menu`.

## Usage

```tsx
import { WorkspaceSwitcher } from "@/components/ui/workspace-switcher"
```

```tsx
<WorkspaceSwitcher
  workspaces={[{ id: "acme", name: "Acme", plan: "Pro" }]}
  value={workspace}
  onValueChange={setWorkspace}
  onCreate={() => setCreating(true)}
/>
```

## In a sidebar

Put it in `SidebarHeader` and pass `collapsed={useSidebar().state === "collapsed"}` so it shrinks to the mark in the icon rail.

## API Reference

Built on [the Menu primitive](https://base-ui.com/react/components/menu#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### WorkspaceSwitcher

Also accepts every prop of `Menu.Trigger`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `workspaces` (required) | `{ id: string; name: string; plan?: string; logo?: ReactNode }[]` | — | Choices; `logo` defaults to the first letter on a primary tile. |
| `value` (required) | `string` | — | Current workspace id. |
| `onValueChange` (required) | `(id: string) => void` | — | Called on pick. |
| `onCreate` | `() => void` | — | Adds a "Create workspace" item. |
| `collapsed` | `boolean` | `false` | Mark only. |
