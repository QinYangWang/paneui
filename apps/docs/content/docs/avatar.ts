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
      body: { en: "Always give `AvatarImage` an `alt`. When the person's name is printed next to the avatar, an empty `alt` is fine. A status dot is decorative unless you pass `label`.", zh: "始终为 `AvatarImage` 提供 `alt`。当人名打印在头像旁边时，空的 `alt` 即可。状态点除非传递 `label`，否则为装饰性。" },
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
          description: { en: "Box size and fallback text size, from 20px at `xs` through 24, 32 and 40px to 48px at `xl`; `default` is the same as `md`. Inside an `AvatarGroup` it defaults to the group's size.", zh: "头像尺寸与回退文字大小，从 `xs` 的 20px 到 `xl` 的 48px，中间依次为 24、32、40px；`default` 与 `md` 相同。在 `AvatarGroup` 内时默认使用组的尺寸。" },
        },
        {
          name: "shape",
          type: `"circle" | "rounded"`,
          default: `"circle"`,
          description: { en: "Round, or a squircle whose radius scales with the size (6–14px).", zh: "圆形，或半径随尺寸缩放的圆角方形（6–14px）。" },
        },
      ],
      dataAttributes: [
        { name: "data-size", description: { en: "The resolved size.", zh: "解析后的尺寸。" } },
        { name: "data-shape", description: { en: "The resolved shape.", zh: "解析后的形状。" } },
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
      description: { en: "Initials or an icon. Shows while the image loads and stays if it fails.", zh: "首字母或图标。在图片加载时显示，如果失败则保留。" },
      extends: "Avatar.Fallback",
      extendsHref: "https://base-ui.com/react/components/avatar#fallback",
      props: [
        { name: "delay", type: "number", description: { en: "Milliseconds to wait before showing the fallback.", zh: "显示回退前等待的毫秒数。" } },
      ],
    },
    {
      name: "AvatarStatus",
      description: { en: "Presence dot at the bottom-right, sized from the avatar.", zh: "右下角的存在状态点，尺寸来自头像。" },
      extends: "span",
      props: [
        {
          name: "status",
          type: `"online" | "away" | "busy" | "offline"`,
          default: `"online"`,
          description: { en: "Presence state; sets the dot to the success, warning, destructive or muted token, in that order.", zh: "存在状态；按顺序将点设置为 success、warning、destructive 或 muted 变量。" },
        },
        { name: "label", type: "string", description: { en: "Accessible name (e.g. \"Online\"). Without it the dot is hidden from screen readers.", zh: "可访问名称（例如 \"Online\"）。没有它，点对屏幕阅读器隐藏。" } },
      ],
    },
    {
      name: "AvatarGroup",
      description: { en: "Overlapping stack with a `background` ring around each avatar.", zh: "重叠堆叠，每个头像周围有 `background` 环。" },
      extends: "div",
      props: [
        { name: "size", type: `"xs" | "sm" | "md" | "default" | "lg" | "xl"`, default: `"md"`, description: { en: "Default size for every avatar inside, and the overlap.", zh: "内部每个头像的默认尺寸，以及重叠量。" } },
        { name: "shape", type: `"circle" | "rounded"`, default: `"circle"`, description: { en: "Default shape for every avatar inside.", zh: "内部每个头像的默认形状。" } },
      ],
    },
    {
      name: "AvatarGroupCount",
      description: { en: "The \"+N\" tile at the end of a group.", zh: "组末尾的“+N”块。" },
      extends: "Avatar",
      props: [],
    },
  ],
} satisfies ComponentDoc
