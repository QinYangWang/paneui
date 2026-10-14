import { CopyIcon, EditIcon, RefreshIcon } from "@/components/icons"
import { Message, MessageAction, MessageActions, MessageBubble, MessageContent, MessageList } from "@/registry/base-nova/ui/message"

export default function MessageHoverActions() {
  return (
    <MessageList className="max-w-lg">
      <Message from="user">
        <MessageContent>
          <MessageBubble tone="primary">Translate “see you Friday” into Japanese.</MessageBubble>
          <MessageActions>
            <MessageAction label="Edit">
              <EditIcon />
            </MessageAction>
          </MessageActions>
        </MessageContent>
      </Message>
      <Message from="assistant">
        <MessageContent>
          <MessageBubble>金曜日に会いましょう (Kin’yōbi ni aimashō).</MessageBubble>
          <MessageActions>
            <MessageAction label="Copy">
              <CopyIcon />
            </MessageAction>
            <MessageAction label="Regenerate">
              <RefreshIcon />
            </MessageAction>
          </MessageActions>
        </MessageContent>
      </Message>
    </MessageList>
  )
}
