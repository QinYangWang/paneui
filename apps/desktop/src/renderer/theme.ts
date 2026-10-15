import type { DesktopBridge } from "../shared/bridge"

/**
 * The page follows the system theme, as the main process reports it. The
 * toggle inside the editor still works until the system theme next changes.
 * The window's own colours follow the page.
 */
export function followSystemTheme(bridge: DesktopBridge) {
  const root = document.documentElement
  const apply = (dark: boolean) => {
    root.classList.toggle("dark", dark)
    root.style.colorScheme = dark ? "dark" : "light"
  }
  const report = () => bridge.setTheme(root.classList.contains("dark") ? "dark" : "light")
  apply(bridge.systemDark())
  report()
  bridge.onSystemTheme(apply)
  new MutationObserver(report).observe(root, { attributes: true, attributeFilter: ["class"] })
}
