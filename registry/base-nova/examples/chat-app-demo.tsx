import { ChatApp } from "@/registry/base-nova/blocks/chat-app/chat-app"

export default function ChatAppDemo() {
  return (
    <div className="h-[40rem] w-full">
      <ChatApp autoPlayPrompt="Plan a Kyoto trip in November" />
    </div>
  )
}
