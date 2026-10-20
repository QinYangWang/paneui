import { Tabs, TabsList, TabsPanel, TabsTab } from "@paneui/ui/components/tabs"

export default function TypesetContentSlots() {
  return (
    <article className="typeset typeset-docs w-full max-w-md">
      <p>
        Install the package, then pick the setup that matches your app.
      </p>
      <Tabs defaultValue="static">
        <TabsList>
          <TabsTab value="static">Static site</TabsTab>
          <TabsTab value="server">Server</TabsTab>
        </TabsList>
        <TabsPanel value="static" typeset>
          <p>
            Run <code>build</code> and upload the <code>out/</code> folder.
          </p>
          <ul>
            <li>Every page is plain HTML.</li>
            <li>Search runs in the browser.</li>
          </ul>
        </TabsPanel>
        <TabsPanel value="server" typeset>
          <p>
            Run <code>start</code> behind your proxy.
          </p>
        </TabsPanel>
      </Tabs>
    </article>
  )
}
