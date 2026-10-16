import { ApertureIcon } from "@/components/icons"
import { ThreadList, ThreadListItem } from "@/registry/base-nova/ui/thread-list-item"

const STATES = ["open", "draft", "merged", "closed"] as const

export default function ThreadListItemPrStates() {
  return (
    <div className="w-72 frame-3xl frame-p-2 bg-shell">
      <ThreadList className="gap-px">
        {STATES.map((status, i) => (
          <ThreadListItem key={status} title={`Pull request ${status}`} icon={<ApertureIcon />} repo="acme" pr={{ number: 400 + i, status }} branch={`feat/${status}`} />
        ))}
      </ThreadList>
    </div>
  )
}
