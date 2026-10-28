/**
 * The blog routes need no provider: the theme toggle reads and writes the `.dark` class on
 * `<html>`. Inline `getThemeScript()` in your root `<head>` so the first paint is already themed.
 */
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children
}
