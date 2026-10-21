import { CommandCopy } from "@paneui/ui/components/command-copy"

export default function CommandCopyNoPrompt() {
  return (
    <div className="w-full max-w-md">
      <CommandCopy command="API_BASE_URL=http://localhost:8080" prompt={null} label="Copy variable" />
    </div>
  )
}
