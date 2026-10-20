import { ActivityIndicator, type ActivityIndicatorProps } from "react-native"
import type { ColorRole } from "@paneui/tokens"

import { useTheme } from "./theme"

export type SpinnerProps = Omit<ActivityIndicatorProps, "color"> & {
  tone?: ColorRole
}

export function Spinner({ tone = "primary", size = "small", accessibilityLabel = "Loading", ...props }: SpinnerProps) {
  const { colors } = useTheme()
  return <ActivityIndicator {...props} size={size} color={colors[tone]} accessibilityRole="progressbar" accessibilityLabel={accessibilityLabel} />
}
