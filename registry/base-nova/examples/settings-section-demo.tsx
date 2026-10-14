import { Button } from "@/registry/base-nova/ui/button"
import {
  SettingsGroup,
  SettingsGroupFooter,
  SettingsRow,
  SettingsRowDescription,
  SettingsRowText,
  SettingsRowTitle,
  SettingsSection,
  SettingsSectionDescription,
  SettingsSectionHeader,
  SettingsSectionTitle,
} from "@/registry/base-nova/ui/settings-section"
import { Switch } from "@/registry/base-nova/ui/switch"

export default function SettingsSectionDemo() {
  return (
    <SettingsSection className="w-full max-w-xl">
      <SettingsSectionHeader>
        <SettingsSectionTitle>Notifications</SettingsSectionTitle>
        <SettingsSectionDescription>Choose what reaches your inbox.</SettingsSectionDescription>
      </SettingsSectionHeader>
      <SettingsGroup>
        <SettingsRow render={<label />}>
          <SettingsRowText>
            <SettingsRowTitle>Approval requests</SettingsRowTitle>
            <SettingsRowDescription>When an agent waits for you to allow an action.</SettingsRowDescription>
          </SettingsRowText>
          <Switch defaultChecked />
        </SettingsRow>
        <SettingsRow render={<label />}>
          <SettingsRowText>
            <SettingsRowTitle>Weekly digest</SettingsRowTitle>
            <SettingsRowDescription>A Monday summary of runs and spend.</SettingsRowDescription>
          </SettingsRowText>
          <Switch />
        </SettingsRow>
        <SettingsGroupFooter>
          <Button size="sm">Save</Button>
        </SettingsGroupFooter>
      </SettingsGroup>
    </SettingsSection>
  )
}
