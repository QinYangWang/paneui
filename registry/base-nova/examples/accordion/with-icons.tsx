import { CreditCardIcon, LockIcon, MailIcon } from "@/components/icons"
import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from "@/registry/base-nova/ui/accordion"

export default function AccordionWithIcons() {
  return (
    <Accordion defaultValue={["billing"]} className="max-w-md">
      <AccordionItem value="billing">
        <AccordionTrigger icon={<CreditCardIcon />}>When am I charged?</AccordionTrigger>
        <AccordionPanel>On the first of each month, prorated when you switch plans.</AccordionPanel>
      </AccordionItem>
      <AccordionItem value="privacy">
        <AccordionTrigger icon={<LockIcon />}>Who can see my data?</AccordionTrigger>
        <AccordionPanel>Only you. Nothing is shared with third parties.</AccordionPanel>
      </AccordionItem>
      <AccordionItem value="support">
        <AccordionTrigger icon={<MailIcon />}>How do I reach support?</AccordionTrigger>
        <AccordionPanel>Reply to any receipt email; we usually answer within a few hours.</AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
