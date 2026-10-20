import { ChatIcon } from "@paneui/ui/icons"
import { ThreadList, ThreadListGroup, ThreadListItem } from "@paneui/ui/components/thread-list-item"

export default function ThreadListItemMinimal() {
  return (
    <div className="w-64 frame-3xl frame-p-2 bg-card shadow-raised">
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
