import type { Monaco } from "@monaco-editor/react"

let ctx: CanvasRenderingContext2D | null = null

/**
 * A theme token (`--background`, `--primary`…) as `#rrggbbaa`, the only colour
 * format the editor accepts. The browser resolves any CSS colour (oklch,
 * var() chains, alpha) by painting one pixel.
 */
function token(name: string, alpha = 1) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  if (!ctx) {
    const canvas = document.createElement("canvas")
    canvas.width = canvas.height = 1
    ctx = canvas.getContext("2d", { willReadFrequently: true })
  }
  if (!ctx || !value) return "#00000000"
  ctx.clearRect(0, 0, 1, 1)
  ctx.fillStyle = "#000"
  ctx.fillStyle = value
  ctx.fillRect(0, 0, 1, 1)
  const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data
  const hex = (n: number) => Math.round(n).toString(16).padStart(2, "0")
  return `#${hex(r)}${hex(g)}${hex(b)}${hex(a * alpha)}`
}

export const EDITOR_THEME = "workspace-tokens"

export function isDark() {
  return document.documentElement.classList.contains("dark")
}

/** Define (or redefine) the editor theme from the current CSS tokens and apply it. */
export function applyEditorTheme(monaco: Monaco) {
  const dark = isDark()
  const fg = (a: number) => token("--foreground", a)
  const primary = (a: number) => token("--primary", a)
  const muted = token("--muted-foreground")
  monaco.editor.defineTheme(EDITOR_THEME, {
    base: dark ? "vs-dark" : "vs",
    inherit: true,
    rules: [{ token: "comment", foreground: muted.slice(1, 7), fontStyle: "italic" }],
    colors: {
      "editor.background": token("--background"),
      "editor.foreground": token("--foreground"),
      "editorGutter.background": token("--background"),
      "minimap.background": token("--background"),
      "editorLineNumber.foreground": token("--muted-foreground", 0.7),
      "editorLineNumber.activeForeground": token("--foreground"),
      "editorCursor.foreground": primary(1),
      "editor.selectionBackground": primary(dark ? 0.35 : 0.2),
      "editor.inactiveSelectionBackground": primary(dark ? 0.2 : 0.12),
      "editor.selectionHighlightBackground": primary(0.12),
      "editor.wordHighlightBackground": fg(0.06),
      "editor.findMatchBackground": token("--warning", 0.45),
      "editor.findMatchHighlightBackground": token("--warning", 0.22),
      "editor.lineHighlightBackground": fg(dark ? 0.04 : 0.03),
      "editor.lineHighlightBorder": "#00000000",
      "editorIndentGuide.background1": token("--border"),
      "editorIndentGuide.activeBackground1": fg(0.24),
      "editorWhitespace.foreground": fg(0.18),
      "editorBracketMatch.background": primary(0.12),
      "editorBracketMatch.border": primary(0.5),
      "editorError.foreground": token("--destructive"),
      "editorWarning.foreground": token("--warning"),
      "editorInfo.foreground": primary(1),
      "editorOverviewRuler.border": "#00000000",
      "editorStickyScroll.background": token("--background"),
      "editorStickyScroll.shadow": fg(0.08),
      "editorWidget.background": token("--popover"),
      "editorWidget.foreground": token("--popover-foreground"),
      "editorWidget.border": token("--border"),
      "editorHoverWidget.background": token("--popover"),
      "editorHoverWidget.border": token("--border"),
      "editorSuggestWidget.background": token("--popover"),
      "editorSuggestWidget.border": token("--border"),
      "editorSuggestWidget.selectedBackground": fg(0.06),
      "editorSuggestWidget.highlightForeground": primary(1),
      "list.hoverBackground": fg(0.04),
      "list.activeSelectionBackground": fg(0.06),
      "list.activeSelectionForeground": token("--foreground"),
      "list.highlightForeground": primary(1),
      "input.background": token("--card"),
      "input.border": token("--input"),
      "focusBorder": token("--ring", 0.6),
      "scrollbarSlider.background": fg(0.1),
      "scrollbarSlider.hoverBackground": fg(0.18),
      "scrollbarSlider.activeBackground": fg(0.26),
      "scrollbar.shadow": "#00000000",
      "widget.shadow": "#00000014",
    },
  })
  monaco.editor.setTheme(EDITOR_THEME)
}

/** The mono font stack from the theme. */
export function monoFont() {
  return getComputedStyle(document.documentElement).getPropertyValue("--font-mono").trim() || "monospace"
}

/** Loose module shims, so the starter project type-checks without node_modules. */
export const TYPE_SHIMS = `
declare module "react" {
  export type ReactNode = any
  export type SetStateAction<T> = T | ((prev: T) => T)
  export function useState<T>(init: T | (() => T)): [T, (value: SetStateAction<T>) => void]
  export function useEffect(effect: () => void | (() => void), deps?: readonly unknown[]): void
  export function useMemo<T>(factory: () => T, deps: readonly unknown[]): T
  export function useCallback<T extends (...args: any[]) => any>(fn: T, deps: readonly unknown[]): T
  export function useRef<T>(init: T): { current: T }
  export const StrictMode: (props: { children?: ReactNode }) => any
  export const Fragment: any
}
declare module "react/jsx-runtime" {
  export const jsx: any
  export const jsxs: any
  export const Fragment: any
}
declare module "react-dom/client" {
  export function createRoot(el: Element): { render(node: any): void; unmount(): void }
}
declare module "node:assert/strict" {
  const assert: { equal(a: unknown, b: unknown): void; ok(v: unknown): void; deepEqual(a: unknown, b: unknown): void }
  export default assert
}
declare module "node:test" {
  export function test(name: string, fn: () => void | Promise<void>): void
}
declare module "*.css"
declare namespace JSX {
  interface Element {}
  interface IntrinsicAttributes { key?: string | number }
  type Handler<E> = (event: E) => void
  interface DomProps {
    [prop: string]: any
    onClick?: Handler<MouseEvent & { currentTarget: HTMLElement }>
    onSubmit?: Handler<SubmitEvent & { currentTarget: HTMLFormElement }>
    onChange?: Handler<Event & { target: HTMLInputElement; currentTarget: HTMLInputElement }>
    onKeyDown?: Handler<KeyboardEvent>
  }
  interface IntrinsicElements { [name: string]: DomProps }
}
`
