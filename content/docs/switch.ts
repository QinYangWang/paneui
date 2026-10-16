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
      description: "Use in settings rows; point a `Label` at the switch with `htmlFor` and its `id`.",
    },
    {
      id: "disabled",
      title: "Disabled",
    },
    {
      id: "read-only",
      title: "Read Only",
      description: "Use `readOnly` for values the user can see but not change; it stays focusable.",
    },
    { id: "sizes", title: "Sizes" },
    {
      id: "rtl",
      title: "RTL",
      description: `For right-to-left languages, wrap the tree in \`DirectionProvider\` and set \`dir="rtl"\` on its root.`,
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "The thumb slides over 300ms with an overshoot curve and the track colour fades over 200ms.",
    },
    {
      title: "Keyboard",
      body: "`Space` and `Enter` toggle the focused switch. It renders `role=\"switch\"` with a hidden checkbox, so it works inside forms with `name`.",
    },
  ],
  api: [
    {
      name: "Switch",
      description: "Track and thumb in one part.",
      extends: "Switch.Root",
      extendsHref: "https://base-ui.com/react/components/switch#root",
      props: [
        { name: "size", type: `"sm" | "default" | "lg"`, default: `"default"`, description: "Track 26×16 / 32×20 / 40×24px. Inside a sized `Field` it takes the field's size (`xs` maps to `sm`)." },
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
        { name: "data-size", description: "The resolved size." },
        { name: "data-checked", description: "Present when on." },
        { name: "data-unchecked", description: "Present when off." },
        { name: "data-disabled", description: "Present when disabled." },
      ],
    },
  ],
} satisfies ComponentDoc
