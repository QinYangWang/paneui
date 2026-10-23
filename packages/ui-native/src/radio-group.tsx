import * as React from "react"
import { Pressable, Text, View, type PressableProps, type ViewProps } from "react-native"
import { nativeControl, spacing, typography } from "@paneui/tokens"
import { useTheme } from "./theme"
import { useField, useFormValue } from "./field"

const RadioContext = React.createContext<{ value: string; change: (value: string) => void; disabled: boolean } | null>(null)
export type RadioGroupProps = ViewProps & { value?: string; defaultValue?: string; onValueChange?: (value: string) => void; disabled?: boolean; label?: string }
export function RadioGroup({ value, defaultValue = "", onValueChange, disabled, label, children, style, ...props }: RadioGroupProps) {
  const field = useField()
  const [current, change] = useFormValue(value, defaultValue, onValueChange)
  return <RadioContext.Provider value={{ value: current, change, disabled: disabled ?? field?.disabled ?? false }}><View nativeID={field?.id} {...props} accessibilityRole="radiogroup" accessibilityLabel={props.accessibilityLabel ?? label ?? field?.label} accessibilityHint={field?.error ?? field?.description} style={[{ gap: spacing.xs }, style]}>{children}</View></RadioContext.Provider>
}
export type RadioGroupItemProps = Omit<PressableProps, "children"> & { value: string; label: string }
export function RadioGroupItem({ value, label, disabled, style, onFocus, onBlur, onPress, accessibilityState, ...props }: RadioGroupItemProps) {
  const group = React.useContext(RadioContext)
  const { colors, radius } = useTheme()
  const [focused, setFocused] = React.useState(false)
  if (!group) throw new Error("RadioGroupItem requires RadioGroup")
  const inactive = disabled || group.disabled
  const selected = group.value === value
  return <Pressable {...props} accessibilityRole="radio" accessibilityLabel={props.accessibilityLabel ?? label} aria-checked={selected} accessibilityState={{ ...accessibilityState, checked: selected, disabled: inactive }} disabled={inactive} onFocus={(event) => { setFocused(true); onFocus?.(event) }} onBlur={(event) => { setFocused(false); onBlur?.(event) }} onPress={(event) => { group.change(value); onPress?.(event) }} style={(state) => [{ minHeight: nativeControl.default, flexDirection: "row", alignItems: "center", gap: spacing.sm, padding: spacing.xs, borderWidth: 2, borderColor: focused ? colors.ring : "transparent", borderRadius: radius.lg, backgroundColor: state.pressed ? colors.secondary : "transparent", opacity: inactive ? 0.64 : 1 }, typeof style === "function" ? style(state) : style]}><View style={{ width: spacing.xl, height: spacing.xl, borderRadius: radius["3xl"], borderWidth: 2, borderColor: selected ? colors.primary : colors.input, alignItems: "center", justifyContent: "center" }}>{selected ? <View style={{ width: spacing.md, height: spacing.md, borderRadius: radius.md, backgroundColor: colors.primary }} /> : null}</View><Text style={[typography.body, { color: colors.foreground }]}>{label}</Text></Pressable>
}
