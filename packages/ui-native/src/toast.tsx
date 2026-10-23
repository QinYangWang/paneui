import * as React from "react"
import { AccessibilityInfo, Animated, Text, View } from "react-native"
import { spacing, typography } from "@paneui/tokens"

import { useTheme } from "./theme"

export type ToastVariant = "default" | "info" | "success" | "warning" | "destructive"

export type ToastOptions = {
  title: string
  description?: string
  variant?: ToastVariant
  duration?: number
}

type ToastItem = ToastOptions & { key: number }

type ToastContextValue = {
  show: (options: ToastOptions) => void
  dismiss: () => void
}

const ToastContext = React.createContext<ToastContextValue | null>(null)

export function useToast(): ToastContextValue {
  const context = React.useContext(ToastContext)
  if (!context) throw new Error("useToast must be used within ToastProvider.")
  return context
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

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const { headingFont, shadows, colors, scheme, radius } = useTheme()
  const reduced = useReducedMotion()
  const [toast, setToast] = React.useState<ToastItem | null>(null)
  const opacity = React.useRef(new Animated.Value(0)).current
  const translateY = React.useRef(new Animated.Value(spacing.md)).current
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const counter = React.useRef(0)

  const hide = React.useCallback(() => {
    Animated.timing(opacity, { toValue: 0, duration: reduced ? 0 : 150, useNativeDriver: true }).start(() => setToast(null))
  }, [opacity, reduced])

  const show = React.useCallback(
    (options: ToastOptions) => {
      if (timer.current) clearTimeout(timer.current)
      counter.current += 1
      setToast({ ...options, key: counter.current })
      opacity.setValue(0)
      translateY.setValue(reduced ? 0 : spacing.md)
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: reduced ? 0 : 200, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: 0, duration: reduced ? 0 : 200, useNativeDriver: true }),
      ]).start()
      timer.current = setTimeout(hide, options.duration ?? 4000)
    },
    [hide, opacity, reduced, translateY]
  )

  const dismiss = React.useCallback(() => {
    if (timer.current) clearTimeout(timer.current)
    hide()
  }, [hide])

  React.useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    []
  )

  const context = React.useMemo(() => ({ show, dismiss }), [show, dismiss])
  const variant = toast?.variant ?? "default"
  const tone = variant === "success" ? colors.success : variant === "warning" ? colors.warning : variant === "destructive" ? colors.destructive : variant === "info" ? colors.primary : null
  return (
    <ToastContext.Provider value={context}>
      {children}
      <View pointerEvents="box-none" style={{ position: "absolute", right: spacing.lg, bottom: spacing.xl, left: spacing.lg, alignItems: "center" }}>
        {toast ? (
          <Animated.View
            key={toast.key}
            accessibilityRole="alert"
            accessibilityLiveRegion={variant === "destructive" ? "assertive" : "polite"}
            style={{
              opacity,
              transform: [{ translateY }],
              flexDirection: "row",
              alignItems: "center",
              gap: spacing.sm,
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: tone ?? colors.border,
              borderRadius: radius.lg,
              paddingHorizontal: spacing.lg,
              paddingVertical: spacing.md,
              shadowColor: scheme === "dark" ? colors.background : colors.foreground,
              shadowOffset: { width: 0, height: spacing.sm },
              shadowOpacity: 0.15,
              shadowRadius: spacing.lg,
              elevation: spacing.xs,
              ...shadows.surface,
            }}
          >
            {tone ? <View style={{ width: spacing.sm, height: spacing.sm, borderRadius: spacing.sm / 2, backgroundColor: tone }} /> : null}
            <View style={{ gap: spacing.xs }}>
              <Text style={[typography.body, { color: colors.foreground, fontFamily: headingFont, fontWeight: "600" }]}>{toast.title}</Text>
              {toast.description ? <Text style={[typography.supporting, { color: colors.mutedForeground }]}>{toast.description}</Text> : null}
            </View>
          </Animated.View>
        ) : null}
      </View>
    </ToastContext.Provider>
  )
}
