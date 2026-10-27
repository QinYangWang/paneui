import { CommandGroup } from "@paneui/ui/components/command-copy"

const items = [
  { value: "pnpm", command: "pnpm dlx shadcn@latest add @paneui/theme @paneui/button" },
  { value: "npm", command: "npx shadcn@latest add @paneui/theme @paneui/button" },
  { value: "yarn", command: "yarn dlx shadcn@latest add @paneui/theme @paneui/button" },
  { value: "bun", command: "bunx --bun shadcn@latest add @paneui/theme @paneui/button" },
]

export default function CommandCopyGroup() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      <CommandGroup items={items} storageKey="demo-package-manager" />
      <p className="text-ui text-muted-foreground">
        The tabs are the bar&apos;s top line, so a package-manager switch and the command it runs read as one control.
      </p>
    </div>
  )
}
