/// <reference lib="dom" />
import type { KeyboardEvent } from "react"

export function useSliderKeyboard(value: number, min: number, max: number, step: number, disabled: boolean, change: (value: number) => void) {
  return {
    tabIndex: disabled ? -1 : 0,
    "aria-valuemin": min,
    "aria-valuemax": max,
    "aria-valuenow": value,
    "aria-disabled": disabled,
    onKeyDown(event: KeyboardEvent<HTMLElement>) {
      if (disabled) return
      const rtl = getComputedStyle(event.currentTarget).direction === "rtl"
      const values: Record<string, number> = {
        ArrowRight: value + (rtl ? -step : step),
        ArrowLeft: value + (rtl ? step : -step),
        ArrowUp: value + step,
        ArrowDown: value - step,
        Home: min,
        End: max,
        PageUp: value + step * 10,
        PageDown: value - step * 10,
      }
      if (event.key in values) {
        event.preventDefault()
        change(values[event.key])
      }
    },
  }
}
