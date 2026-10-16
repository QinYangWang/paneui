import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import {
  SettingsGroup,
  SettingsRow,
  SettingsRowDescription,
  SettingsRowLink,
  SettingsRowText,
  SettingsRowTitle,
  SettingsSection,
  SettingsSectionHeader,
  SettingsSectionTitle,
} from "@/components/ui/settings-section"`,
    code: `<SettingsSection>
  <SettingsSectionHeader>
    <SettingsSectionTitle>Notifications</SettingsSectionTitle>
  </SettingsSectionHeader>
  <SettingsGroup>
    <SettingsRow render={<label />}>
      <SettingsRowText>
        <SettingsRowTitle>Weekly digest</SettingsRowTitle>
        <SettingsRowDescription>Every Monday at 9:00.</SettingsRowDescription>
      </SettingsRowText>
      <Switch />
    </SettingsRow>
  </SettingsGroup>
</SettingsSection>`,
  },
  composition: `SettingsNav
└── SettingsNavItem
SettingsSection
├── SettingsSectionHeader
│   ├── SettingsSectionTitle
│   └── SettingsSectionDescription
└── SettingsGroup
    ├── SettingsRow (or SettingsRowLink)
    │   ├── SettingsRowText (Title, Description)
    │   └── SettingsRowControl or any control
    └── SettingsGroupFooter
        └── SettingsFooterNote`,
  examples: [
    { id: "danger-zone", title: "Danger Zone", description: "Use for actions that delete data or can't be undone." },
    { id: "interactive-rows", title: "Interactive Rows", description: "Use when a row opens a page, a dialog or a link." },
    { id: "nav", title: "Settings Nav", description: "Use when settings span several pages; pass your router link with `render`." },
  ],
  notes: [{ title: "Rows", body: "A row wraps its control under the text on narrow screens. Render it as a `<label>` (`render={<label />}`) so clicking anywhere toggles its switch." }, { title: "Nav", body: "Below `md` the settings nav becomes a horizontally scrolling strip." }, { title: "Interactive rows", body: "An `interactive` row is one `<button>` (or the element `render` gives): it takes the hover and press fill, an inset focus ring and a trailing chevron that flips in right-to-left layouts. Keep other controls out of it." }],
  api: [
    { name: "SettingsGroup", extends: "div", props: [{ name: "tone", type: `"default" | "destructive"`, default: `"default"`, description: "Destructive ring for a danger zone." }] },
    {
      name: "SettingsRow",
      extends: "div (useRender)",
      description: "Min 56px row with a hairline between rows.",
      props: [
        { name: "render", type: "ReactElement", description: "Render as another element, e.g. `<label />` or a router link." },
        { name: "interactive", type: "boolean", default: "false", description: "The row is the control: a `<button>` by default, with hover and press fill, focus ring and chevron." },
        { name: "detail", type: "ReactNode", description: "Muted trailing text before the chevron, such as the current value." },
        { name: "chevron", type: "boolean", default: "true", description: "Show the chevron on an interactive row." },
      ],
      dataAttributes: [{ name: "data-interactive", description: "Present on an interactive row." }],
    },
    { name: "SettingsRowLink", extends: "SettingsRow", description: "Interactive row that renders an `<a>`; pass `href`, or `render` for a router link.", props: [{ name: "href", type: "string", description: "Link target." }] },
    { name: "SettingsGroupFooter", extends: "div", description: "Muted band for Save / Cancel; with a `SettingsFooterNote` the note sits left.", props: [] },
    { name: "SettingsNavItem", extends: "a (useRender)", props: [{ name: "isActive", type: "boolean", description: "Current page." }, { name: "icon", type: "ReactNode", description: "16px solid icon." }, { name: "render", type: "ReactElement", description: "Your router link." }] },
  ],
} satisfies ComponentDoc
