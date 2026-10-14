import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { Badge } from "@/components/ui/badge"`,
    code: `<Badge variant="success">Paid</Badge>`,
  },
  examples: [
    {
      id: "sizes",
      title: "Sizes",
      description: "`default` is 28px tall for standalone chips; `sm` is 20px for tables and dense rows.",
    },
    {
      id: "with-icon",
      title: "With Icon",
      description: "Drop an icon in as the first child; it is sized for you (14px, 12px at `sm`).",
    },
    {
      id: "with-avatar",
      title: "With Avatar",
      description: "`BadgeAvatar` adds a round initial at the start and tightens the left padding.",
    },
    {
      id: "as-link",
      title: "As Link",
      description: "Pass `render={<a />}` to make a badge a link; the `chip` variant gets a hover ring.",
    },
  ],
  api: [
    {
      name: "Badge",
      extends: "span",
      props: [
        {
          name: "variant",
          type: `"chip" | "primary" | "success" | "warning" | "destructive" | "outline"`,
          default: `"chip"`,
          description: "Visual style. `chip` is neutral; the tinted variants carry status.",
        },
        {
          name: "size",
          type: `"default" | "sm"`,
          default: `"default"`,
          description: "Height, padding and text size.",
        },
        {
          name: "render",
          type: "ReactElement | (props, state) => ReactElement",
          description: "Replace the rendered `<span>`, e.g. with `<a />` or a router `Link`.",
        },
      ],
    },
    {
      name: "BadgeAvatar",
      description: "Small round mark at the start of a badge, e.g. a vendor initial.",
      extends: "span",
      props: [],
    },
    {
      name: "badgeVariants",
      description: "The `cva` function behind `Badge`, for styling other elements like a badge.",
      props: [
        { name: "variant", type: "same as Badge", description: "" },
        { name: "size", type: "same as Badge", description: "" },
      ],
    },
  ],
} satisfies ComponentDoc
