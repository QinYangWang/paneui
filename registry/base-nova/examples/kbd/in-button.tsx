import { Button } from "@/registry/base-nova/ui/button"
import { Kbd } from "@/registry/base-nova/ui/kbd"

export default function KbdInButton() {
  return (
    <div className="flex items-center gap-2">
      <Button variant="secondary">
        Save draft
        <Kbd>⌘S</Kbd>
      </Button>
      <Button variant="outline">
        Search
        <Kbd>/</Kbd>
      </Button>
    </div>
  )
}
