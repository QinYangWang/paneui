import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Keeps content at a set ratio and animates ratio changes.", "zh": "保持内容的宽高比。"},
  usage: {
    imports: `import { AspectRatio } from "@/components/ui/aspect-ratio"`,
    code: `<AspectRatio ratio={16 / 9}>
  <div className="absolute inset-0 bg-muted" />
</AspectRatio>`,
  },
  composition: `AspectRatio
└── AspectRatioImage (optional)`,
  examples: [
    {
      id: "ratios",
      title: { en: "Ratios", zh: "宽高比" },
    },
    {
      id: "with-image",
      title: { en: "With Image", zh: "带图片" },
    },
    {
      id: "radius",
      title: { en: "Radius", zh: "圆角" },
    },
    {
      id: "not-animated",
      title: { en: "Without Animation", zh: "无动画" },
    },
  ],
  notes: [
    {
      title: "Motion",
      body: { en: "Ratio changes run as a motion layout animation with a bounce-free spring. With reduced motion the frame jumps straight to its new shape.", zh: "比例变化以动作布局动画运行，使用无弹跳的弹簧。在减少动态效果下，框架直接跳到新形状。" },
    },
  ],
  api: [
    {
      name: "AspectRatio",
      description: { en: "A full-width frame locked to a ratio, with a muted well background.", zh: "锁定比例的整宽框架，带柔和的内凹背景。" },
      extends: "motion.div",
      props: [
        { name: "ratio", type: "number", default: "1", description: { en: "Width divided by height, e.g. `16 / 9`. Invalid values fall back to 1.", zh: "宽度除以高度，例如 `16 / 9`。无效值回退为 1。" } },
        { name: "animated", type: "boolean", default: "true", description: { en: "Animate ratio changes. Reduced motion always skips the movement.", zh: "为比例变化添加动画。减少动态效果始终跳过移动。" } },
        { name: "radius", type: "number", default: "20", description: { en: "Corner radius in px.", zh: "圆角半径，单位 px。" } },
        { name: "contentClassName", type: "string", description: { en: "Classes for the absolutely positioned content layer.", zh: "绝对定位内容层的类名。" } },
      ],
    },
    {
      name: "AspectRatioImage",
      description: { en: "Cover-cropped image for `AspectRatio`, sized from its real `width` and `height`. Must be used inside it.", zh: "用于 `AspectRatio` 的覆盖裁剪图片，按其真实的 `width` 和 `height` 调整尺寸。必须在其中使用。" },
      extends: "motion.img",
      props: [
        { name: "alt", type: "string", required: true, description: { en: "Alternative text.", zh: "替代文本。" } },
        { name: "width", type: "number", required: true, description: { en: "Intrinsic width in px.", zh: "固有宽度，单位 px。" } },
        { name: "height", type: "number", required: true, description: { en: "Intrinsic height in px.", zh: "固有高度，单位 px。" } },
        { name: "draggable", type: "boolean", default: "false", description: { en: "Native image dragging.", zh: "原生图片拖拽。" } },
      ],
    },
  ],
} satisfies ComponentDoc
