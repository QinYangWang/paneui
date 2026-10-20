import { BellIcon, SettingsIcon, ShieldIcon, UserIcon } from "@paneui/ui/icons"
import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from "@paneui/ui/components/accordion"

export default function AccordionGhostWithIcons() {
  return (
    <Accordion variant="ghost" defaultValue={["security"]} className="max-w-md">
      <AccordionItem value="profile">
        <AccordionTrigger icon={<UserIcon />}>Profile</AccordionTrigger>
        <AccordionPanel>Your name, photo and the email we use for receipts.</AccordionPanel>
      </AccordionItem>
      <AccordionItem value="security">
        <AccordionTrigger icon={<ShieldIcon />}>Security</AccordionTrigger>
        <AccordionPanel>Two-factor sign-in, active sessions and recovery codes.</AccordionPanel>
      </AccordionItem>
      <AccordionItem value="notifications">
        <AccordionTrigger icon={<BellIcon />}>Notifications</AccordionTrigger>
        <AccordionPanel>Choose which events reach you by email, push or Slack.</AccordionPanel>
      </AccordionItem>
      <AccordionItem value="preferences">
        <AccordionTrigger icon={<SettingsIcon />}>Preferences</AccordionTrigger>
        <AccordionPanel>Theme, language and keyboard shortcuts.</AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
