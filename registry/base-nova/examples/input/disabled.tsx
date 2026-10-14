import { Input } from "@/registry/base-nova/ui/input"
import { Label } from "@/registry/base-nova/ui/label"

export default function InputDisabled() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Label htmlFor="input-workspace">Workspace URL</Label>
      <Input id="input-workspace" disabled defaultValue="qinyang.hark.app" />
    </div>
  )
}
