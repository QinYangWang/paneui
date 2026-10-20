import * as React from "react"
import { AccessibilityInfo, Animated, Modal, PanResponder, Pressable, View } from "react-native"
import { nativeControl, radius, spacing } from "@paneui/tokens"

import { useTheme } from "./theme"

export type SheetProps = {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  bottomInset?: number
  children: React.ReactNode
}

function useReducedMotion() {
  const [reduced, setReduced] = React.useState(false)
  React.useEffect(() => {
    let mounted = true
    void AccessibilityInfo.isReduceMotionEnabled().then((value) => {
      if (mounted) setReduced(value)
    })
    const subscription = AccessibilityInfo.addEventListener("reduceMotionChanged", setReduced)
    return () => {
      mounted = false
      subscription.remove()
    }
  }, [])
  return reduced
}

export function Sheet({ open, defaultOpen = false, onOpenChange, bottomInset = spacing.xl, children }: SheetProps) {
  const { colors, scheme } = useTheme()
  const reduced = useReducedMotion()
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const isOpen = open ?? uncontrolledOpen
  const translateY = React.useRef(new Animated.Value(0)).current
  const setOpen = React.useCallback(
    (next: boolean) => {
      if (open === undefined) setUncontrolledOpen(next)
      onOpenChange?.(next)
    },
    [open, onOpenChange]
  )
  const close = React.useCallback(() => {
    if (reduced) {
      translateY.setValue(0)
      setOpen(false)
      return
    }
    Animated.timing(translateY, { toValue: spacing["3xl"] * 8, duration: 200, useNativeDriver: true }).start(() => {
      translateY.setValue(0)
      setOpen(false)
    })
  }, [reduced, setOpen, translateY])
  const closeRef = React.useRef(close)
  React.useEffect(() => {
    closeRef.current = close
  })
  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_event, gesture) => gesture.dy > 4 && gesture.dy > Math.abs(gesture.dx),
      onPanResponderMove: (_event, gesture) => {
        if (gesture.dy > 0) translateY.setValue(gesture.dy)
      },
      onPanResponderRelease: (_event, gesture) => {
        if (gesture.dy > spacing["3xl"] * 2 || gesture.vy > 0.6) {
          closeRef.current()
        } else {
          Animated.spring(translateY, { toValue: 0, useNativeDriver: true, bounciness: 4 }).start()
        }
      },
    })
  ).current
  const scrim = scheme === "dark" ? colors.background : colors.foreground
  const scrimOpacity = scheme === "dark" ? 0.7 : 0.45
  return (
    <Modal visible={isOpen} transparent animationType="fade" statusBarTranslucent onRequestClose={() => setOpen(false)}>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <Pressable accessibilityRole="button" accessibilityLabel="Close sheet" onPress={() => setOpen(false)} style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0, backgroundColor: scrim, opacity: scrimOpacity }} />
        <Animated.View
          style={{
            transform: [{ translateY }],
            backgroundColor: colors.card,
            borderTopLeftRadius: radius["3xl"],
            borderTopRightRadius: radius["3xl"],
            paddingTop: spacing.sm,
            paddingHorizontal: spacing.xl,
            paddingBottom: bottomInset + spacing.lg,
            gap: spacing.sm,
            maxHeight: "85%",
          }}
        >
          <View {...panResponder.panHandlers} accessible={false} importantForAccessibility="no" style={{ alignItems: "center", justifyContent: "center", minHeight: nativeControl.sm }}>
            <View style={{ width: spacing["3xl"] - spacing.xs, height: spacing.xs, borderRadius: radius.sm, backgroundColor: colors.mutedForeground, opacity: 0.5 }} />
          </View>
          {children}
        </Animated.View>
      </View>
    </Modal>
  )
}
