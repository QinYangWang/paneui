import { I18nManager } from "react-native"

export function useLayoutDirection() {
  return I18nManager.isRTL
}
