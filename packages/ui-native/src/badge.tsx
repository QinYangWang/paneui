import { Text, View, type ViewProps } from "react-native"
import { spacing, typography } from "@paneui/tokens"

import { useTheme } from "./theme"

export type BadgeProps = ViewProps & {
  children: string
  variant?: "default" | "primary" | "secondary" | "success" | "warning" | "destructive" | "outline"
}

export function Badge({ children, variant = "default", style, ...props }: BadgeProps) {
  const { colors, radius } = useTheme()
  const backgroundColor = variant === "primary" ? colors.primary : variant === "destructive" ? colors.destructive : variant === "outline" ? "transparent" : colors.muted
  const color = variant === "primary" ? colors.primaryForeground : variant === "destructive" ? colors.destructiveForeground : colors.foreground
  return (
    <View
      {...props}
      style={[{ alignSelf: "flex-start", flexDirection: "row", alignItems: "center", gap: spacing.xs, backgroundColor, borderRadius: radius["3xl"], paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderWidth: variant === "outline" ? 1 : 0, borderColor: colors.border }, style]}
    >
      {variant === "success" || variant === "warning" ? <View accessible={false} style={{ width: spacing.sm, height: spacing.sm, borderRadius: spacing.sm / 2, backgroundColor: variant === "success" ? colors.success : colors.warning }} /> : null}
      <Text style={[typography.caption, { color, fontWeight: "500", textAlign: "center" }]}>{children}</Text>
    </View>
  )
}
