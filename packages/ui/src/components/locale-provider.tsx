"use client"

import * as React from "react"

/**
 * Built-in strings the components show or announce. Strings that carry a value are functions.
 * Every component reads them from the nearest `LocaleProvider`; without one they are English.
 */
type LocaleLabels = {
  /* Overlays and notices */
  close: string
  back: string
  dismiss: string
  /* Fields */
  showPassword: string
  hidePassword: string
  clearSelection: string
  showOptions: string
  remove: string
  clear: string
  selectPlaceholder: string
  pickDate: string
  pickDates: string
  decrease: string
  increase: string
  /* Navigation */
  previousPage: string
  nextPage: string
  pagination: string
  page: (page: number) => string
  pageOf: (page: number, count: number) => string
  rowsPerPage: string
  previousMonth: string
  nextMonth: string
  presets: string
  previousSlide: string
  nextSlide: string
  breadcrumb: string
  showHiddenBreadcrumbs: string
  /* Status */
  loading: string
  working: string
  inProgress: string
  unread: string
  newActivity: string
  copy: string
  copied: string
  copyCode: string
  /* Chat */
  messageFrom: (from: string) => string
  typing: string
  jumpToLatest: string
  newMessages: string
  /* Agents */
  workingFor: (duration: string) => string
  workedFor: (duration: string) => string
  toolRunning: string
  toolDone: string
  toolFailed: string
  toolCancelled: string
  copyOutput: string
  runAgain: string
  streamingOutput: string
  finishedIn: (status: string, duration: string) => string
  sources: string
  plan: string
  copyResponse: string
  regenerate: string
  responseInterrupted: string
  goodResponse: string
  badResponse: string
  /* Composer */
  composerPlaceholder: string
  composerInput: string
  attachFiles: string
  dictate: string
  send: string
  stop: string
  filesAndFolders: string
  files: string
  commands: string
  /* Pickers */
  model: string
  mode: string
  reasoningEffort: string
  select: string
  searchPlaceholder: string
  noResults: string
  showAll: (count: number) => string
  effortLow: string
  effortLowDescription: string
  effortMedium: string
  effortMediumDescription: string
  effortHigh: string
  effortHighDescription: string
  /* Page navigation */
  onThisPage: string
  backToTop: string
  toggleSection: string
  toggleNamed: (label: string) => string
  /* Command palette */
  commandPalette: string
  searchCommands: string
  commandPlaceholder: string
  commandNoMatches: string
  navigate: string
  open: string
  /* Theme */
  toggleTheme: string
  switchToLightTheme: string
  switchToDarkTheme: string
  themeLight: string
  themeDark: string
  themeSystem: string
  themeCycle: (current: string, next: string) => string
  /* Art */
  coverArt: string
  /* Editable table */
  columnN: (n: number) => string
  columnName: string
  columnHeaderHint: string
  columnOptions: (column: string) => string
  insertBefore: string
  insertAfter: string
  insertColumnAfter: (column: string) => string
  rename: string
  renameNamed: (name: string) => string
  deleteColumn: string
  rowOptions: (row: number) => string
  insertAbove: string
  insertBelow: string
  insertRowBelow: (row: number) => string
  deleteRow: string
  noRows: string
  addFirstRow: string
  newRow: string
  cellLabel: (column: string, row: number) => string
  /* Tool approval */
  allowToolQuestion: string
  permissionRequest: (tool: string) => string
  riskLow: string
  riskMedium: string
  riskHigh: string
  showArguments: string
  hideArguments: string
  deny: string
  alwaysAllow: string
  approve: string
  approved: string
  alwaysAllowed: string
  denied: string
  revoke: string
  undo: string
  /* Files and diffs */
  editedFiles: (count: number) => string
  diffStats: (added: number, removed: number) => string
  review: string
  showFiles: string
  hideFiles: string
  revealFile: (path: string) => string
  diffLayout: string
  diffUnified: string
  diffSplit: string
  writingChanges: string
  copyNewFile: string
  showChanges: string
  hideChanges: string
  changesTo: (file: string) => string
  /* Workspace sidebar */
  workspace: string
  aiWorkspace: string
  bookmarks: string
  collapseSidebar: string
  expandSidebar: string
  searchWorkspace: string
  clearSearch: string
  nothingMatches: (query: string) => string
  /* Colour picker */
  saturationBrightness: string
  saturationBrightnessValue: (saturation: number, brightness: number) => string
  slider2d: string
  hue: string
  opacity: string
  hexColour: string
  /* Charts */
  chart: string
  candlestickChart: string
  compositionChart: string
  donutChart: string
  funnelChart: string
  treemapChart: string
  activityCalendar: string
  total: string
  value: string
  valueIn: (unit: string) => string
  share: string
  shareOfTotal: string
  shareOf: (group: string) => string
  item: string
  segment: string
  description: string
  period: string
  noDataForPeriod: string
  stage: string
  start: string
  ofFirst: string
  ofNamed: (label: string) => string
  ofPrevious: string
  dropOff: string
  stepRate: (percent: string) => string
  ofPreviousPercent: (percent: string) => string
  percentOf: (percent: string, of: string) => string
  chartData: (chart: string) => string
  chartDataShare: (chart: string) => string
  time: string
  priceOpen: string
  priceHigh: string
  priceLow: string
  priceClose: string
  volume: string
  volumeShort: string
  contributions: string
  ofBusiestDay: string
  less: string
  more: string
  activeDays: (active: number, total: number) => string
  inLastWeeks: (weeks: number) => string
  /* Pagination summary */
  results: string
  noItems: (noun: string) => string
  itemRange: (from: string, to: string, total: string, noun: string) => string
}

