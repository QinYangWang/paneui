import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import {
  SettingsGroup,
  SettingsRow,
  SettingsRowDescription,
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
    ├── SettingsRow
    │   ├── SettingsRowText (Title, Description)
    │   └── SettingsRowControl or any control
    └── SettingsGroupFooter
        └── SettingsFooterNote`,
  examples: [
    { id: "danger-zone", title: "Danger Zone", description: "Use for actions that delete data or can't be undone." },
    { id: "nav", title: "Settings Nav", description: "Use when settings span several pages; pass your router link with `render`." },
  ],
  notes: [{ title: "Rows", body: "A row wraps its control under the text on narrow screens. Render it as a `<label>` (`render={<label />}`) so clicking anywhere toggles its switch." }, { title: "Nav", body: "Below `md` the settings nav becomes a horizontally scrolling strip." }],
  api: [
    { name: "SettingsGroup", extends: "div", props: [{ name: "tone", type: `"default" | "destructive"`, default: `"default"`, description: "Destructive ring for a danger zone." }] },
    { name: "SettingsRow", extends: "div (useRender)", description: "Min 56px row with a hairline between rows.", props: [{ name: "render", type: "ReactElement", description: "Render as another element, e.g. `<label />`." }] },
    { name: "SettingsGroupFooter", extends: "div", description: "Muted band for Save / Cancel; with a `SettingsFooterNote` the note sits left.", props: [] },
    { name: "SettingsNavItem", extends: "a (useRender)", props: [{ name: "isActive", type: "boolean", description: "Current page." }, { name: "icon", type: "ReactNode", description: "16px solid icon." }, { name: "render", type: "ReactElement", description: "Your router link." }] },
  ],
} satisfies ComponentDoc
