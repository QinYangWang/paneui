import type { ComponentDoc } from "@/lib/doc-types"

export default {
  baseUi: {
    name: "Switch",
    href: "https://base-ui.com/react/components/switch",
  },
  usage: {
    imports: `import { Switch } from "@/components/ui/switch"`,
    code: `<Switch defaultChecked />`,
  },
  examples: [
    {
      id: "controlled",
      title: "Controlled",
      description: "Pair `checked` with `onCheckedChange` when the rest of the UI reacts to the value.",
    },
    {
      id: "with-description",
      title: "With Description",
      description: "For settings rows, put the switch at the end and point a `Label` at it with `htmlFor` and the switch `id`.",
    },
    {
      id: "disabled",
      title: "Disabled",
      description: "`disabled` dims the switch in either state and blocks interaction.",
    },
    {
      id: "read-only",
      title: "Read Only",
      description: "`readOnly` keeps full contrast and focus but ignores clicks, for values the user can see but not change.",
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "The thumb slides with a playful overshoot curve (300ms) and stretches slightly while pressed; the track colour fades over 200ms.",
    },
    {
      title: "Keyboard",
      body: "`Space` and `Enter` toggle the focused switch. It renders `role=\"switch\"` with a hidden checkbox, so it works inside forms with `name`.",
    },
  ],
  api: [
    {
      name: "Switch",
      description: "The track and thumb in one part. The library only styles it.",
      extends: "Switch.Root",
      extendsHref: "https://base-ui.com/react/components/switch#root",
      props: [
        { name: "checked", type: "boolean", description: "Controlled state." },
        { name: "defaultChecked", type: "boolean", default: "false", description: "Initial state when uncontrolled." },
        {
          name: "onCheckedChange",
          type: "(checked: boolean, eventDetails) => void",
          description: "Called when the switch is toggled.",
        },
        { name: "disabled", type: "boolean", default: "false", description: "Dims the switch and blocks interaction." },
        { name: "readOnly", type: "boolean", default: "false", description: "Focusable but can't be toggled." },
        { name: "name", type: "string", description: "Submits the value with a form." },
      ],
      dataAttributes: [
        { name: "data-checked", description: "Present when on (primary track, thumb moved right)." },
        { name: "data-unchecked", description: "Present when off." },
        { name: "data-disabled", description: "Present when disabled." },
      ],
    },
  ],
} satisfies ComponentDoc
