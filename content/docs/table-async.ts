import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { AsyncTable } from "@/components/ui/table-async"`,
    code: `<AsyncTable
  aria-label="Events"
  columns={columns}
  loadPage={async (page, signal) => {
    const res = await fetch(\`/api/events?page=\${page}\`, { signal })
    return res.json() // { rows, hasMore }
  }}
/>`,
  },
  examples: [
    {
      id: "error-retry",
      title: "Error and Retry",
      description: "When `loadPage` rejects, a retry band replaces the footer (or a “Try again” empty state if nothing has loaded). Page 3 fails once here — scroll down.",
    },
    {
      id: "reset-key",
      title: "Reset Key and End Message",
      description: "Change `resetKey` (a filter) to drop loaded pages, abort the in-flight request and start again from the top. `endMessage` replaces the end-of-list note.",
    },
    {
      id: "use-async-pages",
      title: "useAsyncPages",
      description: "The paging hook on its own, for lists that are not a table.",
    },
  ],
  notes: [
    {
      title: "Accessibility",
      body: "The table sets `aria-busy` while a page loads; the loading band is a `status` and the error bands are `alert`s.",
    },
    {
      title: "Related",
      body: "Built on [Table](/docs/table). See also [Table Editable](/docs/table-editable).",
    },
  ],
  api: [
    {
      name: "AsyncTable",
      description: "Table that loads page by page as the list nears its end. Takes every `Table` prop except `data`, `loading`, `onEndReached` and `footer`.",
      extends: "Table",
      extendsHref: "/docs/table",
      props: [
        { name: "loadPage", type: "(page: number, signal: AbortSignal) => Promise<AsyncPage<T>>", required: true, description: "Fetch one page; reject to show the retry footer. Honour `signal` to cancel." },
        { name: "resetKey", type: "unknown", description: "Change to throw away loaded pages and start again (e.g. a new filter)." },
        { name: "endMessage", type: "ReactNode | ((count: number) => ReactNode)", description: "Shown under the last row once every page is in. Pass `null` to hide." },
        { name: "onStatusChange", type: `(status: "loading" | "idle" | "error" | "done", rowCount: number) => void`, description: "Called when the load status or row count changes." },
      ],
    },
    {
      name: "AsyncPage",
      description: "What `loadPage` resolves to.",
      props: [
        { name: "rows", type: "readonly T[]", required: true, description: "The page's rows." },
        { name: "hasMore", type: "boolean", required: true, description: "`false` once the last page has arrived." },
      ],
    },
    {
      name: "useAsyncPages",
      description: "`useAsyncPages(loadPage, resetKey?)` fetches page 0 on mount and on `resetKey` change, then one page per `loadMore`. Returns:",
      props: [
        { name: "rows", type: "T[]", description: "Everything loaded so far." },
        { name: "status", type: `"loading" | "idle" | "error" | "done"`, description: "Current state." },
        { name: "error", type: "unknown", description: "The last rejection." },
        { name: "pages", type: "number", description: "Number of pages received." },
        { name: "loadMore", type: "() => void", description: "Fetch the next page (ignored unless `idle`)." },
        { name: "retry", type: "() => void", description: "Re-request the page that failed." },
        { name: "reload", type: "() => void", description: "Start again from page 0." },
      ],
    },
  ],
} satisfies ComponentDoc
