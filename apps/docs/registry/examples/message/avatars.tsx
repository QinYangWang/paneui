import { BotIcon } from "@paneui/ui/icons"
import { Message, MessageAvatar, MessageBubble, MessageContent, MessageHeader, MessageList } from "@paneui/ui/components/message"

export default function MessageAvatars() {
  return (
    <MessageList className="max-w-lg">
      <Message from="user">
        <MessageAvatar>QW</MessageAvatar>
        <MessageContent>
          <MessageBubble tone="primary">Is the dentist still at 10 tomorrow?</MessageBubble>
        </MessageContent>
      </Message>
      <Message from="assistant">
        <MessageAvatar>
          <BotIcon />
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>Hark</MessageHeader>
          <MessageBubble>Yes, 10:00 with Dr. Lin.</MessageBubble>
        </MessageContent>
      </Message>
      <Message from="assistant">
        <MessageAvatar placeholder />
        <MessageContent>
          <MessageBubble>I’ll remind you at 9:15 so you can leave on time.</MessageBubble>
        </MessageContent>
      </Message>
    </MessageList>
  )
}