const en: LocaleLabels = {
  close: "Close",
  back: "Back",
  dismiss: "Dismiss",
  showPassword: "Show password",
  hidePassword: "Hide password",
  clearSelection: "Clear selection",
  showOptions: "Show options",
  remove: "Remove",
  clear: "Clear",
  selectPlaceholder: "Select…",
  pickDate: "Pick a date",
  pickDates: "Pick dates",
  decrease: "Decrease",
  increase: "Increase",
  previousPage: "Previous page",
  nextPage: "Next page",
  pagination: "Pagination",
  page: (n) => `Page ${n}`,
  pageOf: (n, count) => `Page ${n} of ${count}`,
  rowsPerPage: "Rows per page",
  previousMonth: "Previous month",
  nextMonth: "Next month",
  presets: "Presets",
  previousSlide: "Previous slide",
  nextSlide: "Next slide",
  breadcrumb: "Breadcrumb",
  showHiddenBreadcrumbs: "Show hidden breadcrumbs",
  loading: "Loading",
  working: "Working",
  inProgress: "In progress",
  unread: "Unread",
  newActivity: "New activity",
  copy: "Copy",
  copied: "Copied",
  copyCode: "Copy code",
  messageFrom: (from) => `${from} message`,
  typing: "Typing",
  jumpToLatest: "Jump to latest",
  newMessages: "New messages",
  workingFor: (d) => `Working for ${d}`,
  workedFor: (d) => `Worked for ${d}`,
  toolRunning: "Running",
  toolDone: "Done",
  toolFailed: "Failed",
  toolCancelled: "Cancelled",
  copyOutput: "Copy output",
  runAgain: "Run again",
  streamingOutput: "Streaming output…",
  finishedIn: (status, d) => `${status} in ${d}`,
  sources: "Sources",
  plan: "Plan",
  copyResponse: "Copy response",
  regenerate: "Regenerate",
  responseInterrupted: "The response was interrupted.",
  goodResponse: "Good response",
  badResponse: "Bad response",
  composerPlaceholder: "Ask anything, @tag files/folders, or use / to show available commands",
  composerInput: "Message",
  attachFiles: "Attach files",
  dictate: "Dictate",
  send: "Send",
  stop: "Stop",
  filesAndFolders: "Files and folders",
  files: "Files",
  commands: "Commands",
  model: "Model",
  mode: "Mode",
  reasoningEffort: "Reasoning effort",
  select: "Select",
  searchPlaceholder: "Search",
  noResults: "No results",
  showAll: (n) => `Show all ${n}`,
  effortLow: "Low",
  effortLowDescription: "Fastest, for small edits",
  effortMedium: "Medium",
  effortMediumDescription: "Balanced",
  effortHigh: "High",
  effortHighDescription: "Thinks longer on hard problems",
  onThisPage: "On this page",
  backToTop: "Back to top",
  toggleSection: "Toggle section",
  toggleNamed: (label) => `Toggle ${label}`,
  commandPalette: "Command palette",
  searchCommands: "Search commands",
  commandPlaceholder: "Search or jump to…",
  commandNoMatches: "Nothing matches that.",
  navigate: "Navigate",
  open: "Open",
  toggleTheme: "Toggle theme",
  switchToLightTheme: "Switch to light theme",
  switchToDarkTheme: "Switch to dark theme",
  themeLight: "Light",
  themeDark: "Dark",
  themeSystem: "System",
  themeCycle: (current, next) => `Theme: ${current}. Switch to ${next.toLowerCase()}`,
  coverArt: "Abstract cover illustration",
  columnN: (n) => `Column ${n}`,
  columnName: "Column name",
  columnHeaderHint: "Enter renames, Alt plus arrow keys moves the column",
  columnOptions: (c) => `${c} column options`,
  insertBefore: "Insert before",
  insertAfter: "Insert after",
  insertColumnAfter: (c) => `Insert column after ${c}`,
  rename: "Rename",
  renameNamed: (n) => `Rename ${n}`,
  deleteColumn: "Delete column",
  rowOptions: (r) => `Row ${r} options`,
  insertAbove: "Insert above",
  insertBelow: "Insert below",
  insertRowBelow: (r) => `Insert row below row ${r}`,
  deleteRow: "Delete row",
  noRows: "No rows",
  addFirstRow: "Add the first row",
  newRow: "New row",
  cellLabel: (c, r) => `${c}, row ${r}`,
  allowToolQuestion: "Allow this tool to run?",
  permissionRequest: (t) => `Permission request for ${t}`,
  riskLow: "Read only",
  riskMedium: "Makes changes",
  riskHigh: "Destructive",
  showArguments: "Show arguments",
  hideArguments: "Hide arguments",
  deny: "Deny",
  alwaysAllow: "Always allow",
  approve: "Approve",
  approved: "Approved",
  alwaysAllowed: "Always allowed",
  denied: "Denied",
  revoke: "Revoke",
  undo: "Undo",
  editedFiles: (n) => `Edited ${n} ${n === 1 ? "file" : "files"}`,
  diffStats: (a, r) => `${a} additions, ${r} deletions`,
  review: "Review",
  showFiles: "Show files",
  hideFiles: "Hide files",
  revealFile: (p) => `Reveal ${p}`,
  diffLayout: "Diff layout",
  diffUnified: "Unified",
  diffSplit: "Split",
  writingChanges: "Writing changes",
  copyNewFile: "Copy new file contents",
  showChanges: "Show changes",
  hideChanges: "Hide changes",
  changesTo: (f) => `Changes to ${f}`,
  workspace: "Workspace",
  aiWorkspace: "AI workspace",
  bookmarks: "Bookmarks",
  collapseSidebar: "Collapse sidebar",
  expandSidebar: "Expand sidebar",
  searchWorkspace: "Search workspace",
  clearSearch: "Clear search",
  nothingMatches: (q) => `Nothing matches “${q}”.`,
  saturationBrightness: "Saturation and brightness",
  saturationBrightnessValue: (s, b) => `Saturation ${s}%, brightness ${b}%`,
  slider2d: "2D slider",
  hue: "Hue",
  opacity: "Opacity",
  hexColour: "Hex colour",
  chart: "Chart",
  candlestickChart: "Candlestick chart",
  compositionChart: "Composition chart",
  donutChart: "Donut chart",
  funnelChart: "Funnel",
  treemapChart: "Treemap",
  activityCalendar: "Activity calendar",
  total: "Total",
  value: "Value",
  valueIn: (u) => `Value (${u})`,
  share: "Share",
  shareOfTotal: "Share of total",
  shareOf: (g) => `Share of ${g}`,
  item: "Item",
  segment: "Segment",
  description: "Description",
  period: "Period",
  noDataForPeriod: "No data for this period",
  stage: "Stage",
  start: "Start",
  ofFirst: "Of first",
  ofNamed: (l) => `Of ${l}`,
  ofPrevious: "Of previous",
  dropOff: "Drop-off",
  stepRate: (p) => `${p} step`,
  ofPreviousPercent: (p) => `${p} of previous`,
  percentOf: (p, of) => `${p} of ${of.toLowerCase()}`,
  chartData: (c) => `${c} data`,
  chartDataShare: (c) => `${c} data (share of visible series)`,
  time: "Time",
  priceOpen: "Open",
  priceHigh: "High",
  priceLow: "Low",
  priceClose: "Close",
  volume: "Volume",
  volumeShort: "Vol",
  contributions: "contributions",
  ofBusiestDay: "Of busiest day",
  less: "Less",
  more: "More",
  activeDays: (a, t) => `${a}/${t} active days`,
  inLastWeeks: (w) => `in the last ${w} weeks`,
  results: "results",
  noItems: (n) => `No ${n}`,
  itemRange: (f, t, total, n) => `${f}–${t} of ${total} ${n}`,
}

