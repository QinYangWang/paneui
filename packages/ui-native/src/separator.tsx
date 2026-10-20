import { StyleSheet, View, type ViewProps } from "react-native"

import { useTheme } from "./theme"

export type SeparatorProps = ViewProps & {
  orientation?: "horizontal" | "vertical"
}

export function Separator({ orientation = "horizontal", style, ...props }: SeparatorProps) {
  const { colors } = useTheme()
  return (
    <View
      {...props}
      accessible={false}
      importantForAccessibility="no"
      style={[{ backgroundColor: colors.border, alignSelf: "stretch", flexShrink: 0 }, orientation === "horizontal" ? { height: StyleSheet.hairlineWidth } : { width: StyleSheet.hairlineWidth }, style]}
    />
  )
}
