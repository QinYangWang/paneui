import { Button } from "@paneui/ui/components/button"
import { Kbd } from "@paneui/ui/components/kbd"

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
