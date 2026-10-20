import { ChatApp } from "@paneui/ui/blocks/chat-app/chat-app"

export default function ChatAppDemo() {
  return (
    <div className="h-160 w-full">
      <ChatApp searchHotkey={null} autoPlayPrompt="Plan a Kyoto trip in November" />
    </div>
  )
}
