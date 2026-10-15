import type { ComponentDoc } from "@/lib/doc-types"

export default {
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
      title: "Horizontal",
      description: "Use for nav bars laid out in a row.",
    },
    {
      id: "pill-style",
      title: "Pill Style",
      description: "Use when the highlight should match a different surface or reach past each item.",
    },
    {
      id: "disabled",
      title: "Disabled",
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "With reduced motion the pill jumps between items and only fades.",
    },
    {
      title: "Keyboard",
      body: "The highlight follows focus as well as hover, so tabbing through links moves it. It only adds the highlight; give items real roles and focusability (links, buttons).",
    },
  ],
  api: [
    {
      name: "SharedLayoutBg",
      description: "The group that owns the shared highlight.",
      extends: "div",
      props: [
        {
          name: "orientation",
          type: `"vertical" | "horizontal"`,
          default: `"vertical"`,
          description: "Stack items in a column or a row.",
        },
        {
          name: "pillClassName",
          type: "string",
          description: "Classes for the gliding pill (colour, radius, shadow). Defaults to `rounded-xl bg-secondary shadow-raised`.",
        },
        { name: "inset", type: "number", default: "0", description: "How far (px) the pill reaches past each item horizontally." },
      ],
      dataAttributes: [{ name: "data-orientation", description: "`vertical` or `horizontal`." }],
    },
    {
      name: "SharedLayoutBgItem",
      description: "One item. Renders a `div` unless you pass `render`.",
      extends: "div",
      props: [
        {
          name: "render",
          type: "ReactElement | (props, state) => ReactElement",
          description: "Replace the rendered element, e.g. `<a />` or `<button />`.",
        },
        { name: "disabled", type: "boolean", default: "false", description: "Dim the item, skip it for the pointer and keep the highlight off it." },
      ],
      dataAttributes: [{ name: "data-active", description: "Present while the item holds the highlight." }],
    },
  ],
} satisfies ComponentDoc
