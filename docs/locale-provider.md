# Locale Provider

> Sets the language of every built-in label.

Page: https://paneui.dev/docs/locale-provider/

## Installation

```bash
npx shadcn@latest add @paneui/locale-provider
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/locale-provider.json
```

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
import { LocaleProvider } from "@/components/ui/locale-provider"
```

```tsx
<LocaleProvider locale="zh-CN">
  <App />
</LocaleProvider>
```

## Examples

### Overrides

```tsx
"use client"

import { LocaleProvider } from "@/registry/base-nova/ui/locale-provider"
import { WorkSummary, WorkSummaryStep } from "@/registry/base-nova/ui/work-summary"

export default function LocaleProviderOverrides() {
  return (
    <LocaleProvider labels={{ workedFor: (d) => `Took ${d}` }}>
      <WorkSummary duration={12}>
        <WorkSummaryStep kind="search" title="Searched the docs" />
      </WorkSummary>
    </LocaleProvider>
  )
}
```

## Locales

Built in are `en` (the default without a provider) and `zh-CN`; a tag matches by language too, so `zh-Hans` and `zh-TW` get `zh-CN`. Any other tag keeps the parent's strings, which you can replace with `labels`.

## Merging

`labels` is merged over the locale's set key by key, and nested providers merge over their parent. A component prop such as `label` or `jumpLabel` still wins over the provider.

## Coverage

Close, back and dismiss buttons on overlays, toasts and alerts; password, combobox, multi-select, stepper and date fields; pagination, calendar, carousel and breadcrumb controls; loaders, code copy buttons, messages and the message scroller; the page outline, sidebar nav, command palette, theme toggle and cover art; the agent parts (work summary, tool result, tool approval, edited files, file diffs, streaming response, thread rows, model pickers, composer and tab bar badges); the AI sidebar, editable table, colour picker, pagination summary and chart captions, tooltips and data tables.

## Navigation and theme keys

`onThisPage`, `backToTop`, `toggleSection`, `toggleNamed(label)`, `commandPalette`, `searchCommands`, `commandPlaceholder`, `commandNoMatches`, `navigate`, `open`, `toggleTheme`, `switchToLightTheme`, `switchToDarkTheme`, `themeLight`, `themeDark`, `themeSystem`, `themeCycle(current, next)` and `coverArt`. The command palette also reads `commands` and `close`, and the sidebar search reads `searchPlaceholder`.

## Table, file and chart keys

`insertBefore` and `insertAfter` name the column inserts by reading order, so they stay right in right-to-left. Charts read `chart`, `total`, `value`, `share` and their own names (`donutChart`, `funnelChart`…); file parts read `editedFiles(count)`, `diffStats(added, removed)` and `changesTo(file)`; `PaginationSummary` reads `results`, `noItems(noun)` and `itemRange(from, to, total, noun)`.

## Values

Strings that carry a value are functions, such as `workedFor: (duration) => …` and `page: (n) => …`.

## API Reference

### LocaleProvider

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `locale` | `string` | — | BCP 47 tag. Picks a built-in label set when one matches. |
| `labels` | `Partial<LocaleLabels>` | — | Overrides on top of the locale's set. |

### useLocale

Returns `{ locale, labels }` for your own components.

### localeLabels

The built-in sets, keyed by tag; spread one to start a new language.

### LocaleText

`<LocaleText label="backToTop" />` renders one string label, so a component without client code can show it.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` (required) | `LocaleTextKey` | — | A key whose label is a string. |
