"use client"

import { AgentComposer } from "@paneui/ui/blocks/agent-composer/agent-composer"

export default function AgentComposerLabels() {
  return (
    <div className="w-full max-w-xl">
      <AgentComposer
        placeholder="问点什么"
        labels={{ send: "发送", stop: "停止", input: "消息", attach: "添加文件" }}
        inputProps={{ id: "chat-input", name: "message", enterKeyHint: "send" }}
        onAttach={() => undefined}
      />
    </div>
  )
}
