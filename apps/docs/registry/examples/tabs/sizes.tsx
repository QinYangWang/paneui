import { Tabs, TabsList, TabsTab } from "@paneui/ui/components/tabs"

export default function TabsSizes() {
  return (
    <div className="flex flex-col items-center gap-4">
      {(["xs", "sm", "default", "lg"] as const).map((size) => (
        <Tabs key={size} defaultValue="overview">
          <TabsList size={size}>
            <TabsTab value="overview">Overview</TabsTab>
            <TabsTab value="activity">Activity</TabsTab>
            <TabsTab value="settings">Settings</TabsTab>
          </TabsList>
        </Tabs>
      ))}
    </div>
  )
}
