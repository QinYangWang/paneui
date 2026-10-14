import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { StatefulButton } from "@/components/ui/button-stateful"`,
    code: `<StatefulButton state={state} onClick={save} successText="Saved">
  Save
</StatefulButton>`,
  },
  examples: [
    {
      id: "states",
      title: "States",
      description: "Each `state` shows its own face: `idle` (children and `icon`), `loading`, `success` and `error`.",
    },
    {
      id: "variants",
      title: "Variants",
      description: "Takes every Button `variant`. The green / red success and error tint applies to `default` only.",
    },
    {
      id: "no-tint",
      title: "Without Tint",
      description: "Set `tint={false}` to keep the surface colour on success and error and change only the label.",
    },
    {
      id: "sizes",
      title: "Sizes",
      description: "Button `size` values pass through; the width springs between each face's natural width.",
    },
  ],
  notes: [
    {
      title: "Accessibility",
      body: "While `loading` the button is disabled but stays focusable (`focusableWhenDisabled`) and sets `aria-busy`. The current label is announced through a polite live region.",
    },
    {
      title: "Related",
      body: "[Button](/docs/button), [Magnetic Button](/docs/button-magnetic). With reduced motion faces cross-fade and the width changes instantly.",
    },
  ],
  api: [
    {
      name: "StatefulButton",
      description: "A Button that swaps between idle, loading, success and error faces.",
      extends: "Button",
      extendsHref: "/docs/button",
      props: [
        {
          name: "state",
          type: `"idle" | "loading" | "success" | "error"`,
          default: `"idle"`,
          description: "Which face the button shows. `loading` disables it (it stays focusable).",
        },
        { name: "children", type: "ReactNode", required: true, description: "Idle label." },
        { name: "loadingText", type: "ReactNode", default: `"Working"`, description: "Label while loading, after a spinner." },
        { name: "successText", type: "ReactNode", default: `"Done"`, description: "Label on success, after a check." },
        { name: "errorText", type: "ReactNode", default: `"Try again"`, description: "Label on error, after a cross." },
        { name: "icon", type: "ReactNode", description: "Trailing icon shown only while idle." },
        {
          name: "tint",
          type: "boolean",
          default: "true",
          description: "Tint the surface green / red on success / error (`default` variant only).",
        },
        { name: "variant", type: "Button variant", default: `"default"`, description: "Passed to Button." },
      ],
      dataAttributes: [{ name: "data-state", description: "The current `state`." }],
    },
  ],
} satisfies ComponentDoc
