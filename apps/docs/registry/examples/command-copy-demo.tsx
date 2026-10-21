import { CommandCopy } from "@paneui/ui/components/command-copy"

export default function CommandCopyDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <CommandCopy command="npx shadcn@latest add @paneui/button" />
      <CommandCopy command="npx paneui@latest init" variant="floating" size="lg" />
    </div>
  )
}
