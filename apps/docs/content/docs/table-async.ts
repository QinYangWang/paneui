import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Loads table rows page by page as the reader scrolls.", "zh": "随滚动逐页加载数据。"},
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
      title: { en: "Error and Retry", zh: "错误与重试" },
      description: { en: "Use when the source can fail mid-list; page 3 fails once here, so scroll down.", zh: "适用于分页过程中可能加载失败的数据源。" },
    },
    {
      id: "reset-key",
      title: { en: "Reset Key and End Message", zh: "重置键与结束消息" },
    },
    {
      id: "use-async-pages",
      title: { en: "useAsyncPages", zh: "useAsyncPages" },
      description: { en: "Use for paged lists that are not a table.", zh: "适用于表格以外的分页列表。" },
    },
  ],
  notes: [
    {
      title: "Errors",
      body: { en: "When `loadPage` rejects, a retry band replaces the footer, or a “Try again” empty state shows if nothing has loaded yet.", zh: "当 `loadPage` 拒绝时，重试栏会替换底部，或者如果尚未加载任何内容则显示“Try again”空状态。" },
    },
    {
      title: "Accessibility",
      body: { en: "The table sets `aria-busy` while a page loads; the loading band is a `status` and the error bands are `alert`s.", zh: "加载页面时表格会设置 `aria-busy`；加载栏是 `status`，错误栏是 `alert`。" },
    },
    {
      title: "Related",
      body: { en: "Built on [Table](/docs/table). See also [Table Editable](/docs/table-editable).", zh: "基于 [Table](/docs/table) 构建。另见 [Table Editable](/docs/table-editable)。" },
    },
  ],
  api: [
    {
      name: "AsyncTable",
      description: { en: "Table that loads page by page as the list nears its end. Takes every `Table` prop except `data`, `loading`, `onEndReached` and `footer`.", zh: "在列表接近末尾时逐页加载的表格。接受除 `data`、`loading`、`onEndReached` 和 `footer` 之外的所有 `Table` 属性。" },
      extends: "Table",
      extendsHref: "/docs/table",
      props: [
        { name: "loadPage", type: "(page: number, signal: AbortSignal) => Promise<AsyncPage<T>>", required: true, description: { en: "Fetch one page; reject to show the retry footer. Honour `signal` to cancel.", zh: "获取一页；拒绝以显示重试底部。遵循 `signal` 以取消。" } },
        { name: "resetKey", type: "unknown", description: { en: "Change to drop loaded pages, abort the in-flight request and start again from the top (e.g. a new filter).", zh: "更改后丢弃已加载的页、中止进行中的请求并从顶部重新开始（例如新的筛选）。" } },
        { name: "endMessage", type: "ReactNode | ((count: number) => ReactNode)", description: { en: "Replaces the end-of-list note shown once every page is in. Pass `null` to hide.", zh: "替换所有页加载后显示的列表结束提示。传 `null` 隐藏。" } },
        { name: "onStatusChange", type: `(status: "loading" | "idle" | "error" | "done", rowCount: number) => void`, description: { en: "Called when the load status or row count changes.", zh: "加载状态或行数变化时调用。" } },
      ],
    },
    {
      name: "AsyncPage",
      description: { en: "What `loadPage` resolves to.", zh: "`loadPage` 解析的结果。" },
      props: [
        { name: "rows", type: "readonly T[]", required: true, description: { en: "The page's rows.", zh: "该页的行。" } },
        { name: "hasMore", type: "boolean", required: true, description: { en: "`false` once the last page has arrived.", zh: "最后一页到达后为 `false`。" } },
      ],
    },
    {
      name: "useAsyncPages",
      description: { en: "`useAsyncPages(loadPage, resetKey?)` fetches page 0 on mount and on `resetKey` change, then one page per `loadMore`. Returns:", zh: "`useAsyncPages(loadPage, resetKey?)` 在挂载时和 `resetKey` 变化时获取第 0 页，之后每次 `loadMore` 获取一页。返回：" },
      props: [
        { name: "rows", type: "T[]", description: { en: "Everything loaded so far.", zh: "目前已加载的全部内容。" } },
        { name: "status", type: `"loading" | "idle" | "error" | "done"`, description: { en: "Current state.", zh: "当前状态。" } },
        { name: "error", type: "unknown", description: { en: "The last rejection.", zh: "最近一次拒绝。" } },
        { name: "pages", type: "number", description: { en: "Number of pages received.", zh: "已收到的页数。" } },
        { name: "loadMore", type: "() => void", description: { en: "Fetch the next page (ignored unless `idle`).", zh: "获取下一页（除非 `idle`，否则忽略）。" } },
        { name: "retry", type: "() => void", description: { en: "Re-request the page that failed.", zh: "重新请求失败的页。" } },
        { name: "reload", type: "() => void", description: { en: "Start again from page 0.", zh: "从第 0 页重新开始。" } },
      ],
    },
  ],
} satisfies ComponentDoc
