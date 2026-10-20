# Accordion

> Opens sections of content on demand.

Page: https://paneui.dev/docs/accordion/

## Installation

```bash
npx shadcn@latest add @paneui/accordion
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/accordion.json
```

Packages: `@base-ui/react`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`.

## Usage

```tsx
import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from "@/components/ui/accordion"
```

```tsx
<Accordion defaultValue={["item-1"]}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionPanel>Yes. It follows the WAI-ARIA accordion pattern.</AccordionPanel>
  </AccordionItem>
</Accordion>
```

## Composition

```text
Accordion
└── AccordionItem
    ├── AccordionTrigger
    └── AccordionPanel
```

## Examples

### Basic

Use for FAQs and settings where one open answer at a time is enough.

```tsx
import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from "@/registry/base-nova/ui/accordion"

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
```

### Multiple

```tsx
import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from "@/registry/base-nova/ui/accordion"

export default function AccordionMultiple() {
  return (
    <Accordion multiple defaultValue={["email", "push"]} className="max-w-md">
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
```

### Disabled

```tsx
import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from "@/registry/base-nova/ui/accordion"

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
```

### With icons

Use icons when readers scan the list by topic.

```tsx
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
```

### Borderless

Use the borderless variant inside cards or panels that already have a frame.

```tsx
import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from "@/registry/base-nova/ui/accordion"

export default function AccordionGhost() {
  return (
    <Accordion variant="ghost" defaultValue={["reset"]} className="max-w-md">
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
```

### Borderless, multiple

```tsx
import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from "@/registry/base-nova/ui/accordion"

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
```

### Borderless, disabled

```tsx
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
```

### Borderless, with icons

Use one icon family (solid) per list so the bare glyphs line up.

```tsx
import { BellIcon, SettingsIcon, ShieldIcon, UserIcon } from "@/components/icons"
import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from "@/registry/base-nova/ui/accordion"

export default function AccordionGhostWithIcons() {
  return (
    <Accordion variant="ghost" defaultValue={["security"]} className="max-w-md">
      <AccordionItem value="profile">
        <AccordionTrigger icon={<UserIcon />}>Profile</AccordionTrigger>
        <AccordionPanel>Your name, photo and the email we use for receipts.</AccordionPanel>
      </AccordionItem>
      <AccordionItem value="security">
        <AccordionTrigger icon={<ShieldIcon />}>Security</AccordionTrigger>
        <AccordionPanel>Two-factor sign-in, active sessions and recovery codes.</AccordionPanel>
      </AccordionItem>
      <AccordionItem value="notifications">
        <AccordionTrigger icon={<BellIcon />}>Notifications</AccordionTrigger>
        <AccordionPanel>Choose which events reach you by email, push or Slack.</AccordionPanel>
      </AccordionItem>
      <AccordionItem value="preferences">
        <AccordionTrigger icon={<SettingsIcon />}>Preferences</AccordionTrigger>
        <AccordionPanel>Theme, language and keyboard shortcuts.</AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
```

### RTL

```tsx
"use client"

import { DirectionProvider } from "@base-ui/react/direction-provider"
import { CreditCardIcon, LockIcon, MailIcon } from "@/components/icons"
import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from "@/registry/base-nova/ui/accordion"

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
```

## Motion

The panel height springs open (about 8% overshoot) and eases shut without bounce. With reduced motion the panel opens instantly.

## API Reference

Built on [the Accordion primitive](https://base-ui.com/react/components/accordion#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### Accordion

The container. Single-open by default. Also accepts every prop of [Accordion.Root](https://base-ui.com/react/components/accordion#root).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"default" \| "ghost"` | `"default"` | `default` is an inset well of raised rows; `ghost` is borderless, with spacing between items and rows that fill on hover. |
| `defaultValue` | `any[]` | — | Values of the items open on first render. |
| `value` | `any[]` | — | Controlled open items. |
| `onValueChange` | `(value: any[]) => void` | — | Called when items open or close. |
| `multiple` | `boolean` | `false` | Allow more than one open item. |
| `disabled` | `boolean` | `false` | Disable every item. |

### AccordionItem

Also accepts every prop of [Accordion.Item](https://base-ui.com/react/components/accordion#item).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `any` | — | Identifies the item in `value` / `defaultValue`. |
| `disabled` | `boolean` | `false` | Disable this item. |

| Data attribute | Description |
| --- | --- |
| `data-open` | Present while the item is open (raised card in `default`, soft fill in `ghost`). |

### AccordionTrigger

Also accepts every prop of [Accordion.Trigger](https://base-ui.com/react/components/accordion#trigger).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `icon` | `ReactNode` | — | Leading icon. In `default` it sits in a round chip that turns primary when open; in `ghost` it is bare at 16px and muted until open. The panel text lines up with the label. |

### AccordionPanel

Also accepts every prop of [Accordion.Panel](https://base-ui.com/react/components/accordion#panel).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `keepMounted` | `boolean` | `false` | Keep the content in the DOM while closed. |
| `typeset` | `boolean \| "docs" \| "reading" \| "chat"` | `false` | Turn prose styles back on for the panel content inside a `typeset` container, or name a preset when it stands alone. The content then keeps the surrounding text size and colour. |
