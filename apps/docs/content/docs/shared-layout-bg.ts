import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Hover highlight that follows the pointer across a group.", "zh": "让高亮跟随指针移动。"},
  usage: {
    imports: `import { SharedLayoutBg, SharedLayoutBgItem } from "@/components/ui/shared-layout-bg"`,
    code: `<SharedLayoutBg>
  <SharedLayoutBgItem render={<a href="/overview" />}>Overview</SharedLayoutBgItem>
  <SharedLayoutBgItem render={<a href="/settings" />}>Settings</SharedLayoutBgItem>
</SharedLayoutBg>`,
  },
  composition: `SharedLayoutBg
└── SharedLayoutBgItem`,
  examples: [
    {
      id: "horizontal",
      title: { en: "Horizontal", zh: "横向" },
      description: { en: "Use for nav bars laid out in a row.", zh: "适用于横向导航栏。" },
    },
    {
      id: "pill-style",
      title: { en: "Pill Style", zh: "胶囊样式" },
      description: { en: "Use when the highlight should match a different surface or reach past each item.", zh: "适用于需要调整高亮范围或底色的场景。" },
    },
    {
      id: "disabled",
      title: { en: "Disabled", zh: "禁用" },
    },
  ],
  notes: [
    {
      title: "Motion",
      body: { en: "With reduced motion the pill jumps between items and only fades.", zh: "在减少动态效果下，胶囊在项之间跳转，仅淡入淡出。" },
    },
    {
      title: "Keyboard",
      body: { en: "The highlight follows focus as well as hover, so tabbing through links moves it. It only adds the highlight; give items real roles and focusability (links, buttons).", zh: "高亮既跟随焦点也跟随悬停，因此用 Tab 切换链接时会移动。它仅添加高亮；请为项提供真实的角色和可聚焦性（链接、按钮）。" },
    },
  ],
  api: [
    {
      name: "SharedLayoutBg",
      description: { en: "The group that owns the shared highlight.", zh: "拥有共享高亮的分组。" },
      extends: "div",
      props: [
        {
          name: "orientation",
          type: `"vertical" | "horizontal"`,
          default: `"vertical"`,
          description: { en: "Stack items in a column or a row.", zh: "将项堆叠为列或行。" },
        },
        {
          name: "pillClassName",
          type: "string",
          description: { en: "Classes for the gliding pill (colour, radius, shadow). Defaults to `rounded-xl bg-secondary shadow-raised`.", zh: "滑行胶囊的 class（颜色、圆角、阴影）。默认为 `rounded-xl bg-secondary shadow-raised`。" },
        },
        { name: "inset", type: "number", default: "0", description: { en: "How far (px) the pill reaches past each item horizontally.", zh: "胶囊在水平方向上超出每个项的像素距离。" } },
      ],
      dataAttributes: [{ name: "data-orientation", description: { en: "`vertical` or `horizontal`.", zh: "`vertical` 或 `horizontal`。" } }],
    },
    {
      name: "SharedLayoutBgItem",
      description: { en: "One item. Renders a `div` unless you pass `render`.", zh: "一个项。除非传入 `render`，否则渲染 `div`。" },
      extends: "div",
      props: [
        {
          name: "render",
          type: "ReactElement | (props, state) => ReactElement",
          description: { en: "Replace the rendered element, e.g. `<a />` or `<button />`.", zh: "替换渲染的元素，例如 `<a />` 或 `<button />`。" },
        },
        { name: "disabled", type: "boolean", default: "false", description: { en: "Dim the item, skip it for the pointer and keep the highlight off it.", zh: "使项变暗，跳过指针交互并保持高亮远离它。" } },
      ],
      dataAttributes: [{ name: "data-active", description: { en: "Present while the item holds the highlight.", zh: "当项持有高亮时存在。" } }],
    },
  ],
} satisfies ComponentDoc
