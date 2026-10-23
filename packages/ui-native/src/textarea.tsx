import * as React from "react"
import { Platform, TextInput, View, type TextInputProps } from "react-native"
import { nativeControl, spacing, typography } from "@paneui/tokens"
import { useTheme } from "./theme"
import { useField, useFormValue } from "./field"
import { Text } from "./text"

export type TextareaProps = TextInputProps & { label?: string; onValueChange?: (value: string) => void; autoGrow?: boolean; showCounter?: boolean }
export function Textarea({ label, value, defaultValue = "", onValueChange, onChangeText, autoGrow = true, showCounter = false, maxLength, editable, style, onFocus, onBlur, onContentSizeChange, accessibilityState, ...props }: TextareaProps) {
  const { colors, radius } = useTheme()
  const field = useField()
  const [current, change] = useFormValue(value, defaultValue, onValueChange)
  const [height, setHeight] = React.useState<number>(nativeControl.default * 2)
  const [focused, setFocused] = React.useState(false)
  const enabled = editable ?? !field?.disabled
  return <View style={{ gap: spacing.sm }}><TextInput nativeID={field?.id} {...props} multiline editable={enabled} value={current} maxLength={maxLength} accessibilityLabel={props.accessibilityLabel ?? label ?? field?.label} accessibilityHint={props.accessibilityHint ?? field?.error ?? field?.description} accessibilityState={{ ...accessibilityState, disabled: !enabled }} placeholderTextColor={colors.mutedForeground} selectionColor={colors.primary} onChangeText={(next) => { change(next); onChangeText?.(next) }} onFocus={(event) => { setFocused(true); onFocus?.(event) }} onBlur={(event) => { setFocused(false); onBlur?.(event) }} onContentSizeChange={(event) => { if (autoGrow) { const next = Math.max(nativeControl.default * 2, Math.ceil(event.nativeEvent.contentSize.height + (Platform.OS === "web" ? 0 : spacing.md * 2))); setHeight((prev) => (Math.abs(next - prev) < 2 ? prev : next)) }; onContentSizeChange?.(event) }} style={[typography.body, { minHeight: nativeControl.default * 2, height: autoGrow ? height : undefined, textAlignVertical: "top", padding: spacing.md, borderRadius: radius.md, borderWidth: 2, borderColor: focused ? colors.ring : field?.error ? colors.destructive : colors.input, backgroundColor: colors.background, color: colors.foreground, opacity: enabled ? 1 : 0.64 }, style]} />{showCounter ? <Text variant="caption" tone="muted" style={{ textAlign: "auto", fontVariant: ["tabular-nums"] }}>{maxLength === undefined ? `${current.length}` : `${current.length} / ${maxLength}`}</Text> : null}</View>
}
