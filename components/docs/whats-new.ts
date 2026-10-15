/**
 * Items added in the latest releases, newest first. The sidebar marks them "New" and its footer
 * links to the changelog entry. Keep in step with app/docs/changelog/page.tsx; drop entries
 * older than about two weeks.
 */
export const WHATS_NEW = {
  /** Changelog anchor of the release that added them. */
  href: "/docs/changelog#2026-10-16-components",
  items: [
    "alert-dialog",
    "button-group",
    "calendar",
    "carousel",
    "command",
    "date-picker",
    "hover-card",
    "input-group",
    "input-otp",
    "kbd",
    "menubar",
    "native-select",
    "navigation-menu",
    "progress",
    "separator",
    "skeleton",
  ],
} as const

const NEW = new Set<string>(WHATS_NEW.items)
export const isNew = (name: string) => NEW.has(name)
