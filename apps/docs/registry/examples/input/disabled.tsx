import { Input } from "@paneui/ui/components/input"
import { Label } from "@paneui/ui/components/label"

export default function InputDisabled() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Label htmlFor="input-workspace">Workspace URL</Label>
      <Input id="input-workspace" disabled defaultValue="qinyang.hark.app" />
    </div>
  )
}
