import { Tabs, TabsList, TabsPanel, TabsTab } from "@paneui/ui/components/tabs"

export default function TabsGhost() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-md">
      <TabsList variant="ghost">
        <TabsTab value="overview">Overview</TabsTab>
        <TabsTab value="activity">Activity</TabsTab>
        <TabsTab value="settings">Settings</TabsTab>
      </TabsList>
      <TabsPanel value="overview" className="text-sm text-muted-foreground">
        Three deploys and one open incident this week.
      </TabsPanel>
      <TabsPanel value="activity" className="text-sm text-muted-foreground">
        Mia merged two pull requests an hour ago.
      </TabsPanel>
      <TabsPanel value="settings" className="text-sm text-muted-foreground">
        Notifications go to the team channel.
      </TabsPanel>
    </Tabs>
  )
}
