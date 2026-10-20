# Avatar Generator

> Creates and edits avatars.

Page: https://paneui.dev/docs/avatar-generator/

## Installation

```bash
npx shadcn@latest add @paneui/avatar-generator
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/avatar-generator.json
```

Packages: `@base-ui/react`, `@dicebear/core@^9.4.3`, `@dicebear/notionists@^9.4.3`.

Registry items it builds on: `@paneui/theme`, `@paneui/avatar`, `@paneui/button`, `@paneui/input`, `@paneui/select`, `@paneui/tabs`, `@paneui/icons`.

## Usage

```tsx
import { GeneratedAvatar } from "@/components/ui/generated-avatar"
import { AvatarGenerator } from "@/components/ui/avatar-generator"
```

```tsx
<GeneratedAvatar seed={user.id} gender="female" size="lg" title={user.name} />
```

## Composition

```text
GeneratedAvatar        Avatar frame + illustrated drawing
GeneratedAvatarImage   bare <svg>, e.g. inside AvatarFallback
createGeneratedAvatar  no React: SVG string, data URI, resolved parts
AvatarGenerator        editor: seed, gender, part pickers, download, copy
```

## Examples

### From a Seed

Use a stable seed, like a user id, so a person gets the same avatar everywhere.

```tsx
import { GeneratedAvatar } from "@/registry/base-nova/ui/generated-avatar"

const users = [
  { id: "u_1029", name: "Mina Park", email: "mina@acme.dev", gender: "female" },
  { id: "u_2211", name: "Leo Tanaka", email: "leo@acme.dev", gender: "male" },
  { id: "u_3304", name: "Sara Ruiz", email: "sara@acme.dev", gender: "female" },
] as const

export default function AvatarGeneratorBySeed() {
  return (
    <ul className="flex w-72 flex-col gap-3">
      {users.map((user) => (
        <li key={user.id} className="flex items-center gap-3">
          <GeneratedAvatar seed={user.id} gender={user.gender} size="lg" />
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-medium">{user.name}</span>
            <span className="truncate text-xs text-muted-foreground">{user.email}</span>
          </div>
        </li>
      ))}
    </ul>
  )
}
```

### Male and Female

```tsx
import { GeneratedAvatar } from "@/registry/base-nova/ui/generated-avatar"

const seeds = ["alpha", "bravo", "charlie", "delta", "echo"]

export default function AvatarGeneratorGender() {
  return (
    <div className="@container flex w-full max-w-md flex-col gap-4">
      {(["female", "male"] as const).map((gender) => (
        <div key={gender} className="flex flex-col gap-2 @sm:flex-row @sm:items-center @sm:gap-4">
          <span className="text-sm text-muted-foreground capitalize @sm:w-14 @sm:shrink-0">{gender}</span>
          <div className="flex flex-wrap gap-2">
            {seeds.map((seed) => (
              <GeneratedAvatar key={seed} seed={seed} gender={gender} size="xl" />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
```

### Options

```tsx
import { GeneratedAvatar } from "@/registry/base-nova/ui/generated-avatar"

const variants = [
  { label: "Default", props: {} },
  { label: "Accessories", props: { accessories: true } },
  { label: "Glasses", props: { selections: { glasses: "variant05" } } },
  { label: "Gesture", props: { selections: { gesture: "waveLongArm" } } },
  { label: "Circle", props: { background: "circle" } },
  { label: "Picked parts", props: { selections: { hair: "variant46", eyes: "variant02", lips: "variant03", body: "variant12" } } },
  { label: "Background", props: { colors: { background: "#EAF2FB" } } },
  { label: "Hex background", props: { background: "#FDEFD8" } },
  { label: "Transparent", props: { background: "none" } },
  { label: "Male + beard", props: { gender: "male" as const, selections: { hair: "variant52", beard: "variant02" } } },
]

export default function AvatarGeneratorOptions() {
  return (
    <div className="@container w-full max-w-lg">
      <div className="grid grid-cols-3 gap-4 @md:grid-cols-5">
        {variants.map((variant) => (
          <figure key={variant.label} className="flex flex-col items-center gap-2">
            <GeneratedAvatar seed="hana" gender="female" size={64} shape="rounded" {...variant.props} />
            <figcaption className="text-center text-xs text-balance text-muted-foreground">{variant.label}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
```

### Generator

```tsx
import { AvatarGenerator } from "@/registry/base-nova/ui/avatar-generator"

export default function AvatarGeneratorUi() {
  return <AvatarGenerator defaultSeed="paneui" />
}
```

## Artwork and licence

The illustrations and the renderer install with the component as two packages; nothing is fetched at runtime. The licence metadata block is stripped from the SVG output; credits for the art and the renderer are in `THIRD_PARTY_NOTICES.md`.

