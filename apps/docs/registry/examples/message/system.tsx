import { Message, MessageBubble, MessageContent, MessageList, MessageMarker } from "@paneui/ui/components/message"

export default function MessageSystem() {
  return (
    <MessageList className="max-w-lg">
      <Message from="user">
        <MessageContent>
          <MessageBubble tone="primary">Add Sam to this chat.</MessageBubble>
        </MessageContent>
      </Message>
      <Message from="system">
        <MessageContent>
          <MessageBubble tone="muted" size="sm" tail={false}>
            Sam can now see messages from today onward.
          </MessageBubble>
        </MessageContent>
      </Message>
      <MessageMarker>Sam joined</MessageMarker>
      <Message from="assistant">
        <MessageContent>
          <MessageBubble>Hi Sam, we’re planning Saturday’s hike.</MessageBubble>
        </MessageContent>
      </Message>
    </MessageList>
  )
}
