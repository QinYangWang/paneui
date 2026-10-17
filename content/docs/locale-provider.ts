import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { LocaleProvider } from "@/components/ui/locale-provider"`,
    code: `<LocaleProvider locale="zh-CN">
  <App />
</LocaleProvider>`,
  },
  examples: [{ id: "overrides", title: "Overrides", description: "Use `labels` to reword a few strings and keep the rest." }],
  notes: [
    { title: "Locales", body: "Built in are `en` (the default without a provider) and `zh-CN`; a tag matches by language too, so `zh-Hans` and `zh-TW` get `zh-CN`. Any other tag keeps the parent's strings, which you can replace with `labels`." },
    { title: "Merging", body: "`labels` is merged over the locale's set key by key, and nested providers merge over their parent. A component prop such as `label` or `jumpLabel` still wins over the provider." },
    { title: "Coverage", body: "Close, back and dismiss buttons on overlays, toasts and alerts; password, combobox, multi-select, stepper and date fields; pagination, calendar, carousel and breadcrumb controls; loaders, code copy buttons, messages and the message scroller; the page outline, sidebar nav, command palette, theme toggle and cover art; and the agent parts (work summary, tool result, streaming response, thread rows, model pickers, composer and tab bar badges)." },
    { title: "Navigation and theme keys", body: "`onThisPage`, `backToTop`, `toggleSection`, `toggleNamed(label)`, `commandPalette`, `searchCommands`, `commandPlaceholder`, `commandNoMatches`, `navigate`, `open`, `toggleTheme`, `switchToLightTheme`, `switchToDarkTheme`, `themeLight`, `themeDark`, `themeSystem`, `themeCycle(current, next)` and `coverArt`. The command palette also reads `commands` and `close`, and the sidebar search reads `searchPlaceholder`." },
    { title: "Values", body: "Strings that carry a value are functions, such as `workedFor: (duration) => …` and `page: (n) => …`." },
  ],
  api: [
    {
      name: "LocaleProvider",
      props: [
        { name: "locale", type: "string", description: "BCP 47 tag. Picks a built-in label set when one matches." },
        { name: "labels", type: "Partial<LocaleLabels>", description: "Overrides on top of the locale's set." },
      ],
    },
    { name: "useLocale", description: "Returns `{ locale, labels }` for your own components.", props: [] },
    { name: "localeLabels", description: "The built-in sets, keyed by tag; spread one to start a new language.", props: [] },
    { name: "LocaleText", description: "`<LocaleText label=\"backToTop\" />` renders one string label, so a component without client code can show it.", props: [{ name: "label", type: "LocaleTextKey", required: true, description: "A key whose label is a string." }] },
  ],
} satisfies ComponentDoc
