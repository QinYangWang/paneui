import { ChatIcon } from "@/components/icons"
import { ThreadList, ThreadListGroup, ThreadListItem } from "@/registry/base-nova/ui/thread-list-item"

export default function ThreadListItemMinimal() {
  return (
    <div className="w-64 rounded-2xl bg-card p-2 shadow-raised">
      <ThreadList>
        <ThreadListGroup label="Chats">
          <ThreadListItem title="Plan the offsite agenda" icon={<ChatIcon />} />
          <ThreadListItem title="Summarise last week's tickets" icon={<ChatIcon />} active />
          <ThreadListItem title="Draft the launch email" icon={<ChatIcon />} unread />
        </ThreadListGroup>
      </ThreadList>
    </div>
  )
}