## Parts

Part names follow the drawing set, with hair `variant01`…`variant63` plus `hat`, eyes `variant01`…`05`, brows `01`…`13`, lips `01`…`30`, nose `01`…`20`, glasses `01`…`11`, beard `01`…`12`, body (the top) `01`…`25`, and gesture `waveLongArms`, `waveLongArm`, `wavePointLongArms`, `waveOkLongArms`, `pointLongArm`, `okLongArm`, `handPhone`. Use `getAvatarParts(slot, gender)` for the list with labels. Gestures are off unless picked; the set's `point`, `ok` and `hand` are left out because the closer crop hides the hand.

## Small sizes and ids

The drawings are busts; the avatar is zoomed in (`scale` 135, `translateY` 8) so the face still reads at `xs`/`sm` (20–24px). Every id inside the SVG (the clip mask, some tops) is prefixed. `GeneratedAvatar` and `GeneratedAvatarImage` use React's `useId`, `createGeneratedAvatar` a hash of the options (or your `idPrefix`), so any number of avatars, identical ones included, can share a page without one borrowing another's mask, and the markup is the same on the server and the client.

## Storing an avatar

Store the seed when the avatar can be regenerated from the user. When the user edits it, store `{ seed, gender, selections, accessories }` from `onValueChange`. A future release of the drawing set that adds parts can change seed-only picks, so pin explicit `selections` for avatars that must never change.

## Generator width

`AvatarGenerator` lays out by its own width, not the screen's: stacked below 36rem, preview beside the controls from there. Size it with `className` (it fills its parent up to `max-w-2xl`).

## Dark mode

The line art is black on white faces, so the default `tint` background stays light in both themes. Use `background="none"` only on light surfaces.

## API Reference

### GeneratedAvatar

A seeded illustrated avatar inside the library's `Avatar` frame. Children (e.g. `AvatarStatus`) render on top. Also accepts every prop of `Avatar`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `seed` (required) | `string` | — | Any stable string. |
| `gender` | `"male" \| "female" \| "any"` | `"any"` | Which hairstyles the seed picks from. `female` has 22 (long hair, bobs, buns, ponytails, headscarves) and never a beard; `male` has 35 short cuts and allows a beard; `any` uses all 64. |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl" \| number` | `"md"` | An Avatar size or a pixel size. Inside an `AvatarGroup` it follows the group. |
| `shape` | `"circle" \| "rounded"` | `"circle"` | Passed to `Avatar`. |
| `accessories` | `boolean` | `false` | Let the seed add glasses (about one in three). |
| `background` | `"tint" \| "circle" \| "none" \| string` | `"tint"` | `tint` is a light grey square, `circle` the same tint as a disc, `none` transparent, or pass a hex colour. |
| `selections` | `{ hair?, eyes?, brows?, lips?, nose?, glasses?, beard?, body?, gesture?: string }` | — | Explicit part per slot by name (`{ hair: "variant46", glasses: "none" }`). Overrides the seed; the Parts note lists the names. |
| `colors` | `{ background?: string }` | — | Hex colour for the background tint. |
| `idPrefix` | `string` | — | Prefix for ids inside the SVG. Defaults to one from `useId` (a hash of the options in `createGeneratedAvatar`). |
| `title` | `string` | — | Accessible name. Without it the avatar is decorative. |

### GeneratedAvatarImage

The drawing alone as an `<svg>` that fills its box. Same options as `GeneratedAvatar` minus size and shape. Also accepts every prop of `svg`.

### createGeneratedAvatar

Framework-free builder. Returns `{ selections, viewBox, content, toString(size?), toDataUri(size?) }`; `selections` is the part each slot ended up with (`"none"` for an empty optional slot).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `options` (required) | `GeneratedAvatarOptions` | — | Same options as `GeneratedAvatar` (seed, gender, accessories, background, selections, colors). |

### getAvatarParts

The parts a slot offers for a gender, for building your own pickers. Only hair differs by gender (and beard is empty for `female`); glasses, beard and gesture start with `none`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `slot` (required) | `"hair" \| "eyes" \| "brows" \| "lips" \| "nose" \| "glasses" \| "beard" \| "body" \| "gesture"` | — | Returns `{ name, label, gender? }[]`. |
| `gender` | `"male" \| "female" \| "any"` | `"any"` |  |

### AvatarGenerator

The editor UI. Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `defaultSeed` | `string` | `"paneui"` | Initial seed. |
| `defaultGender` | `"male" \| "female" \| "any"` | `"any"` | Initial gender. |
| `onValueChange` | `(state: { seed, gender, selections, accessories }) => void` | — | Called on every change; store it to redraw the same avatar with `GeneratedAvatar`. |
