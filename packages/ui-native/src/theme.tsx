import * as React from "react"
import { useColorScheme } from "react-native"
import { colors, type ColorScheme, type ThemeColors } from "@paneui/tokens"

type Theme = { scheme: ColorScheme; colors: ThemeColors }
const ThemeContext = React.createContext<Theme | null>(null)

export function ThemeProvider({ mode, children }: { mode?: ColorScheme; children: React.ReactNode }) {
  const systemScheme = useColorScheme()
  const scheme = mode ?? (systemScheme === "dark" ? "dark" : "light")
  const theme = React.useMemo(() => ({ scheme, colors: colors[scheme] }), [scheme])
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}

export function useTheme(): Theme {
  const systemScheme = useColorScheme()
  const theme = React.useContext(ThemeContext)
  const scheme = systemScheme === "dark" ? "dark" : "light"
  return theme ?? { scheme, colors: colors[scheme] }
}
