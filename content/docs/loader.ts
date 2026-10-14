import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { Loader } from "@/components/ui/loader"`,
    code: `<Loader variant="dots" />`,
  },
  examples: [
    {
      id: "speed",
      title: "Speed",
      description: "`speed` multiplies the animation rate: `0.5` is half speed, `2` twice as fast.",
    },
    {
      id: "colors",
      title: "Colors",
      description: "Loaders draw in `currentColor`, so tint them by setting a token `text-*` colour on a wrapper element.",
    },
    {
      id: "in-context",
      title: "In Context",
      description: "Use `size=\"sm\"` (16px) inside buttons and status rows, and give each one a specific `label`.",
    },
  ],
  notes: [
    {
      title: "Accessibility",
      body: "Renders `role=\"status\"` with `aria-label` from `label` (default `\"Loading\"`).",
    },
    {
      title: "Motion",
      body: "With reduced motion every variant swaps movement, rotation and scale for a soft opacity fade; `spinner` is opacity-only already.",
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
        { name: "size", type: `"sm" | "md" | "lg"`, default: `"md"`, description: "16, 24 or 32px." },
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
