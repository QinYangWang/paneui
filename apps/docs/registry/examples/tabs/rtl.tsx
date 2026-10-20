import { DirectionProvider } from "@base-ui/react/direction-provider"
import { ChartIcon, ChatIcon, ListIcon } from "@paneui/ui/icons"
import { Tabs, TabsList, TabsPanel, TabsTab } from "@paneui/ui/components/tabs"

export default function TabsRtl() {
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl">
        <Tabs defaultValue="chat" className="items-center">
          <TabsList>
            <TabsTab value="chat">
              <ChatIcon />
              المحادثة
            </TabsTab>
            <TabsTab value="tasks">
              <ListIcon />
              المهام
            </TabsTab>
            <TabsTab value="stats">
              <ChartIcon />
              الإحصاءات
            </TabsTab>
          </TabsList>
          <TabsPanel value="chat" className="text-sm text-muted-foreground">محادثاتك مع المساعد.</TabsPanel>
          <TabsPanel value="tasks" className="text-sm text-muted-foreground">كل ما يعمل في الخلفية.</TabsPanel>
          <TabsPanel value="stats" className="text-sm text-muted-foreground">الاستخدام هذا الأسبوع.</TabsPanel>
        </Tabs>
      </div>
    </DirectionProvider>
  )
}
