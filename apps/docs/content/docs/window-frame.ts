import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: { en: "Frames a piece of UI as a desktop app window.", zh: "把一段界面装进桌面应用窗口。" },
  usage: {
    imports: `import { WindowFrame, WindowFrameBar, WindowFrameBody, WindowFrameTitle } from "@/components/ui/window-frame"`,
    code: `<WindowFrame>
  <WindowFrameBar>
    <WindowFrameTitle>Northwind</WindowFrameTitle>
  </WindowFrameBar>
  <WindowFrameBody>…</WindowFrameBody>
</WindowFrame>`,
  },
  composition: `WindowFrame
├── WindowFrameBar
│   ├── WindowFrameControls (added for you)
│   ├── WindowFrameTitle
│   └── WindowFrameActions
└── WindowFrameBody`,
  examples: [
    { id: "glass", title: { en: "Glass", zh: "玻璃" }, description: { en: "Use over pictures and tinted sections.", zh: "用于图片或有底色的区块上。" } },
    { id: "centered-title", title: { en: "Centred title", zh: "居中标题" } },
    { id: "no-controls", title: { en: "Without controls", zh: "无窗口按钮" } },
  ],
  notes: [
    { title: "Corners", body: "The body is inset 6px and its corner is the frame's minus that inset, so the two stay concentric at every radius preset and in the Paper style." },
    { title: "Decoration only", body: "The window dots are hidden from assistive tech and do nothing. Put real controls in `WindowFrameActions`." },
  ],
  api: [
    {
      name: "WindowFrame",
      extends: "div",
      props: [
        { name: "variant", type: `"solid" | "glass"`, default: `"solid"`, description: "`glass` is a translucent, blurred shell for use over pictures." },
        { name: "size", type: `"sm" | "default"`, default: `"default"`, description: "Title bar height: 32px or 36px." },
      ],
      dataAttributes: [
        { name: "data-variant", description: "The variant." },
        { name: "data-size", description: "The size." },
      ],
    },
    { name: "WindowFrameBar", extends: "div", props: [{ name: "controls", type: "boolean", default: "true", description: "Starts the bar with the three window dots." }] },
    { name: "WindowFrameTitle", extends: "span", props: [{ name: "align", type: `"start" | "center"`, default: `"start"`, description: "`center` puts the title on a chip in the middle of the bar." }] },
    { name: "WindowFrameActions", description: "Pushed to the end of the bar.", extends: "span", props: [] },
    { name: "WindowFrameControls", description: "The three dots, for a custom bar.", extends: "span", props: [] },
    { name: "WindowFrameBody", description: "The content area. Give it a height or let its content size it.", extends: "div", props: [] },
  ],
} satisfies ComponentDoc
