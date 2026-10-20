"use client"

import * as React from "react"
import { motion } from "motion/react"

import { cn } from "@paneui/ui/lib/utils"

function ChatThread({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="chat-thread" role="log" className={cn("flex flex-col gap-2.5", className)} {...props} />
}

/** A message bubble that springs in from its sender's side. */
function ChatBubble({
  from = "assistant",
  className,
  children,
}: {
  from?: "user" | "assistant"
  className?: string
  children: React.ReactNode
}) {
  const isUser = from === "user"
  return (
    <motion.div
      data-slot="chat-bubble"
      data-from={from}
      layout
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 420, damping: 32 }}
      style={{ transformOrigin: isUser ? "bottom right" : "bottom left" }}
      className={cn(
        "max-w-[80%] rounded-3xl px-4 py-2.5 text-ui-lg leading-relaxed",
        isUser
          ? "self-end rounded-br-md bg-primary text-primary-foreground shadow-primary"
          : "self-start rounded-bl-md bg-card text-secondary-foreground shadow-raised",
        className
      )}
    >
      {children}
    </motion.div>
  )
}

/** Three bouncing dots inside an assistant bubble. */
function ChatTyping({ className }: { className?: string }) {
  return (
    <div
      data-slot="chat-typing"
      aria-label="Typing"
      className={cn("flex h-10 w-16 items-center justify-center gap-1 self-start rounded-3xl rounded-bl-md bg-card shadow-raised", className)}
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="size-1.5 rounded-full bg-muted-foreground"
          animate={{ y: [0, -3, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </div>
  )
}

export { ChatThread, ChatBubble, ChatTyping }
