import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { Textarea } from "@/components/ui/textarea"`,
    code: `<Textarea placeholder="Anything the agent should know?" />`,
  },
  examples: [
    { id: "disabled", title: "Disabled" },
    {
      id: "invalid",
      title: "Invalid",
      description: "Use after validation fails; set `aria-invalid` and link the message with `aria-describedby`.",
    },
    {
      id: "with-counter",
      title: "With Counter",
      description: "Use when the input has a length limit, pairing a controlled `value` with `maxLength`.",
    },
    { id: "with-button", title: "With Button", description: "Use for short forms that submit straight from the field." },
  ],
  notes: [
    {
      title: "Auto height",
      body: "The field uses `field-sizing: content`, so it grows with its text from an 80px minimum in browsers that support it.",
    },
  ],
  api: [
    {
      name: "Textarea",
      description: "Multi-line text field. It adds no props of its own.",
      extends: "textarea",
      props: [],
    },
  ],
} satisfies ComponentDoc
