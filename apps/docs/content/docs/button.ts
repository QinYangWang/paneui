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
  ],
  api: [
    {
      name: "Button",
      extends: "Button",
      extendsHref: "https://base-ui.com/react/components/button#api-reference",
      props: [
        {
          name: "variant",
          type: `"default" | "secondary" | "outline" | "ghost" | "destructive" | "link"`,
          default: `"default"`,
          description: "Visual style.",
        },
        {
          name: "size",
          type: `"default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"`,
          default: `"default"`,
          description: "Height and padding. `xs` is 24px, `sm` 28px, `default` 32px and `lg` 36px, all with a 10px radius except `xs` at 6px. `icon*` sizes are square.",
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
      name: "buttonVariants",
      description: "The `cva` function behind `Button`, for styling other elements like a button.",
      props: [
        { name: "variant", type: "same as Button", description: "" },
        { name: "size", type: "same as Button", description: "" },
        { name: "className", type: "string", description: "Merged last." },
      ],
    },
  ],
} satisfies ComponentDoc
