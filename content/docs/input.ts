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
    { id: "sizes", title: "Sizes", description: "Match the size of the button beside it." },
  ],
  notes: [
    {
      title: "Text size on phones",
      body: "Field text matches the control size on every screen (13px at the default size), the same as the button beside it. iOS Safari zooms into a focused field whose text is under 16px; where that zoom matters more than density, such as a sign-in form on a phone, add `max-md:text-base` to the field.",
    },
  ],
  api: [
    {
      name: "Input",
      description: "Text field that takes any native `type`. It adds no props of its own.",
      extends: "Input",
      extendsHref: "https://base-ui.com/react/components/input#api-reference",
      props: [
        { name: "size", type: `"xs" | "sm" | "default" | "lg"`, default: `"default"`, description: "Height 24 / 28 / 32 / 36px, the Button heights. Inside a sized `Field` it takes the field's size." },
        { name: "htmlSize", type: "number", description: "The native `size` attribute (width in characters)." },
      ],
      dataAttributes: [{ name: "data-size", description: "The resolved size." }],
    },
  ],
} satisfies ComponentDoc
