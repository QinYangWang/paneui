# Approval Card

> Asks the user to approve or decline an agent's action.

Page: https://paneui.dev/docs/approval-card/

## Installation

```bash
npx shadcn@latest add @paneui/approval-card
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/approval-card.json
```

Packages: `motion`.

Registry items it builds on: `@paneui/card`, `@paneui/badge`, `@paneui/button`, `@paneui/icons`, `@paneui/icon-chip`.

## Usage

```tsx
import { ApprovalCard } from "@/registry/base-nova/blocks/approval-card/approval-card"

export default function ApprovalCardDemo() {
  return <ApprovalCard />
}
```
