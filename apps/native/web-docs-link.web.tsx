import { nativeControl, spacing, typography } from "@paneui/tokens"
import { useTheme } from "@paneui/ui-native"

export function WebDocsLink() {
  const { colors } = useTheme()
  return <a href="/" style={{ color: colors.foreground, fontSize: typography.supporting.fontSize, minHeight: nativeControl.sm, padding: spacing.sm, display: "inline-flex", alignItems: "center", boxSizing: "border-box" }}>Web docs</a>
}
