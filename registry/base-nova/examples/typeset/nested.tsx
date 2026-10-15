import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from "@/registry/base-nova/ui/accordion"
import { Badge } from "@/registry/base-nova/ui/badge"
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/base-nova/ui/tabs"

export default function TypesetNested() {
  return (
    <article className="typeset typeset-docs w-full max-w-md">
      <Tabs defaultValue="faq">
        <TabsList>
          <TabsTab value="faq">FAQ</TabsTab>
          <TabsTab value="notes">Notes</TabsTab>
        </TabsList>
        <TabsPanel value="faq" typeset>
          <p>
            Common questions about <code>data-typeset</code>.
          </p>
          <Accordion defaultValue={["styles"]}>
            <AccordionItem value="styles">
              <AccordionTrigger>Do nested panels get prose styles?</AccordionTrigger>
              <AccordionPanel typeset>
                <p>
                  Yes. Content in this panel is set as prose, and the <Badge>badge</Badge> keeps its own styles.
                </p>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </TabsPanel>
        <TabsPanel value="notes" typeset>
          <p>Nothing here yet.</p>
        </TabsPanel>
      </Tabs>
    </article>
  )
}
