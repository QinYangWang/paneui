import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from "@paneui/ui/components/accordion"

export default function AccordionBasic() {
  return (
    <Accordion defaultValue={["reset"]} className="max-w-md">
      <AccordionItem value="reset">
        <AccordionTrigger>How do I reset my password?</AccordionTrigger>
        <AccordionPanel>
          Choose “Forgot password” on the sign-in page and follow the link we email you. It expires after 24 hours.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="plan">
        <AccordionTrigger>Can I change my plan?</AccordionTrigger>
        <AccordionPanel>
          Yes. Upgrades apply right away; downgrades take effect at the end of the billing period.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="payment">
        <AccordionTrigger>Which payment methods do you accept?</AccordionTrigger>
        <AccordionPanel>All major cards, Apple Pay and bank transfer on yearly plans.</AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
