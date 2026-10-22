import * as React from "react"
import { AccessibilityInfo, Animated, View, type ViewProps } from "react-native"
import { spacing, type ColorRole } from "@paneui/tokens"

import { useTheme } from "./theme"

export type ProgressProps = ViewProps & {
  value?: number
  tone?: ColorRole
  label?: string
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

export function Progress({ value = 0, tone = "primary", label = "Progress", style, ...props }: ProgressProps) {
  const { colors, radius } = useTheme()
  const reduced = useReducedMotion()
  const clamped = Math.min(Math.max(value, 0), 1)
  const width = React.useRef(new Animated.Value(clamped)).current
  React.useEffect(() => {
    if (reduced) {
      width.setValue(clamped)
      return
    }
    Animated.timing(width, { toValue: clamped, duration: 200, useNativeDriver: false }).start()
  }, [clamped, reduced, width])
  return (
    <View
      {...props}
      accessibilityRole="progressbar"
      accessibilityLabel={label}
      accessibilityValue={{ min: 0, max: 100, now: Math.round(clamped * 100) }}
      style={[{ height: spacing.sm, borderRadius: radius.sm, backgroundColor: colors.muted, overflow: "hidden" }, style]}
    >
      <Animated.View
        style={{
          height: spacing.sm,
          borderRadius: radius.sm,
          backgroundColor: colors[tone],
          width: width.interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"] }),
        }}
      />
    </View>
  )
}
