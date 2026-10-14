import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { GeneratedAvatar } from "@/components/ui/generated-avatar"
import { AvatarGenerator } from "@/components/ui/avatar-generator"`,
    code: `<GeneratedAvatar seed={user.id} gender="female" size="lg" title={user.name} />`,
  },
  composition: `GeneratedAvatar        Avatar frame + drawing
GeneratedAvatarImage   bare <svg>, e.g. inside AvatarFallback
createGeneratedAvatar  no React: SVG string, data URI, resolved parts
AvatarGenerator        editor: seed, gender, part pickers, download, copy`,
  examples: [
    {
      id: "by-seed",
      title: "From a Seed",
      description: "Pass anything stable (a user id, an email). The same seed always draws the same avatar, on the server or the client.",
    },
    {
      id: "gender",
      title: "Male and Female",
      description:
        "`gender` limits hair, tops and bottoms to one presentation; glasses and accessories are shared. `any` (the default) keeps Humation's own picks.",
    },
    {
      id: "options",
      title: "Options",
      description:
        "`accessories` lets the seed add a hat, cat or snack; `framing=\"body\"` shows the whole figure; `blush`, `background` and `selections` fine-tune the drawing.",
    },
    {
      id: "generator",
      title: "Generator",
      description:
        "`AvatarGenerator` is the editor: type or shuffle a seed, pick a gender and parts, then download the SVG or copy the JSX. `onValueChange` hands you the state to store.",
    },
  ],
  notes: [
    {
      title: "Artwork",
      body: "The parts are Humation's hand-drawn set ([humation.app](https://humation.app), MIT), installed from npm as `@humation/core` and `@humation/assets-humation-1`. Nothing is fetched at runtime. We add the Seline-style head crop and blushed cheeks, and the gender split (Humation's parts carry no gender tags).",
    },
    {
      title: "Storing an avatar",
      body: "Store the seed when the avatar can be regenerated from the user. When the user edits it, store `{ seed, gender, selections, accessories }` from `onValueChange`. Picks stay stable within an asset version; a new Humation release that adds parts can change seed-only picks, so pin explicit `selections` for avatars that must never change.",
    },
    {
      title: "Dark mode",
      body: "The default `tint` background stays light in both themes so black hair never disappears into a dark page. Use `background=\"transparent\"` only on light surfaces.",
    },
  ],
  api: [
    {
      name: "GeneratedAvatar",
      description: "A seeded avatar inside the library's `Avatar` frame. Children (e.g. `AvatarStatus`) render on top.",
      extends: "Avatar",
      props: [
        { name: "seed", type: "string", required: true, description: "Any stable string." },
        { name: "gender", type: `"male" | "female" | "any"`, default: `"any"`, description: "Which hair, tops and bottoms the seed picks from." },
        { name: "size", type: `"xs" | "sm" | "md" | "lg" | "xl" | number`, default: `"md"`, description: "An Avatar size or a pixel size. Inside an `AvatarGroup` it follows the group." },
        { name: "shape", type: `"circle" | "rounded"`, default: `"circle"`, description: "Passed to `Avatar`." },
        { name: "accessories", type: "boolean", default: "false", description: "Let the seed pick a head accessory. Off keeps the clean look." },
        { name: "blush", type: "boolean", default: "true", description: "Pink cheeks." },
        { name: "framing", type: `"head" | "body"`, default: `"head"`, description: "Head-and-shoulders crop, or the whole figure." },
        { name: "background", type: `"tint" | "transparent" | string`, default: `"tint"`, description: "Warm light grey, none, or a hex colour." },
        { name: "selections", type: `{ head?, body?, bottom?, item?, glasses?: string }`, description: "Explicit part per slot by name (`{ head: \"bun\" }`) or canonical id. Overrides the seed." },
        { name: "colors", type: `{ hair?, skin?, stroke?, clothes?, bottom?, background?: string }`, description: "Hex colours for the recolourable regions." },
        { name: "title", type: "string", description: "Accessible name. Without it the avatar is decorative." },
      ],
    },
    {
      name: "GeneratedAvatarImage",
      description: "The drawing alone as an `<svg>` that fills its box. Same options as `GeneratedAvatar` minus size and shape.",
      extends: "svg",
      props: [],
    },
    {
      name: "createGeneratedAvatar",
      description: "Framework-free builder. Returns `{ selections, viewBox, content, toString(size?), toDataUri(size?) }`.",
      props: [{ name: "options", type: "GeneratedAvatarOptions", required: true, description: "Same options as `GeneratedAvatar` (seed, gender, accessories, blush, framing, background, selections, colors)." }],
    },
    {
      name: "getAvatarParts",
      description: "The parts a slot offers for a gender, for building your own pickers.",
      props: [
        { name: "slot", type: `"head" | "body" | "bottom" | "item" | "glasses"`, required: true, description: "" },
        { name: "gender", type: `"male" | "female" | "any"`, default: `"any"`, description: "" },
      ],
    },
    {
      name: "AvatarGenerator",
      description: "The editor UI.",
      extends: "div",
      props: [
        { name: "defaultSeed", type: "string", default: `"qinyang"`, description: "Initial seed." },
        { name: "defaultGender", type: `"male" | "female" | "any"`, default: `"any"`, description: "Initial gender." },
        { name: "onValueChange", type: "(state: { seed, gender, selections, accessories }) => void", description: "Called on every change; store it to redraw the same avatar with `GeneratedAvatar`." },
      ],
    },
  ],
} satisfies ComponentDoc
