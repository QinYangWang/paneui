import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Shows image generation progress and results.", "zh": "展示图片生成进度与结果。"},
  usage: {
    imports: `import { ImageGeneration } from "@/components/ui/image-generation"`,
    code: `<ImageGeneration status="generating" progress={0.4} prompt="A lighthouse at dusk">
  <img src={src} alt="" />
</ImageGeneration>`,
  },
  examples: [
    {
      id: "statuses",
      title: { en: "Statuses", zh: "状态" },
    },
    {
      id: "progress",
      title: { en: "Controlled Progress", zh: "受控进度" },
    },
    {
      id: "aspect-ratio",
      title: { en: "Aspect Ratio", zh: "宽高比" },
    },
    {
      id: "error-retry",
      title: { en: "Error and Retry", zh: "错误与重试" },
    },
  ],
  notes: [
    {
      title: "Motion",
      body: { en: "Under reduced motion the grain, dot grid and scan sweep stop animating, the media no longer scales, and state changes apply instantly.", zh: "在减少动态效果下，颗粒、点阵和扫描扫过停止动画，媒体不再缩放，状态变更立即生效。" },
    },
    {
      title: "Accessibility",
      body: { en: "The frame is `role=\"img\"`: while working it reads the status and percentage, once complete it reads `alt` (falling back to `prompt`). The caption actions stay `inert` until complete.", zh: "框架为 `role=\"img\"`：工作时读取状态和百分比，完成后读取 `alt`（回退到 `prompt`）。说明操作在完成前保持 `inert`。" },
    },
  ],
  api: [
    {
      name: "ImageGeneration",
      description: { en: "Fixed-frame surface that refines generated media in place.", zh: "固定框架表面，就地优化生成的媒体。" },
      extends: "figure",
      props: [
        { name: "children", type: "ReactNode", description: { en: "The generated media (img, canvas, svg). Rendered from the start so it can refine in place.", zh: "生成的媒体（img、canvas、svg）。从一开始就渲染，以便就地优化。" } },
        { name: "status", type: `"queued" | "generating" | "refining" | "complete" | "error"`, default: `"generating"`, description: { en: "Generation state.", zh: "生成状态。" } },
        { name: "progress", type: "number", description: { en: "0–1. Drives the blur and grain reveal; defaults per status (0, 0.3, 0.75, 1, 0).", zh: "0–1。驱动模糊和颗粒显示；按状态有默认值（0、0.3、0.75、1、0）。" } },
        { name: "prompt", type: "string", description: { en: "Caption text, also copyable once complete.", zh: "说明文本，完成后也可复制。" } },
        { name: "meta", type: "ReactNode", description: { en: "Small meta line, e.g. `1024 × 1024 · v6`.", zh: "小号元信息行，例如 `1024 × 1024 · v6`。" } },
        { name: "queuePosition", type: "number", description: { en: "Queue position shown while `queued`.", zh: "`queued` 时显示的队列位置。" } },
        { name: "aspectRatio", type: `CSSProperties["aspectRatio"]`, default: `"1 / 1"`, description: { en: "Frame aspect ratio; any CSS `aspect-ratio` value.", zh: "框架宽高比；任意 CSS `aspect-ratio` 值。" } },
        { name: "onRetry", type: "() => void", description: { en: "Adds Try again (error) and Generate again (complete).", zh: "添加 Try again（错误）和 Generate again（完成）。" } },
        { name: "onDownload", type: "() => void", description: { en: "Adds a Download action once complete.", zh: "完成后添加 Download 操作。" } },
        { name: "errorText", type: "ReactNode", default: `"Couldn’t finish this image."`, description: { en: "Message in the frame when `status` is `error`; pass your own copy or a translation.", zh: "`status` 为 `error` 时框架中的消息；传入你自己的文案或翻译。" } },
        { name: "retryLabel", type: "ReactNode", default: `"Try again"`, description: { en: "Label of the error frame's retry button (shown with `onRetry`).", zh: "错误框架重试按钮的标签（与 `onRetry` 一起显示）。" } },
        { name: "alt", type: "string", description: { en: "Accessible description of the finished image.", zh: "完成图像的可访问描述。" } },
        { name: "mediaClassName", type: "string", description: { en: "Classes for the layer wrapping `children`.", zh: "包裹 `children` 的层的类名。" } },
      ],
      dataAttributes: [{ name: "data-status", description: { en: "The current `status`.", zh: "当前的 `status`。" } }],
    },
  ],
} satisfies ComponentDoc
