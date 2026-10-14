import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/base-nova/ui/tabs"

export default function TabsDisabled() {
  return (
    <Tabs defaultValue="overview" className="items-center">
      <TabsList>
        <TabsTab value="overview">Overview</TabsTab>
        <TabsTab value="billing">Billing</TabsTab>
        <TabsTab value="audit" disabled>
          Audit log
        </TabsTab>
      </TabsList>
      <TabsPanel value="overview" className="text-sm text-muted-foreground">
        Members, storage and recent activity.
      </TabsPanel>
      <TabsPanel value="billing" className="text-sm text-muted-foreground">
        Invoices and the card on file.
      </TabsPanel>
      <TabsPanel value="audit" className="text-sm text-muted-foreground">
        Available on the Business plan.
      </TabsPanel>
    </Tabs>
  )
}
