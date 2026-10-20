import { Field, FieldDescription, FieldLabel } from "@paneui/ui/components/field"
import { PasswordInput } from "@paneui/ui/components/password-input"

export default function PasswordInputDemo() {
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel>Password</FieldLabel>
      <PasswordInput defaultValue="correct-horse-battery" autoComplete="new-password" />
      <FieldDescription>At least 8 characters.</FieldDescription>
    </Field>
  )
}
