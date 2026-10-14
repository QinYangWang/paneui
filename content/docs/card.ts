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
    {
      id: "size-sm",
      title: "Small",
      description: "`size=\"sm\"` drops the inner spacing from 20px to 14px and the title to `text-sm`, for dense dashboards.",
    },
    {
      id: "with-form",
      title: "With Form",
      description: "Card parts own their padding; space fields with `gap` on `CardContent`.",
    },
    {
      id: "inset-media",
      title: "Inset With Media",
      description:
        "`variant=\"inset\"` is a tinted frame around a raised `CardPanel`. Use it to present something, like an image or a featured plan.",
    },
    {
      id: "inset-code",
      title: "Inset With Code",
      description: "A `CardFooter` above the panel works as a quiet caption bar for code or a file.",
    },
  ],
  api: [
    {
      name: "Card",
      extends: "div",
      props: [
        {
          name: "size",
          type: `"default" | "sm"`,
          default: `"default"`,
          description: "Sets `--card-spacing` (20px or 14px), used by every part for padding and gaps.",
        },
        {
          name: "variant",
          type: `"default" | "inset"`,
          default: `"default"`,
          description: "`inset` turns the card into a tinted frame (4px padding) that holds a `CardPanel`.",
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
    { name: "CardContent", extends: "div", props: [] },
    { name: "CardFooter", description: "A row with a 8px gap between items.", extends: "div", props: [] },
  ],
} satisfies ComponentDoc
