import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from "@paneui/ui/components/accordion"

export default function AccordionDisabled() {
  return (
    <Accordion className="max-w-md">
      <AccordionItem value="history">
        <AccordionTrigger>Can I see my account history?</AccordionTrigger>
        <AccordionPanel>Every sign-in and change is listed under Settings → Security.</AccordionPanel>
      </AccordionItem>
      <AccordionItem value="sso" disabled>
        <AccordionTrigger>Single sign-on (Enterprise)</AccordionTrigger>
        <AccordionPanel>Available on the Enterprise plan.</AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
