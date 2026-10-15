import { Kbd } from "@/registry/base-nova/ui/kbd"

export default function KbdSizes() {
  return (
    <div className="flex items-center gap-3">
      <Kbd size="sm">esc</Kbd>
      <Kbd>⌘K</Kbd>
      <Kbd size="lg">Enter</Kbd>
    </div>
  )
}
