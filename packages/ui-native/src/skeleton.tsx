import * as React from "react"
import { AccessibilityInfo, Animated, type DimensionValue, type ViewProps } from "react-native"
import { radius, spacing } from "@paneui/tokens"

import { useTheme } from "./theme"

export type SkeletonProps = ViewProps & {
  width?: DimensionValue
  height?: DimensionValue
  circle?: boolean
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

export function Skeleton({ width = "100%", height = spacing["2xl"], circle = false, style, ...props }: SkeletonProps) {
  const { colors } = useTheme()
  const reduced = useReducedMotion()
  const opacity = React.useRef(new Animated.Value(1)).current
  React.useEffect(() => {
    if (reduced) {
      opacity.setValue(0.7)
      return
    }
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.45, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
      ])
    )
    pulse.start()
    return () => pulse.stop()
  }, [reduced, opacity])
  const corner = circle && typeof height === "number" ? height / 2 : circle ? radius["3xl"] : radius.md
  return <Animated.View {...props} accessible={false} importantForAccessibility="no" style={[{ width, height, borderRadius: corner, backgroundColor: colors.muted, opacity }, style]} />
}
