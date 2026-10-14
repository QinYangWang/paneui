import { Message, MessageBubble, MessageContent, MessageList } from "@/registry/base-nova/ui/message"

const TURNS = [
  { from: "user", text: "Coffee at 9?" },
  { from: "assistant", text: "Booked for two at Fuglen." },
  { from: "user", text: "Perfect" },
  { from: "assistant", text: "I'll send Sam the address." },
] as const

export default function MessageCompact() {
  return (
    <MessageList spacing="compact" className="max-w-lg">
      {TURNS.map((t) => (
        <Message key={t.text} from={t.from}>
          <MessageContent>
            <MessageBubble size="sm" tone={t.from === "user" ? "primary" : "default"}>
              {t.text}
            </MessageBubble>
          </MessageContent>
        </Message>
      ))}
    </MessageList>
  )
}
