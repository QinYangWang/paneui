import * as React from "react"
import { View, type ViewProps } from "react-native"
import { spacing } from "@paneui/tokens"
import { Label } from "./label"
import { Text } from "./text"

export type FieldState = { id: string; label: string; description?: string; error?: string; disabled?: boolean; required?: boolean }
const FieldContext = React.createContext<FieldState | null>(null)
export function useField() { return React.useContext(FieldContext) }
export function useFormValue<T>(value: T | undefined, defaultValue: T, onValueChange?: (value: T) => void) {
  const [internal, setInternal] = React.useState(defaultValue)
  const current = value === undefined ? internal : value
  const change = (next: T) => { if (value === undefined) setInternal(next); onValueChange?.(next) }
  return [current, change] as const
}
export type FieldProps = ViewProps & Omit<FieldState, "id"> & { id?: string }
export function Field({ id, label, description, error, disabled, required, children, style, ...props }: FieldProps) {
  const generated = React.useId()
  const field = { id: id ?? generated, label, description, error, disabled, required }
  return <FieldContext.Provider value={field}><View {...props} style={[{ gap: spacing.sm }, style]}><Label nativeID={`${field.id}-label`} disabled={disabled} required={required}>{label}</Label>{children}{error ? <Text nativeID={`${field.id}-hint`} variant="supporting" tone="destructive" accessibilityLiveRegion="polite">{error}</Text> : description ? <Text nativeID={`${field.id}-hint`} variant="supporting" tone="muted">{description}</Text> : null}</View></FieldContext.Provider>
}