const zhCN: LocaleLabels = {
  close: "关闭",
  back: "返回",
  dismiss: "忽略",
  showPassword: "显示密码",
  hidePassword: "隐藏密码",
  clearSelection: "清除选择",
  showOptions: "显示选项",
  remove: "移除",
  clear: "清除",
  selectPlaceholder: "请选择…",
  pickDate: "选择日期",
  pickDates: "选择日期范围",
  decrease: "减少",
  increase: "增加",
  previousPage: "上一页",
  nextPage: "下一页",
  pagination: "分页",
  page: (n) => `第 ${n} 页`,
  pageOf: (n, count) => `第 ${n} / ${count} 页`,
  rowsPerPage: "每页行数",
  previousMonth: "上个月",
  nextMonth: "下个月",
  presets: "预设",
  previousSlide: "上一张",
  nextSlide: "下一张",
  breadcrumb: "路径",
  showHiddenBreadcrumbs: "显示隐藏的路径",
  loading: "加载中",
  working: "处理中",
  inProgress: "进行中",
  unread: "未读",
  newActivity: "有新动态",
  copy: "复制",
  copied: "已复制",
  copyCode: "复制代码",
  messageFrom: (from) => `${from} 的消息`,
  typing: "正在输入",
  jumpToLatest: "跳到最新",
  newMessages: "新消息",
  workingFor: (d) => `已工作 ${d}`,
  workedFor: (d) => `工作了 ${d}`,
  toolRunning: "运行中",
  toolDone: "完成",
  toolFailed: "失败",
  toolCancelled: "已取消",
  copyOutput: "复制输出",
  runAgain: "重新运行",
  streamingOutput: "正在输出…",
  finishedIn: (status, d) => `${status}，用时 ${d}`,
  sources: "来源",
  plan: "计划",
  copyResponse: "复制回答",
  regenerate: "重新生成",
  responseInterrupted: "回答中断了。",
  goodResponse: "有帮助",
  badResponse: "没帮助",
  composerPlaceholder: "输入消息，@ 引用文件，/ 使用命令",
  composerInput: "消息",
  attachFiles: "添加文件",
  dictate: "语音输入",
  send: "发送",
  stop: "停止",
  filesAndFolders: "文件和文件夹",
  files: "文件",
  commands: "命令",
  model: "模型",
  mode: "模式",
  reasoningEffort: "思考强度",
  select: "选择",
  searchPlaceholder: "搜索",
  noResults: "没有结果",
  showAll: (n) => `显示全部 ${n} 个`,
  effortLow: "低",
  effortLowDescription: "最快，适合小改动",
  effortMedium: "中",
  effortMediumDescription: "兼顾速度和深度",
  effortHigh: "高",
  effortHighDescription: "难题上想得更久",
  onThisPage: "本页目录",
  backToTop: "回到顶部",
  toggleSection: "展开或收起分组",
  toggleNamed: (label) => `展开或收起“${label}”`,
  commandPalette: "命令面板",
  searchCommands: "搜索命令",
  commandPlaceholder: "搜索或跳转到…",
  commandNoMatches: "没有匹配的结果。",
  navigate: "选择",
  open: "打开",
  toggleTheme: "切换主题",
  switchToLightTheme: "切换到浅色主题",
  switchToDarkTheme: "切换到深色主题",
  themeLight: "浅色",
  themeDark: "深色",
  themeSystem: "跟随系统",
  themeCycle: (current, next) => `主题：${current}，切换到${next}`,
  coverArt: "抽象封面插图",
  columnN: (n) => `第 ${n} 列`,
  columnName: "列名",
  columnHeaderHint: "按回车重命名，按 Alt 加方向键移动列",
  columnOptions: (c) => `“${c}”列选项`,
  insertBefore: "在前面插入",
  insertAfter: "在后面插入",
  insertColumnAfter: (c) => `在“${c}”后插入列`,
  rename: "重命名",
  renameNamed: (n) => `重命名“${n}”`,
  deleteColumn: "删除列",
  rowOptions: (r) => `第 ${r} 行选项`,
  insertAbove: "在上方插入",
  insertBelow: "在下方插入",
  insertRowBelow: (r) => `在第 ${r} 行下方插入行`,
  deleteRow: "删除行",
  noRows: "没有数据",
  addFirstRow: "添加第一行",
  newRow: "新建行",
  cellLabel: (c, r) => `${c}，第 ${r} 行`,
  allowToolQuestion: "允许运行这个工具吗？",
  permissionRequest: (t) => `${t} 的权限请求`,
  riskLow: "只读",
  riskMedium: "会修改内容",
  riskHigh: "破坏性操作",
  showArguments: "显示参数",
  hideArguments: "隐藏参数",
  deny: "拒绝",
  alwaysAllow: "始终允许",
  approve: "允许",
  approved: "已允许",
  alwaysAllowed: "已始终允许",
  denied: "已拒绝",
  revoke: "撤销授权",
  undo: "撤销",
  editedFiles: (n) => `编辑了 ${n} 个文件`,
  diffStats: (a, r) => `新增 ${a} 行，删除 ${r} 行`,
  review: "查看",
  showFiles: "显示文件",
  hideFiles: "隐藏文件",
  revealFile: (p) => `定位到 ${p}`,
  diffLayout: "对比布局",
  diffUnified: "合并",
  diffSplit: "并排",
  writingChanges: "正在写入改动",
  copyNewFile: "复制新文件内容",
  showChanges: "显示改动",
  hideChanges: "隐藏改动",
  changesTo: (f) => `${f} 的改动`,
  workspace: "工作区",
  aiWorkspace: "AI 工作区",
  bookmarks: "书签",
  collapseSidebar: "收起侧边栏",
  expandSidebar: "展开侧边栏",
  searchWorkspace: "搜索工作区",
  clearSearch: "清除搜索",
  nothingMatches: (q) => `没有匹配“${q}”的内容。`,
  saturationBrightness: "饱和度和亮度",
  saturationBrightnessValue: (s, b) => `饱和度 ${s}%，亮度 ${b}%`,
  slider2d: "二维滑块",
  hue: "色相",
  opacity: "不透明度",
  hexColour: "十六进制颜色",
  chart: "图表",
  candlestickChart: "K 线图",
  compositionChart: "构成图",
  donutChart: "环形图",
  funnelChart: "漏斗图",
  treemapChart: "矩形树图",
  activityCalendar: "活动日历",
  total: "合计",
  value: "数值",
  valueIn: (u) => `数值（${u}）`,
  share: "占比",
  shareOfTotal: "占总数",
  shareOf: (g) => `占${g}`,
  item: "项目",
  segment: "分段",
  description: "说明",
  period: "时段",
  noDataForPeriod: "这段时间没有数据",
  stage: "阶段",
  start: "起点",
  ofFirst: "占第一步",
  ofNamed: (l) => `占${l}`,
  ofPrevious: "占上一步",
  dropOff: "流失",
  stepRate: (p) => `本步 ${p}`,
  ofPreviousPercent: (p) => `占上一步 ${p}`,
  percentOf: (p, of) => `占${of} ${p}`,
  chartData: (c) => `${c}数据`,
  chartDataShare: (c) => `${c}数据（占可见系列的比例）`,
  time: "时间",
  priceOpen: "开盘",
  priceHigh: "最高",
  priceLow: "最低",
  priceClose: "收盘",
  volume: "成交量",
  volumeShort: "量",
  contributions: "次贡献",
  ofBusiestDay: "占最忙一天",
  less: "少",
  more: "多",
  activeDays: (a, t) => `活跃 ${a}/${t} 天`,
  inLastWeeks: (w) => `（最近 ${w} 周）`,
  results: "结果",
  noItems: (n) => `没有${n}`,
  itemRange: (f, t, total, n) => `${f}–${t}，共 ${total} 个${n}`,
}

