import type { ComponentDoc } from "@/lib/doc-types"

export default {
  baseUi: {
    name: "Input",
    href: "https://base-ui.com/react/components/input",
  },
  usage: {
    imports: `import { Input } from "@/components/ui/input"`,
    code: `<Input type="email" placeholder="you@example.com" />`,
  },
  examples: [
    {
      id: "types",
      title: "Types",
      description: "Any native `type` works: `password`, `number`, `date` and the rest.",
    },
    {
      id: "file",
      title: "File",
      description: "`type=\"file\"` styles the picker button to match the field.",
    },
    { id: "disabled", title: "Disabled", description: "`disabled` dims the field and blocks pointer events." },
    {
      id: "invalid",
      title: "Invalid",
      description: "Set `aria-invalid` to show a destructive ring, and point `aria-describedby` at the error text.",
    },
    {
      id: "with-button",
      title: "With Button",
      description: "The input fills the row (`w-full`), so a button beside it keeps its own width.",
    },
  ],
  api: [
    {
      name: "Input",
      description: "A full-width text field in an inset well. It adds no props of its own.",
      extends: "Input",
      extendsHref: "https://base-ui.com/react/components/input#api-reference",
      props: [],
    },
  ],
} satisfies ComponentDoc
