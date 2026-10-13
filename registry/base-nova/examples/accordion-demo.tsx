"use client"

import { CreditCardIcon, LockIcon, MailIcon } from "@/components/icons"
import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from "@/registry/base-nova/ui/accordion"

const faqs = [
  {
    value: "billing",
    icon: <CreditCardIcon />,
    title: "When am I charged?",
    body: "On the first of each month. You can switch to yearly billing any time and we’ll prorate the difference.",
  },
  {
    value: "privacy",
    icon: <LockIcon />,
    title: "Who can see my data?",
    body: "Only you. Connected accounts are read on demand and never shared with third parties.",
  },
  {
    value: "support",
    icon: <MailIcon />,
    title: "How do I reach support?",
    body: "Reply to any receipt email, or write to help@example.com. We usually answer within a few hours.",
  },
]

export default function AccordionDemo() {
  return (
    <Accordion defaultValue={["billing"]} className="max-w-md">
      {faqs.map((faq) => (
        <AccordionItem key={faq.value} value={faq.value}>
          <AccordionTrigger icon={faq.icon}>{faq.title}</AccordionTrigger>
          <AccordionPanel className="pl-13">{faq.body}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
