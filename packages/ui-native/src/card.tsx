import { View, type ViewProps } from "react-native"
import { radius, spacing } from "@paneui/tokens"

import { useTheme } from "./theme"

export function Card({ style, ...props }: ViewProps) {
  const { colors } = useTheme()
  return <View {...props} style={[{ backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1, borderRadius: radius["2xl"], padding: spacing.lg, gap: spacing.lg }, style]} />
}

export function CardHeader({ style, ...props }: ViewProps) {
  return <View {...props} style={[{ gap: spacing.xs }, style]} />
}

export function CardContent({ style, ...props }: ViewProps) {
  return <View {...props} style={[{ gap: spacing.md }, style]} />
}
