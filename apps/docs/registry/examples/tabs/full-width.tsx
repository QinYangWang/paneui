import { Tabs, TabsList, TabsPanel, TabsTab } from "@paneui/ui/components/tabs"

export default function TabsFullWidth() {
  return (
    <Tabs defaultValue="sign-in" className="w-full max-w-sm">
      <TabsList className="w-full">
        <TabsTab value="sign-in" className="flex-1">
          Sign in
        </TabsTab>
        <TabsTab value="create" className="flex-1">
          Create account
        </TabsTab>
      </TabsList>
      <TabsPanel value="sign-in" className="text-sm text-muted-foreground">
        Welcome back. Use the email you signed up with.
      </TabsPanel>
      <TabsPanel value="create" className="text-sm text-muted-foreground">
        It takes under a minute, and no card is needed.
      </TabsPanel>
    </Tabs>
  )
}
