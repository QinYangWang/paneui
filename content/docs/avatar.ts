import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Shows a photo or initials.", "zh": "显示用户照片或姓名缩写。"},
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
      title: { en: "Basic", zh: "基础" },
    },
    {
      id: "sizes",
      title: { en: "Sizes and Shapes", zh: "尺寸与形状" },
    },
    {
      id: "fallback",
      title: { en: "Fallback", zh: "备用内容" },
    },
    {
      id: "status",
      title: { en: "Status", zh: "状态" },
    },
    {
      id: "group",
      title: { en: "Group", zh: "分组" },
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
          type: `"xs" | "sm" | "md" | "default" | "lg" | "xl"`,
          default: `"md"`,
          description: "Box size and fallback text size, from 20px at `xs` through 24, 32 and 40px to 48px at `xl`; `default` is the same as `md`. Inside an `AvatarGroup` it defaults to the group's size.",
        },
        {
          name: "shape",
          type: `"circle" | "rounded"`,
          default: `"circle"`,
          description: "Round, or a squircle whose radius scales with the size (6–14px).",
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
      description: "Initials or an icon. Shows while the image loads and stays if it fails.",
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
          description: "Presence state; sets the dot to the success, warning, destructive or muted token, in that order.",
        },
        { name: "label", type: "string", description: "Accessible name (e.g. \"Online\"). Without it the dot is hidden from screen readers." },
      ],
    },
    {
      name: "AvatarGroup",
      description: "Overlapping stack with a `background` ring around each avatar.",
      extends: "div",
      props: [
        { name: "size", type: `"xs" | "sm" | "md" | "default" | "lg" | "xl"`, default: `"md"`, description: "Default size for every avatar inside, and the overlap." },
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
