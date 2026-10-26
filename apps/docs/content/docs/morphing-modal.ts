import type { ComponentDoc } from "@/lib/doc-types"

const BASE = "https://base-ui.com/react/components/dialog"

export default {
  summary: {"en": "Dialog that moves between several views inside one panel.", "zh": "在同一对话框中切换视图。"},
  baseUi: { name: "Dialog", href: BASE },
  usage: {
    imports: `import { MorphingModal, MorphingModalContent, MorphingModalLink, MorphingModalTitle, MorphingModalTrigger, MorphingModalView } from "@/components/ui/morphing-modal"`,
    code: `<MorphingModal>
  <MorphingModalTrigger>Share</MorphingModalTrigger>
  <MorphingModalContent>
    <MorphingModalView name="main">
      <MorphingModalTitle>Share</MorphingModalTitle>
      <MorphingModalLink to="link">Get a link</MorphingModalLink>
    </MorphingModalView>
    <MorphingModalView name="link">
      <MorphingModalTitle>Share link</MorphingModalTitle>
    </MorphingModalView>
  </MorphingModalContent>
</MorphingModal>`,
  },
  composition: `MorphingModal
├── MorphingModalTrigger
└── MorphingModalContent
    └── MorphingModalView
        ├── MorphingModalHeader
        │   ├── MorphingModalBack (automatic)
        │   ├── MorphingModalTitle
        │   └── MorphingModalDescription
        ├── MorphingModalLink
        └── MorphingModalFooter
            └── MorphingModalClose`,
  examples: [
    {
      id: "steps",
      title: { en: "Multi-step Flow", zh: "多步流程" },
    },
    {
      id: "view-change",
      title: { en: "Nested Settings", zh: "嵌套设置" },
    },
    {
      id: "no-close-button",
      title: { en: "Without Close Button", zh: "无关闭按钮" },
      description: { en: "Use for confirmations that should end with an explicit choice.", zh: "适用于必须明确作出选择的确认流程。" },
    },
  ],
  notes: [
    {
      title: "Motion",
      body: { en: "The panel springs to each view's height while views slide 28px and blur in the direction of travel. With reduced motion the height snaps and views cross-fade in 150ms.", zh: "面板以弹簧动画过渡到各视图的高度，同时视图沿切换方向滑动 28px 并模糊淡入。启用减少动态效果时，高度直接跳变，视图以 150ms 交叉淡入。" },
    },
    {
      title: "Accessibility",
      body: { en: "After navigating, focus moves to the first focusable control in the new view (or the view itself). Closing resets to the first view once the exit finishes.", zh: "导航后，焦点移到新视图中第一个可聚焦控件（或视图本身）。关闭动画结束后重置回第一个视图。" },
    },
    {
      title: "Related",
      body: { en: "See also [Select Morph](/docs/select-morph), [Popover Morph](/docs/popover-morph), [Morphing Search](/docs/morphing-search) and [Morphing Tabs](/docs/morphing-tabs).", zh: "另见 [Select Morph](/docs/select-morph)、[Popover Morph](/docs/popover-morph)、[Morphing Search](/docs/morphing-search) 和 [Morphing Tabs](/docs/morphing-tabs)。" },
    },
  ],
  api: [
    {
      name: "MorphingModal",
      description: { en: "Dialog root that also holds the view stack.", zh: "Dialog 根节点，同时持有视图栈。" },
      extends: "Dialog.Root",
      extendsHref: `${BASE}#root`,
      props: [
        { name: "defaultView", type: "string", default: `"main"`, description: { en: "The view shown when the modal opens.", zh: "模态框打开时显示的视图。" } },
        { name: "onViewChange", type: "(view: string) => void", description: { en: "Called once with the new view whenever it changes, including the reset to `defaultView` when the modal finishes closing.", zh: "视图变化时调用一次，传入新视图；模态框关闭结束时重置为 `defaultView` 也会调用。" } },
      ],
    },
    {
      name: "MorphingModalTrigger",
      description: { en: "`Dialog.Trigger`, re-exported unchanged.", zh: "`Dialog.Trigger`，原样重新导出。" },
      extends: "Dialog.Trigger",
      extendsHref: `${BASE}#trigger`,
      props: [],
    },
    {
      name: "MorphingModalContent",
      description: { en: "Backdrop and centred popup (max 384px wide). Renders the active `MorphingModalView` child; other children render after it.", zh: "背景遮罩和居中弹窗（最大宽度 384px）。渲染当前的 `MorphingModalView` 子元素；其他子元素在其后渲染。" },
      extends: "Dialog.Popup",
      extendsHref: `${BASE}#popup`,
      props: [
        { name: "showCloseButton", type: "boolean", default: "true", description: { en: "Show the round × in the top-right corner.", zh: "在右上角显示圆形 ×。" } },
      ],
    },
    {
      name: "MorphingModalView",
      description: { en: "One screen of the modal. Must be a direct child of `MorphingModalContent`.", zh: "模态框的一个屏幕。必须是 `MorphingModalContent` 的直接子元素。" },
      extends: "div",
      props: [{ name: "name", type: "string", required: true, description: { en: "Identifier other parts navigate to.", zh: "其他部分导航到的标识符。" } }],
      dataAttributes: [{ name: "data-view", description: { en: "The view's `name`.", zh: "视图的 `name`。" } }],
    },
    {
      name: "MorphingModalHeader",
      description: { en: "Title block; shows `MorphingModalBack` automatically when there is a view to go back to.", zh: "标题块；当有可返回的视图时自动显示 `MorphingModalBack`。" },
      extends: "div",
      props: [],
    },
    { name: "MorphingModalTitle", extends: "Dialog.Title", extendsHref: `${BASE}#title`, props: [] },
    { name: "MorphingModalDescription", extends: "Dialog.Description", extendsHref: `${BASE}#description`, props: [] },
    {
      name: "MorphingModalLink",
      description: { en: "A full-width row button that pushes another view.", zh: "全宽行按钮，用于推入另一个视图。" },
      extends: "button",
      props: [{ name: "to", type: "string", required: true, description: { en: "Name of the view to open.", zh: "要打开的视图名称。" } }],
    },
    {
      name: "MorphingModalBack",
      description: { en: "Round back chevron labelled `Back`. Renders nothing on the first view.", zh: "圆形返回 chevron，标签为 `Back`。在第一个视图上不渲染。" },
      extends: "button",
      props: [],
    },
    { name: "MorphingModalFooter", description: { en: "Right-aligned row of actions.", zh: "右对齐的操作行。" }, extends: "div", props: [] },
    { name: "MorphingModalClose", description: { en: "`Dialog.Close`, re-exported unchanged.", zh: "`Dialog.Close`，原样重新导出。" }, extends: "Dialog.Close", extendsHref: `${BASE}#close`, props: [] },
    {
      name: "useMorphingModal",
      description: { en: "Navigation state for custom controls. Use inside `MorphingModal`.", zh: "供自定义控件使用的导航状态。在 `MorphingModal` 内使用。" },
      props: [
        { name: "view", type: "string", description: { en: "The active view.", zh: "当前视图。" } },
        { name: "canGoBack", type: "boolean", description: { en: "Whether there is a previous view.", zh: "是否存在上一个视图。" } },
        { name: "direction", type: "1 | -1", description: { en: "Direction of the last navigation.", zh: "上次导航的方向。" } },
        { name: "push", type: "(view: string) => void", description: { en: "Go to a view (pushes it onto the back stack).", zh: "跳转到某个视图（将其推入返回栈）。" } },
        { name: "back", type: "() => void", description: { en: "Return to the previous view.", zh: "返回上一个视图。" } },
        { name: "reset", type: "() => void", description: { en: "Jump back to the first view and clear the stack (calls `onViewChange` if the view changes).", zh: "跳回第一个视图并清空栈（视图变化时调用 `onViewChange`）。" } },
      ],
    },
  ],
} satisfies ComponentDoc
