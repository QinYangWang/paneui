import { GridIcon, ListIcon } from "@paneui/ui/icons"
import { Tabs, TabsList, TabsPanel, TabsTab } from "@paneui/ui/components/tabs"

export default function TabsIconOnly() {
  return (
    <Tabs defaultValue="grid" className="items-center">
      <TabsList>
        <TabsTab value="grid" aria-label="Grid view">
          <GridIcon />
        </TabsTab>
        <TabsTab value="list" aria-label="List view">
          <ListIcon />
        </TabsTab>
      </TabsList>
      <TabsPanel value="grid" className="text-sm text-muted-foreground">
        12 photos shown as tiles.
      </TabsPanel>
      <TabsPanel value="list" className="text-sm text-muted-foreground">
        12 photos shown with names and sizes.
      </TabsPanel>
    </Tabs>
  )
}
