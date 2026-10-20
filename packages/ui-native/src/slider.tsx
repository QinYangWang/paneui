import * as React from "react"
import { I18nManager, View, type ViewProps } from "react-native"
import { nativeControl, radius, spacing } from "@paneui/tokens"
import { useTheme } from "./theme"
import { useField, useFormValue } from "./field"

export type SliderProps = ViewProps & { value?: number; defaultValue?: number; onValueChange?: (value: number) => void; min?: number; max?: number; step?: number; disabled?: boolean; label?: string }
export function Slider({ value, defaultValue, onValueChange, min = 0, max = 100, step = 1, disabled, label, style, onLayout, onFocus, onBlur, onAccessibilityAction, accessibilityState, ...props }: SliderProps) {
  const { colors } = useTheme()
  const field = useField()
  const [current, change] = useFormValue(value, defaultValue ?? min, onValueChange)
  const [width, setWidth] = React.useState(0)
  const [focused, setFocused] = React.useState(false)
  const inactive = disabled ?? field?.disabled ?? false
  const upper = Math.max(min, max)
  const increment = step > 0 && Number.isFinite(step) ? step : 1
  const clamp = (next: number) => Math.min(upper, Math.max(min, Number((min + Math.round((next - min) / increment) * increment).toFixed(10))))
  const displayed = Math.min(upper, Math.max(min, current))
  const fraction = upper === min ? 0 : (displayed - min) / (upper - min)
  const update = (x: number) => { const part = Math.max(0, Math.min(1, (x - spacing.md) / Math.max(1, width - spacing.xl))); change(clamp(min + (I18nManager.isRTL ? 1 - part : part) * (upper - min))) }
  return <View nativeID={field?.id} {...props} accessible focusable={!inactive} accessibilityRole="adjustable" accessibilityLabel={props.accessibilityLabel ?? label ?? field?.label} accessibilityHint={props.accessibilityHint ?? field?.error ?? field?.description} accessibilityState={{ ...accessibilityState, disabled: inactive }} accessibilityValue={{ min, max: upper, now: displayed }} accessibilityActions={[{ name: "increment" }, { name: "decrement" }]} onAccessibilityAction={(event) => { if (!inactive) { if (event.nativeEvent.actionName === "increment") change(clamp(displayed + increment)); if (event.nativeEvent.actionName === "decrement") change(clamp(displayed - increment)) } onAccessibilityAction?.(event) }} onFocus={(event) => { setFocused(true); onFocus?.(event) }} onBlur={(event) => { setFocused(false); onBlur?.(event) }} onLayout={(event) => { setWidth(event.nativeEvent.layout.width); onLayout?.(event) }} onStartShouldSetResponder={() => !inactive} onMoveShouldSetResponder={() => !inactive} onResponderGrant={(event) => { if (!inactive) update(event.nativeEvent.locationX) }} onResponderMove={(event) => { if (!inactive) update(event.nativeEvent.locationX) }} style={[{ minHeight: nativeControl.default, minWidth: nativeControl.default, justifyContent: "center", paddingHorizontal: spacing.md, borderWidth: 2, borderColor: focused ? colors.ring : "transparent", borderRadius: radius.lg, opacity: inactive ? 0.64 : 1 }, style]}><View pointerEvents="none" style={{ height: spacing.xs, borderRadius: radius.sm, backgroundColor: colors.input }}><View style={{ height: "100%", width: `${fraction * 100}%`, borderRadius: radius.sm, backgroundColor: colors.primary }} /><View style={{ position: "absolute", start: `${fraction * 100}%`, marginStart: -spacing.md, top: -spacing.sm - spacing.xs / 2, width: spacing.xl, height: spacing.xl, borderRadius: radius["3xl"], borderWidth: 2, borderColor: colors.primary, backgroundColor: colors.background }} /></View></View>
}
