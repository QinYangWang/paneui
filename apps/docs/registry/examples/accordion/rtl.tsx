"use client"

import { DirectionProvider } from "@base-ui/react/direction-provider"
import { CreditCardIcon, LockIcon, MailIcon } from "@paneui/ui/icons"
import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from "@paneui/ui/components/accordion"

const faqs = [
  { value: "billing", icon: <CreditCardIcon />, title: "متى يتم الدفع؟", body: "في الأول من كل شهر. يمكنك التحويل إلى الفوترة السنوية في أي وقت." },
  { value: "privacy", icon: <LockIcon />, title: "من يرى بياناتي؟", body: "أنت فقط. لا نشارك حساباتك المتصلة مع أي جهة." },
  { value: "support", icon: <MailIcon />, title: "كيف أتواصل مع الدعم؟", body: "رد على أي إيصال يصلك بالبريد، وسنجيب خلال ساعات." },
]

export default function AccordionRtl() {
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl" className="w-full max-w-md">
        <Accordion defaultValue={["billing"]}>
          {faqs.map((faq) => (
            <AccordionItem key={faq.value} value={faq.value}>
              <AccordionTrigger icon={faq.icon}>{faq.title}</AccordionTrigger>
              <AccordionPanel className="ps-13">{faq.body}</AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </DirectionProvider>
  )
}
