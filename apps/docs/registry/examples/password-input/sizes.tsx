import { PasswordInput } from "@paneui/ui/components/password-input"

export default function PasswordInputSizes() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <PasswordInput size="sm" defaultValue="hunter2" aria-label="Small" />
      <PasswordInput defaultValue="hunter2" aria-label="Default" />
      <PasswordInput size="lg" defaultValue="hunter2" aria-label="Large" />
    </div>
  )
}
