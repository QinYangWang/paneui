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
    },
    {
      id: "file",
      title: "File",
    },
    { id: "disabled", title: "Disabled" },
    {
      id: "invalid",
      title: "Invalid",
      description: "Set `aria-invalid` when validation fails, and point `aria-describedby` at the error text.",
    },
    {
      id: "with-button",
      title: "With Button",
      description: "Use for search or subscribe rows; the input fills the row (`w-full`) and the button keeps its width.",
    },
  ],
  api: [
    {
      name: "Input",
      description: "Text field that takes any native `type`. It adds no props of its own.",
      extends: "Input",
      extendsHref: "https://base-ui.com/react/components/input#api-reference",
      props: [],
    },
  ],
} satisfies ComponentDoc
