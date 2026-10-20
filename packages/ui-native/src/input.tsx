import * as React from "react"
import { TextInput, View, type TextInputProps } from "react-native"
import { nativeControl, radius, spacing, typography } from "@paneui/tokens"

import { Text } from "./text"
import { useTheme } from "./theme"

export type InputProps = TextInputProps & { label: string; description?: string; error?: string }

export function Input({ label, description, error, style, accessibilityLabel, accessibilityHint, editable = true, onFocus, onBlur, ...props }: InputProps) {
  const { colors } = useTheme()
  const [focused, setFocused] = React.useState(false)
  return (
    <View style={{ gap: spacing.sm }}>
      <Text style={{ fontWeight: "500" }}>{label}</Text>
      <TextInput
        {...props}
        editable={editable}
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityHint={accessibilityHint ?? error ?? description}
        placeholderTextColor={colors.mutedForeground}
        selectionColor={colors.primary}
        onFocus={(event) => { setFocused(true); onFocus?.(event) }}
        onBlur={(event) => { setFocused(false); onBlur?.(event) }}
        style={[
          typography.body,
          { minHeight: nativeControl.default, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radius.md, borderWidth: 2, borderColor: error ? colors.destructive : focused ? colors.ring : colors.input, color: colors.foreground, backgroundColor: colors.background, opacity: editable ? 1 : 0.64 },
          style,
        ]}
      />
      {error ? <Text variant="supporting" tone="destructive" accessibilityLiveRegion="polite">{error}</Text> : description ? <Text variant="supporting" tone="muted">{description}</Text> : null}
    </View>
  )
}
