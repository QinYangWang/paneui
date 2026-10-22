import type { ConfigContext, ExpoConfig } from "expo/config"

export default function appConfig({ config }: ConfigContext): ExpoConfig {
  return {
    ...config,
    name: config.name ?? "PaneUI Native",
    slug: config.slug ?? "paneui-native",
    experiments: { ...config.experiments, baseUrl: process.env.NATIVE_BASE_PATH ?? "" },
  }
}
