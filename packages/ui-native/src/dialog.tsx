import * as React from "react"
import { Modal, Pressable, Text, View } from "react-native"
import { spacing, typography } from "@paneui/tokens"

import { useTheme } from "./theme"

export type DialogProps = {
  closeLabel?: string
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  title: string
  description?: string
  children?: React.ReactNode
}

export function Dialog({ closeLabel = "Close dialog", open, defaultOpen = false, onOpenChange, title, description, children }: DialogProps) {
  const { headingFont, shadows, colors, scheme, radius } = useTheme()
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const isOpen = open ?? uncontrolledOpen
  const setOpen = (next: boolean) => {
    if (open === undefined) setUncontrolledOpen(next)
    onOpenChange?.(next)
  }
  const scrim = scheme === "dark" ? colors.background : colors.foreground
  const scrimOpacity = scheme === "dark" ? 0.7 : 0.45
  return (
    <Modal visible={isOpen} transparent animationType="fade" statusBarTranslucent onRequestClose={() => setOpen(false)}>
      <View style={{ flex: 1, justifyContent: "center", padding: spacing.xl }}>
        <Pressable accessibilityRole="button" accessibilityLabel={closeLabel} onPress={() => setOpen(false)} style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0, backgroundColor: scrim, opacity: scrimOpacity }} />
        <View
          accessibilityViewIsModal
          accessibilityRole="alert"
          accessibilityLabel={title}
          style={{
            alignSelf: "center",
            width: "100%",
            maxWidth: spacing["3xl"] * 9,
            backgroundColor: colors.card,
            borderRadius: radius["2xl"],
            borderWidth: 1,
            borderColor: colors.border,
            padding: spacing.xl,
            gap: spacing.lg,
            shadowColor: scheme === "dark" ? colors.background : colors.foreground,
            shadowOffset: { width: 0, height: spacing.sm },
            shadowOpacity: 0.15,
            shadowRadius: spacing.lg,
            elevation: spacing.xs,
            ...shadows.overlay,
          }}
        >
          <Text style={[typography.body, { color: colors.foreground, fontFamily: headingFont, fontWeight: "600" }]}>{title}</Text>
          {description ? <Text style={[typography.supporting, { color: colors.mutedForeground }]}>{description}</Text> : null}
          {children ? <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-end", gap: spacing.sm }}>{children}</View> : null}
        </View>
      </View>
    </Modal>
  )
}
