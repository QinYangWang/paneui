import * as React from "react"
import { Pressable, Text, type PressableProps } from "react-native"
import { nativeControl, spacing, typography } from "@paneui/tokens"

import { useTheme } from "./theme"

export type ButtonProps = Omit<PressableProps, "children"> & {
  children: string
  variant?: "primary" | "secondary" | "ghost" | "destructive"
  size?: keyof typeof nativeControl
}

export function Button({ children, variant = "primary", size = "default", disabled = false, style, onFocus, onBlur, accessibilityState, ...props }: ButtonProps) {
  const { colors, controlRadius } = useTheme()
  const [focused, setFocused] = React.useState(false)
  const foreground = variant === "primary" ? colors.primaryForeground : variant === "destructive" ? colors.destructiveForeground : colors.foreground
  return (
    <Pressable
      {...props}
      accessibilityRole="button"
      accessibilityState={{ ...accessibilityState, disabled }}
      disabled={disabled}
      onFocus={(event) => { setFocused(true); onFocus?.(event) }}
      onBlur={(event) => { setFocused(false); onBlur?.(event) }}
      style={(state) => [
        {
          minHeight: nativeControl[size],
          minWidth: nativeControl[size],
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.sm,
          borderRadius: controlRadius,
          borderWidth: 2,
          borderColor: focused ? colors.ring : "transparent",
          alignItems: "center",
          justifyContent: "center",
          opacity: disabled ? 0.64 : 1,
          backgroundColor: variant === "primary" ? (state.pressed ? colors.primaryActive : colors.primary) : variant === "destructive" ? colors.destructive : variant === "secondary" || state.pressed ? colors.secondary : "transparent",
        },
        typeof style === "function" ? style(state) : style,
      ]}
    >
      <Text style={[typography.body, { color: foreground, fontWeight: "500", textAlign: "center" }]}>{children}</Text>
    </Pressable>
  )
}
