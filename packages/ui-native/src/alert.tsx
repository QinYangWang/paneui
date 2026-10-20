import { Text, View, type ViewProps } from "react-native"
import { radius, spacing, typography } from "@paneui/tokens"

import { useTheme } from "./theme"

export type AlertProps = ViewProps & {
  title: string
  description?: string
  variant?: "info" | "success" | "warning" | "destructive"
}

export function Alert({ title, description, variant = "info", style, ...props }: AlertProps) {
  const { colors } = useTheme()
  const tone = variant === "success" ? colors.success : variant === "warning" ? colors.warning : variant === "destructive" ? colors.destructive : colors.primary
  return (
    <View {...props} accessibilityRole="alert" accessibilityLiveRegion="polite" style={[{ backgroundColor: colors.muted, borderRadius: radius.lg, padding: spacing.md, gap: spacing.sm }, style]}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
        <View style={{ width: spacing.sm, height: spacing.sm, borderRadius: spacing.sm / 2, backgroundColor: tone }} />
        <Text style={[typography.body, { color: colors.foreground, fontWeight: "600" }]}>{title}</Text>
      </View>
      {description ? <Text style={[typography.supporting, { color: colors.mutedForeground }]}>{description}</Text> : null}
    </View>
  )
}
