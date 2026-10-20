import { Tabs, TabsList, TabsPanel, TabsTab } from "@paneui/ui/components/tabs"

export default function TabsVertical() {
  return (
    <Tabs defaultValue="general" orientation="vertical" className="w-full max-w-md gap-4">
      <TabsList>
        <TabsTab value="general">General</TabsTab>
        <TabsTab value="notifications">Notifications</TabsTab>
        <TabsTab value="security">Security</TabsTab>
      </TabsList>
      <TabsPanel value="general" className="text-sm text-pretty text-muted-foreground">
        Your name, language and time zone.
      </TabsPanel>
      <TabsPanel value="notifications" className="text-sm text-pretty text-muted-foreground">
        Choose which updates reach your inbox.
      </TabsPanel>
      <TabsPanel value="security" className="text-sm text-pretty text-muted-foreground">
        Passwords, passkeys and signed-in devices.
      </TabsPanel>
    </Tabs>
  )
}
