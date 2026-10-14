import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { Textarea } from "@/components/ui/textarea"`,
    code: `<Textarea placeholder="Anything the agent should know?" />`,
  },
  examples: [
    { id: "disabled", title: "Disabled", description: "`disabled` dims the field and shows a not-allowed cursor." },
    {
      id: "invalid",
      title: "Invalid",
      description: "Set `aria-invalid` for the destructive ring and link the message with `aria-describedby`.",
    },
    {
      id: "with-counter",
      title: "With Counter",
      description: "Control `value` and pair it with the native `maxLength` to show a live count.",
    },
    { id: "with-button", title: "With Button", description: "A submit button aligned under the field." },
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
      description: "A multi-line field in an inset well. It adds no props of its own.",
      extends: "textarea",
      props: [],
    },
  ],
} satisfies ComponentDoc