/** Built-in label sets, keyed by BCP 47 tag. */
const localeLabels: Record<string, LocaleLabels> = { en, "zh-CN": zhCN }

/** The built-in set for a tag: exact match first, then the language alone (`zh-Hans` → `zh-CN`). */
function labelsFor(locale: string): LocaleLabels | undefined {
  if (localeLabels[locale]) return localeLabels[locale]
  const lang = locale.toLowerCase().split(/[-_]/)[0]
  const key = Object.keys(localeLabels).find((k) => k.toLowerCase().split("-")[0] === lang)
  return key ? localeLabels[key] : undefined
}

type LocaleContextValue = { locale: string; labels: LocaleLabels }

const LocaleContext = React.createContext<LocaleContextValue>({ locale: "en", labels: en })

type LocaleProviderProps = {
  /** BCP 47 tag. Picks a built-in label set when one matches; otherwise the parent's (English at the root) stays. */
  locale?: string
  /** Overrides on top of the locale's set. Anything left out keeps its built-in string. */
  labels?: Partial<LocaleLabels>
  children?: React.ReactNode
}

/** Sets the language of every built-in label below it. Providers nest; the inner one wins per key. */
function LocaleProvider({ locale, labels, children }: LocaleProviderProps) {
  const parent = React.useContext(LocaleContext)
  const value = React.useMemo<LocaleContextValue>(() => {
    const base = (locale && labelsFor(locale)) || parent.labels
    return { locale: locale ?? parent.locale, labels: labels ? { ...base, ...stripUndefined(labels) } : base }
  }, [locale, labels, parent])
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

function stripUndefined(labels: Partial<LocaleLabels>) {
  return Object.fromEntries(Object.entries(labels).filter(([, v]) => v !== undefined)) as Partial<LocaleLabels>
}

/** The current locale tag and its labels. */
function useLocale() {
  return React.useContext(LocaleContext)
}

/** Keys whose label is a plain string. */
type LocaleTextKey = { [K in keyof LocaleLabels]: LocaleLabels[K] extends string ? K : never }[keyof LocaleLabels]

/** One built-in label as text, so a component without client code can still show the current locale's string. */
function LocaleText({ label }: { label: LocaleTextKey }) {
  return useLocale().labels[label]
}

export { LocaleProvider, LocaleText, useLocale, localeLabels, type LocaleLabels, type LocaleProviderProps, type LocaleTextKey }
