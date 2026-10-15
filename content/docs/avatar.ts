import type { ComponentDoc } from "@/lib/doc-types"

export default {
  baseUi: { name: "Avatar", href: "https://base-ui.com/react/components/avatar" },
  usage: {
    imports: `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"`,
    code: `<Avatar>
  <AvatarImage src="https://github.com/QinYangWang.png" alt="Qinyang" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`,
  },
  composition: `AvatarGroup
├── Avatar
│   ├── AvatarImage
│   ├── AvatarFallback
│   └── AvatarStatus
└── AvatarGroupCount`,
  examples: [
    {
      id: "basic",
      title: "Basic",
      description: "An image with an initials fallback. The fallback shows while the image loads and stays if it fails.",
    },
    {
      id: "sizes",
      title: "Sizes and Shapes",
      description:
        "`xs` 20 · `sm` 24 · `md` 32 · `lg` 40 · `xl` 48px. `shape=\"rounded\"` is a squircle whose radius scales with the size (6–14px).",
    },
    {
      id: "fallback",
      title: "Fallback",
      description:
        "Initials, an icon, or a [generated avatar](/docs/avatar-generator) when the photo is missing. `delay` holds the fallback back so fast loads don't flash.",
    },
    {
      id: "status",
      title: "Status",
      description: "`AvatarStatus` adds a presence dot cut out of the page with a `background` ring; give it a `label` for screen readers.",
    },
    {
      id: "group",
      title: "Group",
      description: "`AvatarGroup` overlaps its avatars and sets their `size` and `shape`; end with `AvatarGroupCount` for the overflow.",
    },
  ],
  notes: [
    {
      title: "Accessibility",
      body: "Always give `AvatarImage` an `alt`. When the person's name is printed next to the avatar, an empty `alt` is fine. A status dot is decorative unless you pass `label`.",
    },
  ],
  api: [
    {
      name: "Avatar",
      extends: "Avatar.Root",
      extendsHref: "https://base-ui.com/react/components/avatar#root",
      props: [
        {
          name: "size",
          type: `"xs" | "sm" | "md" | "lg" | "xl"`,
          default: `"md"`,
          description: "Box size and fallback text size. Inside an `AvatarGroup` it defaults to the group's size.",
        },
        {
          name: "shape",
          type: `"circle" | "rounded"`,
          default: `"circle"`,
          description: "Round, or a squircle with a size-matched radius.",
        },
      ],
      dataAttributes: [
        { name: "data-size", description: "The resolved size." },
        { name: "data-shape", description: "The resolved shape." },
      ],
    },
    {
      name: "AvatarImage",
      extends: "Avatar.Image",
      extendsHref: "https://base-ui.com/react/components/avatar#image",
      props: [],
    },
    {
      name: "AvatarFallback",
      extends: "Avatar.Fallback",
      extendsHref: "https://base-ui.com/react/components/avatar#fallback",
      props: [
        { name: "delay", type: "number", description: "Milliseconds to wait before showing the fallback." },
      ],
    },
    {
      name: "AvatarStatus",
      description: "Presence dot at the bottom-right, sized from the avatar.",
      extends: "span",
      props: [
        {
          name: "status",
          type: `"online" | "away" | "busy" | "offline"`,
          default: `"online"`,
          description: "Colour: success, warning, destructive, muted.",
        },
        { name: "label", type: "string", description: "Accessible name (e.g. \"Online\"). Without it the dot is hidden from screen readers." },
      ],
    },
    {
      name: "AvatarGroup",
      description: "Overlapping stack with a `background` ring around each avatar.",
      extends: "div",
      props: [
        { name: "size", type: `"xs" | "sm" | "md" | "lg" | "xl"`, default: `"md"`, description: "Default size for every avatar inside, and the overlap." },
        { name: "shape", type: `"circle" | "rounded"`, default: `"circle"`, description: "Default shape for every avatar inside." },
      ],
    },
    {
      name: "AvatarGroupCount",
      description: "The \"+N\" tile at the end of a group.",
      extends: "Avatar",
      props: [],
    },
  ],
} satisfies ComponentDoc
