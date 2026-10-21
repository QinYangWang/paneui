import { CommandCopy } from "@paneui/ui/components/command-copy"

export default function CommandCopySizes() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <CommandCopy command="pnpm add motion" />
      <CommandCopy command="pnpm add motion" size="lg" />
    </div>
  )
}
