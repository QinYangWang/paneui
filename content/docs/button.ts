import type { ComponentDoc } from "@/lib/doc-types"

export default {
  baseUi: {
    name: "Button",
    href: "https://base-ui.com/react/components/button",
  },
  usage: {
    imports: `import { Button } from "@/components/ui/button"`,
    code: `<Button variant="secondary">Button</Button>`,
  },
  examples: [
    {
      id: "variants",
      title: "Variants",
      description:
        "Use `default` for the one primary action, `secondary` for everything else, and `ghost` inside toolbars and rows.",
    },
    {
      id: "sizes",
      title: "Sizes",
      description: "`xs` (24px), `sm` (28px), `default` (32px) and `lg` (36px) share the 10px radius; `xs` drops to 6px.",
    },
    {
      id: "with-icon",
      title: "With icon",
      description:
        'Mark the icon with `data-icon="inline-start"` or `data-icon="inline-end"` so the padding on that side tightens.',
    },
    {
      id: "icon",
      title: "Icon",
      description: "Icon-only sizes are square. Always give them an `aria-label`.",
    },
    { id: "disabled", title: "Disabled" },
    {
      id: "as-link",
      title: "As link",
      description: "Render any element with `render`. Pass `nativeButton={false}` when it isn't a `<button>`.",
    },
  ],
  api: [
    {
      name: "Button",
      extends: "Button",
      extendsHref: "https://base-ui.com/react/components/button#api-reference",
      props: [
        {
          name: "variant",
          type: `"default" | "secondary" | "outline" | "ghost" | "destructive" | "link"`,
          default: `"default"`,
          description: "Visual style.",
        },
        {
          name: "size",
          type: `"default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"`,
          default: `"default"`,
          description: "Height and padding. `icon*` sizes are square.",
        },
        {
          name: "render",
          type: "ReactElement | (props, state) => ReactElement",
          description: "Replace the rendered element, e.g. `<a />` or a router `Link`.",
        },
        {
          name: "nativeButton",
          type: "boolean",
          default: "true",
          description: "Set to `false` when `render` is not a `<button>` so keyboard and ARIA behaviour is added.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disables interaction and dims the button.",
        },
      ],
    },
    {
      name: "buttonVariants",
      description: "The `cva` function behind `Button`, for styling other elements like a button.",
      props: [
        { name: "variant", type: "same as Button", description: "" },
        { name: "size", type: "same as Button", description: "" },
        { name: "className", type: "string", description: "Merged last." },
      ],
    },
  ],
} satisfies ComponentDoc
