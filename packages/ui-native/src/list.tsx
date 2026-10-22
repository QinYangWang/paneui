import * as React from "react"
import { Pressable, Text, View, type PressableProps, type ViewProps } from "react-native"
import { nativeControl, spacing, typography } from "@paneui/tokens"

import { useTheme } from "./theme"

const ListGroupContext = React.createContext(false)

export type ListProps = ViewProps & {
  children: React.ReactNode
}

export function List({ children, style, ...props }: ListProps) {
  const { colors, radius } = useTheme()
  return (
    <View {...props} style={[{ backgroundColor: colors.card, borderRadius: radius.xl, borderWidth: 1, borderColor: colors.border, overflow: "hidden" }, style]}>
      <ListGroupContext.Provider value={true}>
        {React.Children.map(children, (child, index) =>
          React.isValidElement(child) ? React.cloneElement(child as React.ReactElement<{ showSeparator?: boolean }>, { showSeparator: index > 0 }) : child
        )}
      </ListGroupContext.Provider>
    </View>
  )
}

export type ListItemProps = Omit<PressableProps, "children"> & {
  title: string
  description?: string
  leading?: React.ReactNode
  trailing?: React.ReactNode
  showSeparator?: boolean
}

export function ListItem({ title, description, leading, trailing, showSeparator = false, onPress, disabled = false, style, onFocus, onBlur, accessibilityState, ...props }: ListItemProps) {
  const { colors, radius } = useTheme()
  const grouped = React.useContext(ListGroupContext)
  const [focused, setFocused] = React.useState(false)
  const row = (pressed: boolean) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.md,
        minHeight: nativeControl.sm,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        backgroundColor: pressed && !disabled ? colors.muted : "transparent",
        borderTopWidth: grouped && showSeparator ? 1 : 0,
        borderColor: colors.border,
      }}
    >
      {leading}
      <View style={{ flex: 1, gap: spacing.xs }}>
        <Text style={[typography.body, { color: disabled ? colors.mutedForeground : colors.foreground, fontWeight: "600" }]}>{title}</Text>
        {description ? <Text style={[typography.supporting, { color: colors.mutedForeground }]}>{description}</Text> : null}
      </View>
      {trailing}
    </View>
  )
  if (!onPress) {
    return (
      <View style={[grouped ? undefined : { backgroundColor: colors.card, borderRadius: radius.xl, borderWidth: 1, borderColor: colors.border, overflow: "hidden" }, typeof style === "function" ? undefined : style]}>
        {row(false)}
      </View>
    )
  }
  return (
    <Pressable
      {...props}
      accessibilityRole="button"
      accessibilityState={{ ...accessibilityState, disabled }}
      disabled={disabled}
      onPress={onPress}
      onFocus={(event) => {
        setFocused(true)
        onFocus?.(event)
      }}
      onBlur={(event) => {
        setFocused(false)
        onBlur?.(event)
      }}
      style={(state) => [
        grouped ? undefined : { backgroundColor: colors.card, borderRadius: radius.xl, borderWidth: 1, borderColor: colors.border, overflow: "hidden" },
        typeof style === "function" ? style(state) : style,
      ]}
    >
      {(state) => (
        <>
          {row(state.pressed)}
          {focused ? <View pointerEvents="none" style={{ position: "absolute", top: 2, right: 2, bottom: 2, left: 2, borderRadius: grouped ? 0 : radius.lg, borderWidth: 2, borderColor: colors.ring }} /> : null}
        </>
      )}
    </Pressable>
  )
}
