import { Text, type TextProps } from "react-native"
import { typography } from "@paneui/tokens"
import { useTheme } from "./theme"

export type LabelProps = TextProps & { disabled?: boolean; required?: boolean }
export function Label({ disabled, required, children, style, ...props }: LabelProps) {
  const { colors } = useTheme()
  return <Text {...props} style={[typography.body, { color: colors.foreground, fontWeight: "500", opacity: disabled ? 0.64 : 1 }, style]}>{children}{required ? " *" : ""}</Text>
}
