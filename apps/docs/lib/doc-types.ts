import type { Localized } from "./site-locale"

/**
 * Hand-written documentation for one registry item, shown on /docs/<name>.
 * Lives in content/docs/<name>.ts; examples live in apps/docs/registry/examples/<name>/<id>.tsx.
 * Inline text supports `code` and [links](https://...).
 */
export type PropDoc = {
  name: string
  /** TypeScript type as the user writes it, e.g. `"default" | "sm"` or `(value: string) => void`. */
  type: string
  default?: string
  description: string
  required?: boolean
}

export type PartDoc = {
  /** Exported component or hook name, e.g. `AccordionTrigger`. */
  name: string
  description?: string
  /** What the rest of its props come from, e.g. `Accordion.Trigger` or `button`. */
  extends?: string
  /** Docs link for `extends`. */
  extendsHref?: string
  props: PropDoc[]
  /** data-* attributes useful for styling, e.g. `data-open`. */
  dataAttributes?: { name: string; description: string }[]
}

export type ExampleDoc = {
  /** File name without extension in apps/docs/registry/examples/<name>/. */
  id: string
  title: Localized
  description?: Localized
}

export type ComponentDoc = {
  description?: Localized
  summary?: Localized
  /** Headless primitive this wraps, linked at the top and in API Reference. */
  baseUi?: { name: string; href: string }
  usage: { imports: string; code: string }
  /** Part tree, e.g. "Accordion\n└── AccordionItem\n    ├── AccordionTrigger\n    └── AccordionPanel". */
  composition?: string
  examples: ExampleDoc[]
  api: PartDoc[]
  /** Extra short paragraphs (accessibility, motion, tips) shown before API Reference. */
  notes?: { title: string; body: string }[]
}
