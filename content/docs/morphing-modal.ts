import type { ComponentDoc } from "@/lib/doc-types"

const BASE = "https://base-ui.com/react/components/dialog"

export default {
  baseUi: { name: "Dialog", href: BASE },
  usage: {
    imports: `import { MorphingModal, MorphingModalContent, MorphingModalLink, MorphingModalTitle, MorphingModalTrigger, MorphingModalView } from "@/components/ui/morphing-modal"`,
    code: `<MorphingModal>
  <MorphingModalTrigger>Share</MorphingModalTrigger>
  <MorphingModalContent>
    <MorphingModalView name="main">
      <MorphingModalTitle>Share</MorphingModalTitle>
      <MorphingModalLink to="link">Get a link</MorphingModalLink>
    </MorphingModalView>
    <MorphingModalView name="link">
      <MorphingModalTitle>Share link</MorphingModalTitle>
    </MorphingModalView>
  </MorphingModalContent>
</MorphingModal>`,
  },
  composition: `MorphingModal
├── MorphingModalTrigger
└── MorphingModalContent
    └── MorphingModalView
        ├── MorphingModalHeader
        │   ├── MorphingModalBack (automatic)
        │   ├── MorphingModalTitle
        │   └── MorphingModalDescription
        ├── MorphingModalLink
        └── MorphingModalFooter
            └── MorphingModalClose`,
  examples: [
    {
      id: "steps",
      title: "Multi-step Flow",
      description: "Call `push` from `useMorphingModal()` in your own buttons to build a wizard; set the first view with `defaultView` and put `MorphingModalBack` anywhere.",
    },
    {
      id: "view-change",
      title: "Nested Settings",
      description: "A menu of `MorphingModalLink` rows; `onViewChange` reports each view the user lands on, including the return to the first view after closing.",
    },
    {
      id: "no-close-button",
      title: "Without Close Button",
      description: "`showCloseButton={false}` drops the corner ×, for confirmations that should end with an explicit choice.",
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "The panel springs to each view's height while views slide 28px and blur in the direction of travel. With reduced motion the height snaps and views cross-fade in 150ms.",
    },
    {
      title: "Accessibility",
      body: "After navigating, focus moves to the first focusable control in the new view (or the view itself). Closing resets to the first view once the exit finishes.",
    },
    {
      title: "Related",
      body: "Other morphing surfaces: [Select Morph](/docs/select-morph), [Popover Morph](/docs/popover-morph), [Center Morph Modal](/docs/center-morph-modal), [Morphing Lightbox](/docs/morphing-lightbox), [Morphing Search](/docs/morphing-search), [Morphing Search Chips](/docs/morphing-search-chips), [Morphing Tabs](/docs/morphing-tabs).",
    },
  ],
  api: [
    {
      name: "MorphingModal",
      description: "Dialog root that also holds the view stack.",
      extends: "Base UI Dialog.Root",
      extendsHref: `${BASE}#root`,
      props: [
        { name: "defaultView", type: "string", default: `"main"`, description: "The view shown when the modal opens." },
        { name: "onViewChange", type: "(view: string) => void", description: "Called once with the new view whenever it changes: after `push`, `back` or `reset`, including the reset to `defaultView` when the modal finishes closing." },
      ],
    },
    {
      name: "MorphingModalTrigger",
      description: "Base UI `Dialog.Trigger`, re-exported unchanged.",
      extends: "Base UI Dialog.Trigger",
      extendsHref: `${BASE}#trigger`,
      props: [],
    },
    {
      name: "MorphingModalContent",
      description: "Backdrop and centred popup (max 384px wide). Renders the active `MorphingModalView` child; other children render after it.",
      extends: "Base UI Dialog.Popup",
      extendsHref: `${BASE}#popup`,
      props: [
        { name: "showCloseButton", type: "boolean", default: "true", description: "Show the round × in the top-right corner." },
      ],
    },
    {
      name: "MorphingModalView",
      description: "One screen of the modal. Must be a direct child of `MorphingModalContent`.",
      extends: "div",
      props: [{ name: "name", type: "string", required: true, description: "Identifier other parts navigate to." }],
      dataAttributes: [{ name: "data-view", description: "The view's `name`." }],
    },
    {
      name: "MorphingModalHeader",
      description: "Title block; shows `MorphingModalBack` automatically when there is a view to go back to.",
      extends: "div",
      props: [],
    },
    { name: "MorphingModalTitle", extends: "Base UI Dialog.Title", extendsHref: `${BASE}#title`, props: [] },
    { name: "MorphingModalDescription", extends: "Base UI Dialog.Description", extendsHref: `${BASE}#description`, props: [] },
    {
      name: "MorphingModalLink",
      description: "A full-width row button that pushes another view.",
      extends: "button",
      props: [{ name: "to", type: "string", required: true, description: "Name of the view to open." }],
    },
    {
      name: "MorphingModalBack",
      description: "Round back chevron labelled `Back`. Renders nothing on the first view.",
      extends: "button",
      props: [],
    },
    { name: "MorphingModalFooter", description: "Right-aligned row of actions.", extends: "div", props: [] },
    { name: "MorphingModalClose", description: "Base UI `Dialog.Close`, re-exported unchanged.", extends: "Base UI Dialog.Close", extendsHref: `${BASE}#close`, props: [] },
    {
      name: "useMorphingModal",
      description: "Navigation state for custom controls. Use inside `MorphingModal`.",
      props: [
        { name: "view", type: "string", description: "The active view." },
        { name: "canGoBack", type: "boolean", description: "Whether there is a previous view." },
        { name: "direction", type: "1 | -1", description: "Direction of the last navigation." },
        { name: "push", type: "(view: string) => void", description: "Go to a view (pushes it onto the back stack)." },
        { name: "back", type: "() => void", description: "Return to the previous view." },
        { name: "reset", type: "() => void", description: "Jump back to the first view and clear the stack (calls `onViewChange` if the view changes)." },
      ],
    },
  ],
} satisfies ComponentDoc
