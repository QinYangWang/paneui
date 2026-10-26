import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Split panes the user can resize or collapse.", "zh": "调整或收起分栏。"},
  usage: {
    imports: `import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"`,
    code: `<ResizablePanelGroup direction="horizontal" autoSaveId="workspace">
  <ResizablePanel id="sidebar" defaultSize="240px" minSize="200px" collapsible>…</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel id="main">…</ResizablePanel>
</ResizablePanelGroup>`,
  },
  composition: `ResizablePanelGroup
├── ResizablePanel
├── ResizableHandle
└── ResizablePanel`,
  examples: [
    { id: "collapsible", title: { en: "Collapsible", zh: "可收起" }, description: { en: "Use for sidebars that can be dragged shut or toggled from a button.", zh: "适用于可拖动收起或用按钮切换的侧栏。" } },
    { id: "with-handle", title: { en: "With Handle", zh: "带拖动柄" }, description: { en: "Use where the divider is easy to miss.", zh: "适用于分隔线不易察觉的场景。" } },
  ],
  notes: [
    { title: "Sizes", body: { en: "Sizes are percentages of the group, or pixel strings like `\"240px\"` for `defaultSize`, `minSize`, `maxSize` and `collapsedSize` (converted with the group's current size). Panels without `defaultSize` share what is left.", zh: "尺寸是组的百分比，或 `defaultSize`、`minSize`、`maxSize` 和 `collapsedSize` 的像素字符串如 `\"240px\"`（按组当前尺寸换算）。没有 `defaultSize` 的面板平分剩余空间。" } },
    { title: "Persistence", body: { en: "`autoSaveId` stores sizes and collapsed state in `localStorage[\"resizable:<id>\"]` when a drag, key press or collapse settles. The saved layout is used only while the set of panel ids is unchanged.", zh: "当拖动、按键或折叠结束时，`autoSaveId` 将尺寸和折叠状态存入 `localStorage[\"resizable:<id>\"]`。保存的布局仅在面板 id 集合不变时使用。" } },
    { title: "Keyboard", body: { en: "The divider is a focusable `separator`. Arrow keys move it 2% (10% with Shift), Enter collapses or expands the collapsible neighbour, double click resets every panel to its default.", zh: "分隔条是一个可聚焦的 `separator`。方向键移动它 2%（按住 Shift 为 10%），Enter 折叠或展开可折叠的相邻面板，双击将所有面板重置为默认值。" } },
    { title: "Motion", body: { en: "Panels follow the pointer exactly while dragging; collapse and expand ease `flex-grow` over 200ms, instant with reduced motion. The primary guide on the divider appears after a 150ms hover.", zh: "拖动时面板精确跟随指针；折叠和展开在 200ms 内缓动 `flex-grow`，开启减少动态效果时即时完成。分隔条上的主引导线在悬停 150ms 后出现。" } },
  ],
  api: [
    {
      name: "ResizablePanelGroup",
      description: { en: "Flex container that owns the sizes.", zh: "掌握尺寸的 Flex 容器。" },
      extends: "div",
      props: [
        { name: "direction", type: `"horizontal" | "vertical"`, default: `"horizontal"`, description: { en: "Lay panels out in a row or a column.", zh: "将面板按行或列排列。" } },
        { name: "autoSaveId", type: "string", description: { en: "Persist the layout under this key.", zh: "在此键下持久化布局。" } },
        { name: "onLayout", type: "(sizes: number[]) => void", description: { en: "Called with percentages whenever the layout settles.", zh: "布局稳定时以百分比调用。" } },
        { name: "handleRef", type: "Ref<ResizablePanelGroupHandle>", description: { en: "Imperative handle with `collapse(id)`, `expand(id)`, `toggle(id)`, `isCollapsed(id)`, `getSizes()`, `setSizes(sizes)` and `reset()`.", zh: "命令式句柄，包含 `collapse(id)`、`expand(id)`、`toggle(id)`、`isCollapsed(id)`、`getSizes()`、`setSizes(sizes)` 和 `reset()`。" } },
      ],
      dataAttributes: [{ name: "data-dragging", description: { en: "Present while a divider is dragged.", zh: "拖动分隔条时存在。" } }],
    },
    {
      name: "ResizablePanel",
      extends: "div",
      props: [
        { name: "id", type: "string", description: { en: "Stable id for the imperative API and saved layouts.", zh: "供命令式 API 和保存布局使用的稳定 id。" } },
        { name: "defaultSize", type: "number | `${number}px`", description: { en: "Initial size.", zh: "初始尺寸。" } },
        { name: "minSize", type: "number | `${number}px`", default: "0", description: { en: "Smallest size while dragging.", zh: "拖动时的最小尺寸。" } },
        { name: "maxSize", type: "number | `${number}px`", default: "100", description: { en: "Largest size while dragging.", zh: "拖动时的最大尺寸。" } },
        { name: "collapsible", type: "boolean", default: "false", description: { en: "Snap to `collapsedSize` when dragged past half of `minSize`.", zh: "拖动超过 `minSize` 的一半时吸附到 `collapsedSize`。" } },
        { name: "collapsedSize", type: "number | `${number}px`", default: "0", description: { en: "Size when collapsed.", zh: "折叠时的尺寸。" } },
        { name: "onCollapsedChange", type: "(collapsed: boolean) => void", description: { en: "Called when the panel collapses or expands.", zh: "面板折叠或展开时调用。" } },
      ],
      dataAttributes: [{ name: "data-collapsed", description: { en: "Present while collapsed.", zh: "折叠时存在。" } }],
    },
    {
      name: "ResizableHandle",
      extends: "div",
      props: [
        { name: "variant", type: `"line" | "hidden"`, default: `"line"`, description: { en: "`hidden` drops the resting hairline; the guide still shows on hover and drag.", zh: "`hidden` 去掉静止时的细线；悬停和拖动时引导线仍会显示。" } },
        { name: "withHandle", type: "boolean", default: "false", description: { en: "Show a grip in the middle.", zh: "在中间显示握把。" } },
        { name: "keyboardStep", type: "number", default: "2", description: { en: "Percent per arrow key press.", zh: "每次按方向键移动的百分比。" } },
      ],
      dataAttributes: [{ name: "data-active", description: { en: "Present while this divider is dragged.", zh: "拖动此分隔条时存在。" } }],
    },
  ],
} satisfies ComponentDoc
