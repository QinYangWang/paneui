import { ChartIcon, ChatIcon, ListIcon } from "@/components/icons"
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/base-nova/ui/tabs"

export default function TabsDemo() {
  return (
    <Tabs defaultValue="chat" className="items-center">
      <TabsList>
        <TabsTab value="chat">
          <ChatIcon />
          Chat
        </TabsTab>
        <TabsTab value="tasks">
          <ListIcon />
          Tasks
        </TabsTab>
        <TabsTab value="stats">
          <ChartIcon />
          Stats
        </TabsTab>
      </TabsList>
      <TabsPanel value="chat" className="text-sm text-muted-foreground">Conversations with your agent.</TabsPanel>
      <TabsPanel value="tasks" className="text-sm text-muted-foreground">Everything running in the background.</TabsPanel>
      <TabsPanel value="stats" className="text-sm text-muted-foreground">Usage this week.</TabsPanel>
    </Tabs>
  )
}
