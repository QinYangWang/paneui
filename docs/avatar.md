# Avatar

> Shows a photo or initials.

Page: https://paneui.dev/docs/avatar/

## Installation

```bash
npx shadcn@latest add @paneui/avatar
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/avatar.json
```

Packages: `@base-ui/react`, `class-variance-authority`.

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
```

```tsx
<Avatar>
  <AvatarImage src="https://github.com/QinYangWang.png" alt="Qinyang" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
```

## Composition

```text
AvatarGroup
├── Avatar
│   ├── AvatarImage
│   ├── AvatarFallback
│   └── AvatarStatus
└── AvatarGroupCount
```

## Examples

### Basic

```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/base-nova/ui/avatar"

export default function AvatarBasic() {
  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src="https://github.com/QinYangWang.png" alt="Qinyang" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-sm font-medium">Qinyang</span>
        <span className="text-xs text-muted-foreground">Maintainer</span>
      </div>
    </div>
  )
}
```

### Sizes and Shapes

```tsx
import { Avatar, AvatarFallback } from "@/registry/base-nova/ui/avatar"
import { GeneratedAvatar } from "@/registry/base-nova/ui/generated-avatar"

const sizes = ["xs", "sm", "md", "lg", "xl"] as const

export default function AvatarSizes() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-end gap-3">
        {sizes.map((size) => (
          <Avatar key={size} size={size}>
            <AvatarFallback>QW</AvatarFallback>
          </Avatar>
        ))}
      </div>
      <div className="flex items-end gap-3">
        {sizes.map((size) => (
          <GeneratedAvatar key={size} seed="mika" size={size} shape="rounded" />
        ))}
      </div>
    </div>
  )
}
```

### Fallback

```tsx
import { UserIcon } from "@/components/icons"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/base-nova/ui/avatar"
import { GeneratedAvatarImage } from "@/registry/base-nova/ui/generated-avatar"

export default function AvatarFallbackExample() {
  return (
    <div className="flex items-center gap-3">
      <Avatar size="lg">
        <AvatarImage src="/missing-photo.png" alt="Ada Lovelace" />
        <AvatarFallback delay={300}>AL</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>
          <UserIcon />
        </AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage src="/missing-photo.png" alt="Grace Hopper" />
        <AvatarFallback>
          <GeneratedAvatarImage seed="grace@example.com" gender="female" />
        </AvatarFallback>
      </Avatar>
    </div>
  )
}
```

### Status

```tsx
import { Avatar, AvatarFallback, AvatarStatus } from "@/registry/base-nova/ui/avatar"
import { GeneratedAvatar } from "@/registry/base-nova/ui/generated-avatar"

const people = [
  { seed: "noa", status: "online", label: "Online" },
  { seed: "ren", status: "away", label: "Away" },
  { seed: "ivy", status: "busy", label: "Do not disturb" },
] as const

export default function AvatarStatusExample() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-4">
        {people.map((person) => (
          <GeneratedAvatar key={person.seed} seed={person.seed} size="lg">
            <AvatarStatus status={person.status} label={person.label} />
          </GeneratedAvatar>
        ))}
        <Avatar size="lg" shape="rounded">
          <AvatarFallback>JD</AvatarFallback>
          <AvatarStatus status="offline" label="Offline" />
        </Avatar>
      </div>
    </div>
  )
}
```

### Group

```tsx
import { AvatarGroup, AvatarGroupCount } from "@/registry/base-nova/ui/avatar"
import { GeneratedAvatar } from "@/registry/base-nova/ui/generated-avatar"

const team = [
  { seed: "aiko", gender: "female" },
  { seed: "ben", gender: "male" },
  { seed: "chloe", gender: "female" },
  { seed: "dev", gender: "male" },
  { seed: "emi", gender: "female" },
] as const

export default function AvatarGroupExample() {
  return (
    <div className="flex flex-col items-center gap-5">
      <AvatarGroup>
        {team.map(({ seed, gender }) => (
          <GeneratedAvatar key={seed} seed={seed} gender={gender} title={seed} />
        ))}
        <AvatarGroupCount>+8</AvatarGroupCount>
      </AvatarGroup>
      <AvatarGroup size="lg" shape="rounded">
        {team.slice(0, 4).map(({ seed, gender }) => (
          <GeneratedAvatar key={seed} seed={seed} gender={gender} title={seed} />
        ))}
        <AvatarGroupCount>+3</AvatarGroupCount>
      </AvatarGroup>
      <AvatarGroup size="sm">
        {team.map(({ seed, gender }) => (
          <GeneratedAvatar key={seed} seed={seed} gender={gender} title={seed} />
        ))}
      </AvatarGroup>
    </div>
  )
}
```

## Accessibility

Always give `AvatarImage` an `alt`. When the person's name is printed next to the avatar, an empty `alt` is fine. A status dot is decorative unless you pass `label`.

## API Reference

Built on [the Avatar primitive](https://base-ui.com/react/components/avatar#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### Avatar

Also accepts every prop of [Avatar.Root](https://base-ui.com/react/components/avatar#root).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `"xs" \| "sm" \| "md" \| "default" \| "lg" \| "xl"` | `"md"` | Box size and fallback text size, from 20px at `xs` through 24, 32 and 40px to 48px at `xl`; `default` is the same as `md`. Inside an `AvatarGroup` it defaults to the group's size. |
| `shape` | `"circle" \| "rounded"` | `"circle"` | Round, or a squircle whose radius scales with the size (6–14px). |

| Data attribute | Description |
| --- | --- |
| `data-size` | The resolved size. |
| `data-shape` | The resolved shape. |

### AvatarImage

Also accepts every prop of [Avatar.Image](https://base-ui.com/react/components/avatar#image).

### AvatarFallback

Initials or an icon. Shows while the image loads and stays if it fails. Also accepts every prop of [Avatar.Fallback](https://base-ui.com/react/components/avatar#fallback).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `delay` | `number` | — | Milliseconds to wait before showing the fallback. |

### AvatarStatus

Presence dot at the bottom-right, sized from the avatar. Also accepts every prop of `span`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `status` | `"online" \| "away" \| "busy" \| "offline"` | `"online"` | Presence state; sets the dot to the success, warning, destructive or muted token, in that order. |
| `label` | `string` | — | Accessible name (e.g. "Online"). Without it the dot is hidden from screen readers. |

### AvatarGroup

Overlapping stack with a `background` ring around each avatar. Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `"xs" \| "sm" \| "md" \| "default" \| "lg" \| "xl"` | `"md"` | Default size for every avatar inside, and the overlap. |
| `shape` | `"circle" \| "rounded"` | `"circle"` | Default shape for every avatar inside. |

### AvatarGroupCount

The "+N" tile at the end of a group. Also accepts every prop of `Avatar`.
