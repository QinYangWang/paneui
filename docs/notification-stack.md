# Notification Stack

> Groups notifications for review.

Page: https://paneui.dev/docs/notification-stack/

## Installation

```bash
npx shadcn@latest add @paneui/notification-stack
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/notification-stack.json
```

Packages: `motion`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/icon-chip`.

## Usage

```tsx
"use client"

import * as React from "react"

import { CalendarIcon, CheckCircleIcon, CreditCardIcon, MailIcon, WarningIcon } from "@/components/icons"
import {
  NotificationStack,
  type NotificationStackItem,
} from "@/registry/base-nova/blocks/notification-stack/notification-stack"

const initial: NotificationStackItem[] = [
  {
    id: "deploy",
    icon: <CheckCircleIcon />,
    tone: "success",
    title: "Deploy finished",
    description: "web-app@a41f2c is live on production in 48s.",
    time: "now",
  },
  {
    id: "invoice",
    icon: <CreditCardIcon />,
    tone: "primary",
    title: "Invoice paid",
    description: "Northwind paid INV-2041 for $1,280.00.",
    time: "4m",
  },
  {
    id: "standup",
    icon: <CalendarIcon />,
    title: "Standup in 10 minutes",
    description: "Design sync · Room 4B and on Meet.",
    time: "9m",
  },
  {
    id: "quota",
    icon: <WarningIcon />,
    tone: "warning",
    title: "Storage at 82%",
    description: "Archive old builds or upgrade before Friday.",
    time: "1h",
  },
  {
    id: "mail",
    icon: <MailIcon />,
    title: "3 new messages",
    description: "From Mia, Jonas and the billing team.",
    time: "2h",
  },
]

export default function NotificationStackDemo() {
  const [items, setItems] = React.useState(initial)
  return (
    <div className="flex min-h-80 w-full max-w-sm flex-col">
      <NotificationStack
        items={items}
        onDismiss={(id) => setItems((list) => list.filter((item) => item.id !== id))}
        onViewAll={() => setItems(initial)}
      />
    </div>
  )
}
```
