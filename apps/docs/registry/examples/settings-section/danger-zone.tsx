import { Button } from "@paneui/ui/components/button"
import {
  SettingsGroup,
  SettingsRow,
  SettingsRowDescription,
  SettingsRowText,
  SettingsRowTitle,
  SettingsSection,
  SettingsSectionHeader,
  SettingsSectionTitle,
} from "@paneui/ui/components/settings-section"

export default function SettingsDangerZone() {
  return (
    <SettingsSection className="w-full max-w-xl">
      <SettingsSectionHeader>
        <SettingsSectionTitle>Danger zone</SettingsSectionTitle>
      </SettingsSectionHeader>
      <SettingsGroup tone="destructive">
        <SettingsRow>
          <SettingsRowText>
            <SettingsRowTitle>Delete workspace</SettingsRowTitle>
            <SettingsRowDescription>Removes every session, repo link and invoice. This can&apos;t be undone.</SettingsRowDescription>
          </SettingsRowText>
          <Button variant="destructive" size="sm">
            Delete
          </Button>
        </SettingsRow>
      </SettingsGroup>
    </SettingsSection>
  )
}
