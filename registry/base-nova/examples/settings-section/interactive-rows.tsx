"use client"

import { SettingsGroup, SettingsRow, SettingsRowDescription, SettingsRowLink, SettingsRowText, SettingsRowTitle } from "@/registry/base-nova/ui/settings-section"

export default function SettingsSectionInteractiveRows() {
  return (
    <SettingsGroup className="w-full max-w-md">
      <SettingsRow interactive detail="English">
        <SettingsRowText>
          <SettingsRowTitle>Language</SettingsRowTitle>
        </SettingsRowText>
      </SettingsRow>
      <SettingsRow interactive detail="3 connected">
        <SettingsRowText>
          <SettingsRowTitle>Chat apps</SettingsRowTitle>
          <SettingsRowDescription>Where the agent answers you.</SettingsRowDescription>
        </SettingsRowText>
      </SettingsRow>
      <SettingsRowLink href="#source">
        <SettingsRowText>
          <SettingsRowTitle>Source code</SettingsRowTitle>
        </SettingsRowText>
      </SettingsRowLink>
      <SettingsRowLink href="https://github.com/QinYangWang/ui" target="_blank" external>
        <SettingsRowText>
          <SettingsRowTitle>Report an issue</SettingsRowTitle>
        </SettingsRowText>
      </SettingsRowLink>
    </SettingsGroup>
  )
}
