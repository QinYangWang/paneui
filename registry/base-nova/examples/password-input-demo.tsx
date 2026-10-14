import { Field, FieldDescription, FieldLabel } from "@/registry/base-nova/ui/field"
import { PasswordInput } from "@/registry/base-nova/ui/password-input"

export default function PasswordInputDemo() {
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel>Password</FieldLabel>
      <PasswordInput defaultValue="correct-horse-battery" autoComplete="new-password" />
      <FieldDescription>At least 8 characters.</FieldDescription>
    </Field>
  )
}
