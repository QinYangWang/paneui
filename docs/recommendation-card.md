# Recommendation Card

> Shows an agent's suggestion for the user to accept or swap.

Page: https://paneui.dev/docs/recommendation-card/

## Installation

```bash
npx shadcn@latest add @paneui/recommendation-card
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/recommendation-card.json
```

Registry items it builds on: `@paneui/card`, `@paneui/badge`, `@paneui/button`.

## Usage

```tsx
import { RecommendationCard } from "@/registry/base-nova/blocks/recommendation-card/recommendation-card"

export default function RecommendationCardDemo() {
  return <RecommendationCard />
}
```
