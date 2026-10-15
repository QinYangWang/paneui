import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"`,
    code: `<Card>
  <CardHeader>
    <CardTitle>Weekly digest</CardTitle>
    <CardDescription>Every Monday at 9:00.</CardDescription>
  </CardHeader>
  <CardContent>Sales, stock and open tasks.</CardContent>
</Card>`,
  },
  composition: `Card
├── CardHeader
│   ├── CardTitle
│   ├── CardDescription
│   └── CardAction
├── CardContent
└── CardFooter

Card variant="inset"
├── CardPanel
│   ├── CardHeader
│   └── CardContent
└── CardFooter`,
  examples: [
    { id: "variants", title: "Variants", description: "Use `outline` for cards placed on another card, and `ghost` to keep the card rhythm without a surface." },
    { id: "sizes", title: "Sizes", description: "Use `sm` in dense dashboards and `lg` for a single featured card." },
    {
      id: "with-form",
      title: "With Form",
      description: "Space fields with `gap` on `CardContent`, since the parts already own their padding.",
    },
    {
      id: "inset-media",
      title: "Inset With Media",
      description:
        "Use `variant=\"inset\"` to present something, like an image or a featured plan.",
    },
    {
      id: "inset-code",
      title: "Inset With Code",
      description: "Use a `CardFooter` above the panel as a caption bar for code or a file.",
    },
  ],
  api: [
    {
      name: "Card",
      extends: "div",
      props: [
        {
          name: "size",
          type: `"sm" | "default" | "lg"`,
          default: `"default"`,
          description: "Sets `--card-spacing` (12, 16 or 24px), used by every part for padding and gaps.",
        },
        {
          name: "variant",
          type: `"default" | "outline" | "ghost" | "inset"`,
          default: `"default"`,
          description: "`outline` is a 1px border with no fill or shadow, `ghost` has no surface, and `inset` turns the card into a tinted frame (4px padding) that holds a `CardPanel`.",
        },
      ],
      dataAttributes: [
        { name: "data-size", description: "The `size` value." },
        { name: "data-variant", description: "The `variant` value." },
      ],
    },
    {
      name: "CardPanel",
      description: "The raised inner surface of an inset card.",
      extends: "div",
      props: [],
    },
    {
      name: "CardHeader",
      description: "Title, description and an optional `CardAction` in the top-right corner.",
      extends: "div",
      props: [],
    },
    { name: "CardTitle", extends: "div", props: [] },
    { name: "CardDescription", extends: "div", props: [] },
    {
      name: "CardAction",
      description: "Placed in the header's right column, spanning the title and description rows.",
      extends: "div",
      props: [],
    },
    {
      name: "CardContent",
      extends: "div",
      props: [
        { name: "typeset", type: 'boolean | "docs" | "reading" | "chat"', default: "false", description: "Turn prose styles back on for the content inside a `typeset` container, or name a preset when it stands alone." },
      ],
    },
    { name: "CardFooter", description: "A row with a 8px gap between items.", extends: "div", props: [] },
  ],
} satisfies ComponentDoc
