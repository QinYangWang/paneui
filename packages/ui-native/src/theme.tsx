import * as React from "react"
import { Platform, useColorScheme, type ViewStyle } from "react-native"
import { colors, paper, radius, type ColorScheme, type ThemeColors, type ThemeStyle } from "@paneui/tokens"

type Theme = {
  scheme: ColorScheme
  style: ThemeStyle
  colors: ThemeColors
  radius: Readonly<Record<keyof typeof radius, number>>
  controlRadius: number
  headingFont?: string
  shadows: { raised?: ViewStyle; surface?: ViewStyle; overlay?: ViewStyle }
}
const ThemeContext = React.createContext<Theme | null>(null)
function resolveTheme(scheme: ColorScheme, style: ThemeStyle, headingFont?: string): Theme {
  const isPaper = style === "paper"
  return {
    scheme, style,
    colors: isPaper ? paper.colors[scheme] : colors[scheme],
    radius: isPaper ? paper.radius : radius,
    controlRadius: isPaper ? paper.controlRadius : radius.lg,
    headingFont: headingFont ?? (isPaper ? Platform.select({ web: paper.headingFont, ios: "Georgia", default: "serif" }) : undefined),
    shadows: isPaper ? paper.shadows[scheme] : {},
  }
}

export type ThemeProviderProps = {
  mode?: ColorScheme
  style?: ThemeStyle
  headingFont?: string
  children: React.ReactNode
}
export function ThemeProvider({ mode, style = "default", headingFont, children }: ThemeProviderProps) {
  const systemScheme = useColorScheme()
  const scheme = mode ?? (systemScheme === "dark" ? "dark" : "light")
  const theme = React.useMemo(() => resolveTheme(scheme, style, headingFont), [scheme, style, headingFont])
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}

export function useTheme(): Theme {
  const systemScheme = useColorScheme()
  const theme = React.useContext(ThemeContext)
  return theme ?? resolveTheme(systemScheme === "dark" ? "dark" : "light", "default")
}
