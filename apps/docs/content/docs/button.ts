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
          description: { en: "Visual style. `inverse` is a foreground-coloured fill; `glass` is a translucent card that lets a picture behind it through.", zh: "视觉样式。`inverse` 是前景色填充；`glass` 是半透明卡片，可透出背后的图片。" },
        },
        {
          name: "size",
          type: `"default" | "xs" | "sm" | "lg" | "xl" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"`,
          default: `"default"`,
          description: { en: "Height and padding. `xs` is 24px, `sm` 28px, `default` 32px, `lg` 36px and `xl` 44px (hero calls to action). Corners follow `--radius-control`, half of it at `xs`. `icon*` sizes are square.", zh: "高度和内边距。`xs` 为 24px，`sm` 为 28px，`default` 为 32px，`lg` 为 36px，`xl` 为 44px（主视觉行动号召）。圆角遵循 `--radius-control`，`xs` 时为其一半。`icon*` 尺寸为正方形。" },
        },
        {
          name: "shape",
          type: `"default" | "pill"`,
          default: `"default"`,
          description: { en: "`pill` rounds the ends fully. A `lg` pill keeps a 13px label and 16px padding; an `xl` pill widens to 24px padding from the `sm` breakpoint.", zh: "`pill` 将两端完全圆角化。`lg` 的 pill 保留 13px 标签和 16px 内边距；`xl` 的 pill 从 `sm` 断点起加宽到 24px 内边距。" },
        },
        {
          name: "render",
          type: "ReactElement | (props, state) => ReactElement",
          description: { en: "Replace the rendered element, e.g. `<a />` or a router `Link`.", zh: "替换渲染的元素，例如 `<a />` 或路由器的 `Link`。" },
        },
        {
          name: "nativeButton",
          type: "boolean",
          default: "true",
          description: { en: "Set to `false` when `render` is not a `<button>` so keyboard and ARIA behaviour is added.", zh: "当 `render` 不是 `<button>` 时设置为 `false`，以便添加键盘和 ARIA 行为。" },
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: { en: "Disables interaction and dims the button.", zh: "禁用交互并使按钮变暗。" },
        },
      ],
    },
    {
      name: "ButtonArrow",
      description: { en: "Trailing arrow for a link button. It moves 2px toward the destination on hover (not under reduced motion) and mirrors in right-to-left layouts.", zh: "链接按钮的尾随箭头。悬停时向目标方向移动 2px（减少动态效果下不移动），并在从右到左布局中镜像。" },
      props: [
        { name: "external", type: "boolean", default: "false", description: { en: "Shows the leave-the-site glyph instead, which stays still.", zh: "改为显示离开站点字形，该字形保持静止。" } },
        { name: "className", type: "string", description: { en: "Merged last.", zh: "最后合并。" } },
      ],
    },
    {
      name: "buttonVariants",
      description: { en: "The `cva` function behind `Button`, for styling other elements like a button.", zh: "`Button` 背后的 `cva` 函数，用于为其他元素（如按钮）设置样式。" },
      props: [
        { name: "variant", type: "same as Button", description: "" },
        { name: "size", type: "same as Button", description: "" },
        { name: "shape", type: "same as Button", description: "" },
        { name: "className", type: "string", description: { en: "Merged last.", zh: "最后合并。" } },
      ],
    },
  ],
} satisfies ComponentDoc
