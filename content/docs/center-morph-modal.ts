import type { ComponentDoc } from "@/lib/doc-types"

const BASE = "https://base-ui.com/react/components/dialog"

export default {
  baseUi: { name: "Dialog", href: BASE },
  usage: {
    imports: `import { CenterMorphModal, CenterMorphModalContent, CenterMorphModalTitle, CenterMorphModalTrigger } from "@/components/ui/center-morph-modal"`,
    code: `<CenterMorphModal>
  <CenterMorphModalTrigger>Publish</CenterMorphModalTrigger>
  <CenterMorphModalContent>
    <CenterMorphModalTitle>Publish to production?</CenterMorphModalTitle>
  </CenterMorphModalContent>
</CenterMorphModal>`,
  },
  composition: `CenterMorphModal
├── CenterMorphModalTrigger
└── CenterMorphModalContent
    ├── CenterMorphModalHeader
    │   ├── CenterMorphModalTitle
    │   └── CenterMorphModalDescription
    └── CenterMorphModalFooter
        └── CenterMorphModalClose`,
  examples: [
    {
      id: "form",
      title: "With Form",
      description: "Any content goes between header and footer; it settles in just behind the unfolding edges.",
    },
    {
      id: "no-close-button",
      title: "Without Close Button",
      description: "`showCloseButton={false}` removes the corner × so the footer choices are the only way out besides Escape.",
    },
    {
      id: "controlled",
      title: "Controlled",
      description: "Pass `open` / `onOpenChange` and leave out the trigger to open it from anywhere, e.g. after an async save.",
    },
    {
      id: "backdrop",
      title: "Custom Backdrop",
      description: "`backdropClassName` styles the scrim, here a darker one for media.",
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "The full-size panel is clipped to a 40px seed at its centre and unfolds to its edges over 550ms; closing folds back in 300ms. With reduced motion it is a 200ms fade.",
    },
    {
      title: "Keyboard",
      body: "Base UI Dialog: focus is trapped inside while open, Escape closes and focus returns to the trigger.",
    },
    {
      title: "Related",
      body: "Other morphing surfaces: [Select Morph](/docs/select-morph), [Popover Morph](/docs/popover-morph), [Morphing Modal](/docs/morphing-modal), [Morphing Lightbox](/docs/morphing-lightbox), [Morphing Search](/docs/morphing-search), [Morphing Search Chips](/docs/morphing-search-chips), [Morphing Tabs](/docs/morphing-tabs).",
    },
  ],
  api: [
    {
      name: "CenterMorphModal",
      description: "Base UI `Dialog.Root`, re-exported unchanged.",
      extends: "Base UI Dialog.Root",
      extendsHref: `${BASE}#root`,
      props: [],
    },
    {
      name: "CenterMorphModalTrigger",
      description: "Base UI `Dialog.Trigger`, re-exported unchanged.",
      extends: "Base UI Dialog.Trigger",
      extendsHref: `${BASE}#trigger`,
      props: [],
    },
    {
      name: "CenterMorphModalContent",
      description: "Backdrop and centred popup (max 448px wide).",
      extends: "Base UI Dialog.Popup",
      extendsHref: `${BASE}#popup`,
      props: [
        { name: "showCloseButton", type: "boolean", default: "true", description: "Show the round × in the top-right corner." },
        { name: "backdropClassName", type: "string", description: "Classes merged onto the backdrop." },
      ],
      dataAttributes: [{ name: "data-starting-style / data-ending-style", description: "Present while the panel unfolds or folds." }],
    },
    { name: "CenterMorphModalHeader", description: "Title and description stack.", extends: "div", props: [] },
    { name: "CenterMorphModalTitle", extends: "Base UI Dialog.Title", extendsHref: `${BASE}#title`, props: [] },
    { name: "CenterMorphModalDescription", extends: "Base UI Dialog.Description", extendsHref: `${BASE}#description`, props: [] },
    { name: "CenterMorphModalFooter", description: "Right-aligned row of actions.", extends: "div", props: [] },
    {
      name: "CenterMorphModalClose",
      description: "Base UI `Dialog.Close`, re-exported unchanged.",
      extends: "Base UI Dialog.Close",
      extendsHref: `${BASE}#close`,
      props: [],
    },
  ],
} satisfies ComponentDoc
