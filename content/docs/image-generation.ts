import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { ImageGeneration } from "@/components/ui/image-generation"`,
    code: `<ImageGeneration status="generating" progress={0.4} prompt="A lighthouse at dusk">
  <img src={src} alt="" />
</ImageGeneration>`,
  },
  examples: [
    {
      id: "statuses",
      title: "Statuses",
      description: "`queued` breathes a dot grid (with `queuePosition`), `generating` and `refining` blur and grain the media, `error` shows a message.",
    },
    {
      id: "progress",
      title: "Controlled Progress",
      description: "Pass `progress` (0–1) from your backend; blur, grain and the hairline bar follow it. Without it, each status uses a default.",
    },
    {
      id: "aspect-ratio",
      title: "Aspect Ratio",
      description: "`aspectRatio` fixes the frame so nothing shifts when the image lands; it takes any CSS `aspect-ratio` value.",
    },
    {
      id: "error-retry",
      title: "Error and Retry",
      description: "With `onRetry`, the error frame offers Try again and the finished image offers Generate again. `errorText` and `retryLabel` replace the error copy. `onDownload` adds a Download action.",
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "Under reduced motion the grain, dot grid and scan sweep stop animating, the media no longer scales, and state changes apply instantly.",
    },
    {
      title: "Accessibility",
      body: 'The frame is `role="img"`: while working it reads the status and percentage, once complete it reads `alt` (falling back to `prompt`). The caption actions stay `inert` until complete.',
    },
  ],
  api: [
    {
      name: "ImageGeneration",
      description: "Fixed-frame surface that refines generated media in place.",
      extends: "figure",
      props: [
        { name: "children", type: "ReactNode", description: "The generated media (img, canvas, svg). Rendered from the start so it can refine in place." },
        { name: "status", type: `"queued" | "generating" | "refining" | "complete" | "error"`, default: `"generating"`, description: "Generation state." },
        { name: "progress", type: "number", description: "0–1. Drives the blur and grain reveal; defaults per status (0, 0.3, 0.75, 1, 0)." },
        { name: "prompt", type: "string", description: "Caption text, also copyable once complete." },
        { name: "meta", type: "ReactNode", description: "Small meta line, e.g. `1024 × 1024 · v6`." },
        { name: "queuePosition", type: "number", description: "Queue position shown while `queued`." },
        { name: "aspectRatio", type: `CSSProperties["aspectRatio"]`, default: `"1 / 1"`, description: "Frame aspect ratio." },
        { name: "onRetry", type: "() => void", description: "Adds Try again (error) and Generate again (complete)." },
        { name: "onDownload", type: "() => void", description: "Adds a Download action once complete." },
        { name: "errorText", type: "ReactNode", default: `"Couldn’t finish this image."`, description: "Message in the frame when `status` is `error`; pass your own copy or a translation." },
        { name: "retryLabel", type: "ReactNode", default: `"Try again"`, description: "Label of the error frame's retry button (shown with `onRetry`)." },
        { name: "alt", type: "string", description: "Accessible description of the finished image." },
        { name: "mediaClassName", type: "string", description: "Classes for the layer wrapping `children`." },
      ],
      dataAttributes: [{ name: "data-status", description: "The current `status`." }],
    },
  ],
} satisfies ComponentDoc
