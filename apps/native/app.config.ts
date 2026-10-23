import type { ConfigContext, ExpoConfig } from "expo/config"

export default function appConfig({ config }: ConfigContext): ExpoConfig {
  process.env.EXPO_PUBLIC_NATIVE_BASE_PATH = process.env.NATIVE_BASE_PATH ?? ""
  return {
    ...config,
    name: config.name ?? "PaneUI Native",
    slug: config.slug ?? "paneui-native",
    experiments: { ...config.experiments, baseUrl: process.env.NATIVE_BASE_PATH ?? "" },
  }
}
