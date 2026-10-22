import * as React from "react"
import { Pressable, Text, View, type PressableProps } from "react-native"
import { nativeControl, spacing, typography } from "@paneui/tokens"
import { useTheme } from "./theme"
import { useField, useFormValue } from "./field"

export type CheckboxProps = Omit<PressableProps, "children" | "defaultValue"> & { label?: string; value?: boolean | "indeterminate"; defaultValue?: boolean | "indeterminate"; onValueChange?: (value: boolean | "indeterminate") => void }
export function Checkbox({ label, value, defaultValue = false, onValueChange, disabled, style, onFocus, onBlur, onPress, accessibilityState, accessibilityLabel, ...props }: CheckboxProps) {
  const { colors, radius } = useTheme()
  const field = useField()
  const inactive = disabled ?? field?.disabled ?? false
  const [current, change] = useFormValue(value, defaultValue, onValueChange)
  const [focused, setFocused] = React.useState(false)
  return <Pressable nativeID={field?.id} {...props} accessibilityRole="checkbox" accessibilityLabel={accessibilityLabel ?? label ?? field?.label} accessibilityHint={field?.error ?? field?.description} aria-checked={current === "indeterminate" ? "mixed" : current} accessibilityState={{ ...accessibilityState, disabled: inactive, checked: current === "indeterminate" ? "mixed" : current }} disabled={inactive} onFocus={(event) => { setFocused(true); onFocus?.(event) }} onBlur={(event) => { setFocused(false); onBlur?.(event) }} onPress={(event) => { change(current !== true); onPress?.(event) }} style={(state) => [{ minHeight: nativeControl.default, minWidth: nativeControl.default, flexDirection: "row", alignItems: "center", gap: spacing.sm, padding: spacing.xs, borderRadius: radius.lg, borderWidth: 2, borderColor: focused ? colors.ring : "transparent", backgroundColor: state.pressed ? colors.secondary : "transparent", opacity: inactive ? 0.64 : 1 }, typeof style === "function" ? style(state) : style]}><View style={{ width: spacing.xl, height: spacing.xl, borderRadius: radius.sm, borderWidth: 2, borderColor: current ? colors.primary : colors.input, backgroundColor: current ? colors.primary : colors.background, alignItems: "center", justifyContent: "center" }}><Text accessible={false} style={[typography.supporting, { color: colors.primaryForeground }]}>{current === "indeterminate" ? "−" : current ? "✓" : ""}</Text></View>{label ? <Text style={[typography.body, { color: colors.foreground }]}>{label}</Text> : null}</Pressable>
}
