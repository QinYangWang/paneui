import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Shows that something is loading.", "zh": "提示内容正在加载。"},
  usage: {
    imports: `import { Loader } from "@/components/ui/loader"`,
    code: `<Loader variant="dots" />`,
  },
  examples: [
    {
      id: "speed",
      title: { en: "Speed", zh: "速度" },
    },
    {
      id: "colors",
      title: { en: "Colors", zh: "颜色" },
    },
    {
      id: "in-context",
      title: { en: "In Context", zh: "实际场景" },
    },
    { id: "sizes", title: { en: "Sizes", zh: "尺寸" },  },
  ],
  notes: [
    {
      title: "Accessibility",
      body: "Renders `role=\"status\"` with `aria-label` from `label` (default `\"Loading\"`).",
    },
    {
      title: "Motion",
      body: "Loops are CSS keyframes shipped with the component, so they don't stall on a busy page or restart on re-render. With reduced motion every variant swaps movement, rotation and scale for a soft opacity fade and drops the extra `pulse` and `ripple` rings; `spinner` is opacity-only already.",
    },
  ],
  api: [
    {
      name: "Loader",
      description: "Loading indicator in eight styles.",
      extends: "span",
      props: [
        {
          name: "variant",
          type: `"spinner" | "ring" | "dots" | "bars" | "pulse" | "ripple" | "orbit" | "typing"`,
          default: `"spinner"`,
          description: "Animation style.",
        },
        { name: "size", type: `"xs" | "sm" | "md" | "default" | "lg"`, default: `"md"`, description: "12, 16, 24 or 32px; `default` is the same as `md`." },
        { name: "speed", type: "number", default: "1", description: "Multiplier on animation speed; 2 is twice as fast." },
        { name: "label", type: "string", default: `"Loading"`, description: "Announced to screen readers." },
      ],
      dataAttributes: [
        { name: "data-variant", description: "The `variant` value." },
        { name: "data-size", description: "The `size` value." },
      ],
    },
  ],
} satisfies ComponentDoc
