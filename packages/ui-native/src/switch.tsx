import * as React from "react"
import { Pressable, Text, View, type PressableProps } from "react-native"
import { nativeControl, radius, spacing, typography } from "@paneui/tokens"
import { useTheme } from "./theme"
import { useField, useFormValue } from "./field"

export type SwitchProps = Omit<PressableProps, "children" | "defaultValue"> & { label?: string; value?: boolean; defaultValue?: boolean; onValueChange?: (value: boolean) => void }
export function Switch({ label, value, defaultValue = false, onValueChange, disabled, style, onFocus, onBlur, onPress, accessibilityState, accessibilityLabel, ...props }: SwitchProps) {
  const { colors } = useTheme()
  const field = useField()
  const inactive = disabled ?? field?.disabled ?? false
  const [current, change] = useFormValue(value, defaultValue, onValueChange)
  const [focused, setFocused] = React.useState(false)
  return <Pressable nativeID={field?.id} {...props} accessibilityRole="switch" accessibilityLabel={accessibilityLabel ?? label ?? field?.label} accessibilityHint={field?.error ?? field?.description} accessibilityState={{ ...accessibilityState, disabled: inactive, checked: current }} disabled={inactive} onFocus={(event) => { setFocused(true); onFocus?.(event) }} onBlur={(event) => { setFocused(false); onBlur?.(event) }} onPress={(event) => { change(!current); onPress?.(event) }} style={(state) => [{ minHeight: nativeControl.default, minWidth: nativeControl.default, flexDirection: "row", alignItems: "center", gap: spacing.sm, padding: spacing.xs, borderRadius: radius.lg, borderWidth: 2, borderColor: focused ? colors.ring : "transparent", backgroundColor: state.pressed ? colors.secondary : "transparent", opacity: inactive ? 0.64 : 1 }, typeof style === "function" ? style(state) : style]}><View style={{ width: nativeControl.sm, height: spacing.xl, borderRadius: radius["3xl"], backgroundColor: current ? colors.primary : colors.input, padding: spacing.xs, justifyContent: "center", alignItems: current ? "flex-end" : "flex-start" }}><View style={{ width: spacing.lg, height: spacing.lg, borderRadius: radius.lg, backgroundColor: current ? colors.primaryForeground : colors.foreground }} /></View>{label ? <Text style={[typography.body, { color: colors.foreground }]}>{label}</Text> : null}</Pressable>
}
