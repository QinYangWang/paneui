# SaaS

> Pages for a product website and dashboard.

Page: https://paneui.dev/docs/saas/

## Installation

```bash
npx shadcn@latest add @paneui/saas
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/saas.json
```

Packages: `motion`, `simple-icons`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/otp-input`, `@paneui/signup-form`, `@paneui/avatar`, `@paneui/button`, `@paneui/button-stateful`, `@paneui/checkbox`, `@paneui/field`, `@paneui/icon-chip`, `@paneui/input`, `@paneui/password-input`, `@paneui/stat-card`, `@paneui/theme-toggle`, `@paneui/drawer`, `@paneui/badge`, `@paneui/accordion`, `@paneui/card`, `@paneui/marquee`, `@paneui/number-ticker`, `@paneui/segmented-control`, `@paneui/shader-background`, `@paneui/text-reveal`, `@paneui/trend-chart`, `@paneui/accent-picker`, `@paneui/toast`, `@paneui/tooltip`, `@paneui/page-header`, `@paneui/settings-section`, `@paneui/data-table`, `@paneui/dialog`, `@paneui/menu`, `@paneui/radio`, `@paneui/select`, `@paneui/switch`, `@paneui/table`, `@paneui/textarea`, `@paneui/usage-meter`, `@paneui/bar-list`, `@paneui/date-range-picker`, `@paneui/donut-chart`, `@paneui/empty-state`, `@paneui/command-palette`, `@paneui/animated-sidebar`, `@paneui/breadcrumb`, `@paneui/user-menu`, `@paneui/alert`, `@paneui/app-shell`, `@paneui/brand-icon`, `@paneui/input-group`, `@paneui/kbd`.

## Usage

```tsx
// Live preview: /templates/saas (pages under /templates/saas/dashboard, /login, …)
import { HomePage } from "@/registry/base-nova/templates/saas/components/marketing/pages"

export default function SaasDemo() {
  return <HomePage />
}
```
