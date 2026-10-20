# User Menu

> Opens account actions for the signed-in user.

Page: https://paneui.dev/docs/user-menu/

## Installation

```bash
npx shadcn@latest add @paneui/user-menu
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/user-menu.json
```

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/avatar`, `@paneui/menu`.

## Usage

```tsx
import { UserMenu } from "@/components/ui/user-menu"
```

```tsx
<UserMenu name="Dana Chen" email="dana@acme.dev">
  <MenuItem>Profile</MenuItem>
  <MenuSeparator />
  <MenuItem variant="destructive">Sign out</MenuItem>
</UserMenu>
```

## Examples

### Compact

```tsx
import { LogOutIcon } from "@/components/icons"
import { MenuItem } from "@/registry/base-nova/ui/menu"
import { UserMenu } from "@/registry/base-nova/ui/user-menu"

export default function UserMenuCompact() {
  return (
    <UserMenu name="Kenji Sato" email="kenji@northwind.dev" variant="compact" side="bottom" align="end">
      <MenuItem variant="destructive">
        <LogOutIcon className="rtl:-scale-x-100" />
        Sign out
      </MenuItem>
    </UserMenu>
  )
}
```

## In a sidebar

Put it in `SidebarFooter`; `collapsed` shows only the avatar in the icon rail. The menu opens upward by default (`side="top"`).

## API Reference

Built on [the Menu primitive](https://base-ui.com/react/components/menu#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### UserMenu

Also accepts every prop of `Menu.Trigger`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` (required) | `string` | — | Shown and used for initials. |
| `email` | `string` | — | Second line and the menu's first label. |
| `image` | `string` | — | Avatar photo URL. |
| `collapsed` | `boolean` | `false` | Avatar only. |
| `variant` | `"row" \| "compact"` | `"row"` | Full row or avatar button. |
| `side / align` | `Menu side / align` | `"top" / "start"` | Menu position. |
