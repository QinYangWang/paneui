import type { ComponentDoc } from "@/lib/doc-types"

export default {
  baseUi: {
    name: "Checkbox",
    href: "https://base-ui.com/react/components/checkbox",
  },
  usage: {
    imports: `import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"`,
    code: `<Label>
  <Checkbox defaultChecked />
  Remember me
</Label>`,
  },
  examples: [
    {
      id: "with-description",
      title: "With Description",
      description: "Align the box to the first line with `items-start` on the `Label` when helper text wraps.",
    },
    {
      id: "controlled",
      title: "Controlled",
      description: "Pass `checked` and `onCheckedChange` to drive other UI from the value.",
    },
    {
      id: "disabled",
      title: "Disabled",
      description: "`disabled` works in every state: unchecked, `defaultChecked` and `indeterminate`.",
    },
    {
      id: "task-list",
      title: "Task List",
      description: "A list of controlled checkboxes that strike through finished items.",
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "Checking fills the box and draws the check on stroke by stroke; `indeterminate` grows a dash from the centre. Presses squish to 86% on an overshoot curve. With reduced motion the transitions and the squish are off.",
    },
    {
      title: "Keyboard",
      body: "Tab to focus and Space to toggle, from Base UI.",
    },
  ],
  api: [
    {
      name: "Checkbox",
      description: "An 18px box in an inset well. It adds no props of its own.",
      extends: "Base UI Checkbox.Root",
      extendsHref: "https://base-ui.com/react/components/checkbox#root",
      props: [
        { name: "checked", type: "boolean", description: "Controlled checked state." },
        { name: "defaultChecked", type: "boolean", default: "false", description: "Checked state on first render." },
        {
          name: "onCheckedChange",
          type: "(checked: boolean, details) => void",
          description: "Called when the box is toggled.",
        },
        {
          name: "indeterminate",
          type: "boolean",
          default: "false",
          description: "Shows a dash instead of the check, e.g. for a partly selected parent.",
        },
        { name: "disabled", type: "boolean", default: "false", description: "Dims the box and blocks interaction." },
      ],
      dataAttributes: [
        { name: "data-checked", description: "Present when checked (primary fill)." },
        { name: "data-indeterminate", description: "Present when indeterminate." },
        { name: "data-disabled", description: "Present when disabled." },
        { name: "data-invalid", description: "Present when invalid inside a Base UI Field (destructive ring)." },
      ],
    },
  ],
} satisfies ComponentDoc
