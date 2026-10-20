import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from "@paneui/ui/components/accordion"

export default function AccordionGhostMultiple() {
  return (
    <Accordion variant="ghost" multiple defaultValue={["email", "push"]} className="max-w-md">
      <AccordionItem value="email">
        <AccordionTrigger>Email</AccordionTrigger>
        <AccordionPanel>A daily digest of mentions and finished runs.</AccordionPanel>
      </AccordionItem>
      <AccordionItem value="push">
        <AccordionTrigger>Push</AccordionTrigger>
        <AccordionPanel>Only approvals and failures, sent to your phone.</AccordionPanel>
      </AccordionItem>
      <AccordionItem value="slack">
        <AccordionTrigger>Slack</AccordionTrigger>
        <AccordionPanel>Post summaries to a channel of your choice.</AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
