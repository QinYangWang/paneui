import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from "@/registry/base-nova/ui/accordion"

export default function AccordionGhostDisabled() {
  return (
    <Accordion variant="ghost" className="max-w-md">
      <AccordionItem value="history">
        <AccordionTrigger>Can I see my account history?</AccordionTrigger>
        <AccordionPanel>Every sign-in and change is listed under Settings → Security.</AccordionPanel>
      </AccordionItem>
      <AccordionItem value="sso" disabled>
        <AccordionTrigger>Single sign-on (Enterprise)</AccordionTrigger>
        <AccordionPanel>Available on the Enterprise plan.</AccordionPanel>
      </AccordionItem>
      <AccordionItem value="export">
        <AccordionTrigger>Can I export my data?</AccordionTrigger>
        <AccordionPanel>Download everything as JSON from Settings → Data.</AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
