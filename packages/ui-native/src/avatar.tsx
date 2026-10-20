import * as React from "react"
import { Image, Text, View, type ViewProps } from "react-native"
import { spacing, typography } from "@paneui/tokens"

import { useTheme } from "./theme"

export type AvatarProps = ViewProps & {
  name: string
  src?: string
  size?: "sm" | "default" | "lg"
}

const sizes = { sm: spacing["2xl"], default: spacing["3xl"], lg: spacing["3xl"] + spacing.lg }
const textSizes = { sm: typography.caption, default: typography.supporting, lg: typography.body }

export function Avatar({ name, src, size = "default", style, ...props }: AvatarProps) {
  const { colors } = useTheme()
  const [failed, setFailed] = React.useState(false)
  const dimension = sizes[size]
  const initials = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("")
  return (
    <View
      {...props}
      accessibilityRole="image"
      accessibilityLabel={name}
      style={[{ width: dimension, height: dimension, borderRadius: dimension / 2, backgroundColor: colors.muted, alignItems: "center", justifyContent: "center", overflow: "hidden" }, style]}
    >
      {initials ? <Text style={[textSizes[size], { color: colors.mutedForeground, fontWeight: "500" }]}>{initials}</Text> : null}
      {src && !failed ? (
        // design-check-ignore media-outline -- native image; the circular crop and muted fallback carry the edge
        <Image accessible={false} source={{ uri: src }} onError={() => setFailed(true)} style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }} />
      ) : null}
    </View>
  )
}
