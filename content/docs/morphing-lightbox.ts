import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { MorphingLightbox } from "@/components/ui/morphing-lightbox"`,
    code: `<MorphingLightbox
  items={[{ src: "/photos/harbour.jpg", alt: "Harbour at dawn", width: 800, height: 600 }]}
/>`,
  },
  examples: [
    {
      id: "no-loop",
      title: "Without Looping",
      description: "With `loop={false}` the arrows stop at the first and last image, which suits ordered steps. Click a thumbnail to open the full-screen viewer.",
    },
    {
      id: "square-thumbnails",
      title: "Thumbnail Shape",
      description: "`thumbnailClassName` sets each thumbnail's aspect ratio and `className` the grid columns; the viewer keeps each image's own `width` / `height` ratio.",
    },
    {
      id: "index-change",
      title: "Index Change",
      description: "`onIndexChange` reports the open image's index, or `null` when the viewer closes.",
    },
  ],
  notes: [
    {
      title: "Keyboard",
      body: "The viewer is a modal dialog portalled to `document.body`: focus moves to Close and is trapped inside, ← / → move between images, Escape closes and returns focus to the thumbnail. Swipe or drag sideways to navigate too.",
    },
    {
      title: "Motion",
      body: "The thumbnail morphs into the viewer frame on a spring and back to its spot on close. Under reduced motion the frame and images cross-fade instead.",
    },
  ],
  api: [
    {
      name: "MorphingLightbox",
      description: "A grid of thumbnail buttons that open a full-screen viewer. Locks page scroll while open.",
      extends: "div",
      props: [
        { name: "items", type: "LightboxItem[]", required: true, description: "The images, in order." },
        { name: "loop", type: "boolean", default: "true", description: "Wrap from last to first when navigating." },
        { name: "thumbnailClassName", type: "string", description: "Class for each thumbnail button; set its aspect ratio here (default `aspect-4/3`)." },
        { name: "onIndexChange", type: "(index: number | null) => void", description: "Called with the open index, or `null` on close." },
      ],
    },
    {
      name: "LightboxItem",
      description: "Type of each entry in `items`.",
      props: [
        { name: "src", type: "string", required: true, description: "Full-size image." },
        { name: "alt", type: "string", required: true, description: "Alt text; also labels the thumbnail and is the fallback caption." },
        { name: "thumbnail", type: "string", description: "Smaller image for the grid. Defaults to `src`." },
        { name: "caption", type: "ReactNode", description: "Shown under the open image." },
        { name: "width", type: "number", description: "Intrinsic width, for the open aspect ratio before the image loads." },
        { name: "height", type: "number", description: "Intrinsic height." },
      ],
    },
  ],
} satisfies ComponentDoc
