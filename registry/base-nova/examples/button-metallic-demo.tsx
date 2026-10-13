import { BoltIcon, LockIcon } from "@/components/icons"
import { MetallicButton } from "@/registry/base-nova/ui/button-metallic"

export default function ButtonMetallicDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <MetallicButton size="lg">
        <BoltIcon />
        Upgrade to Pro
      </MetallicButton>
      <MetallicButton>
        <LockIcon />
        Unlock vault
      </MetallicButton>
      <MetallicButton size="icon" aria-label="Boost" paused>
        <BoltIcon />
      </MetallicButton>
    </div>
  )
}
