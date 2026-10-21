import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Triggers an action or submits a form.", "zh": "触发操作或提交表单。"},
  baseUi: {
    name: "Button",
    href: "https://base-ui.com/react/components/button",
  },
  usage: {
    imports: `import { Button } from "@/components/ui/button"`,
    code: `<Button variant="secondary">Button</Button>`,
  },
  examples: [
    {
      id: "variants",
      title: { en: "Variants", zh: "样式" },
    },
    {
      id: "sizes",
      title: { en: "Sizes", zh: "尺寸" },
    },
    {
      id: "with-icon",
      title: { en: "With icon", zh: "带图标" },
    },
    {
      id: "icon",
      title: { en: "Icon", zh: "图标" },
    },
    { id: "disabled", title: { en: "Disabled", zh: "禁用" } },
    {
      id: "as-link",
      title: { en: "As link", zh: "用作链接" },
    },
    {
      id: "pill",
      title: { en: "Pill", zh: "胶囊" },
      description: { en: "Use pills for calls to action on landing pages and pictures.", zh: "用于落地页和图片上的行动按钮。" },
    },
    {
      id: "arrow",
      title: { en: "With arrow", zh: "带箭头" },
      description: { en: "Use when the button takes the reader somewhere else.", zh: "用于跳转到其他页面的按钮。" },
    },
  ],
  api: [
    {
      name: "Button",
      extends: "Button",
      extendsHref: "https://base-ui.com/react/components/button#api-reference",
      props: [
        {
          name: "variant",
          type: `"default" | "secondary" | "outline" | "ghost" | "destructive" | "link" | "inverse" | "glass"`,
          default: `"default"`,
          description: "Visual style. `inverse` is a foreground-coloured fill; `glass` is a translucent card that lets a picture behind it through.",
        },
        {
          name: "size",
          type: `"default" | "xs" | "sm" | "lg" | "xl" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"`,
          default: `"default"`,
          description: "Height and padding. `xs` is 24px, `sm` 28px, `default` 32px, `lg` 36px and `xl` 44px (hero calls to action). Corners follow `--radius-control`, half of it at `xs`. `icon*` sizes are square.",
        },
        {
          name: "shape",
          type: `"default" | "pill"`,
          default: `"default"`,
          description: "`pill` rounds the ends fully. A `lg` pill keeps a 13px label and 16px padding; an `xl` pill widens to 24px padding from the `sm` breakpoint.",
        },
        {
          name: "render",
          type: "ReactElement | (props, state) => ReactElement",
          description: "Replace the rendered element, e.g. `<a />` or a router `Link`.",
        },
        {
          name: "nativeButton",
          type: "boolean",
          default: "true",
          description: "Set to `false` when `render` is not a `<button>` so keyboard and ARIA behaviour is added.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disables interaction and dims the button.",
        },
      ],
    },
    {
      name: "ButtonArrow",
      description: "Trailing arrow for a link button. It moves 2px toward the destination on hover (not under reduced motion) and mirrors in right-to-left layouts.",
      props: [
        { name: "external", type: "boolean", default: "false", description: "Shows the leave-the-site glyph instead, which stays still." },
        { name: "className", type: "string", description: "Merged last." },
      ],
    },
    {
      name: "buttonVariants",
      description: "The `cva` function behind `Button`, for styling other elements like a button.",
      props: [
        { name: "variant", type: "same as Button", description: "" },
        { name: "size", type: "same as Button", description: "" },
        { name: "shape", type: "same as Button", description: "" },
        { name: "className", type: "string", description: "Merged last." },
      ],
    },
  ],
} satisfies ComponentDoc
