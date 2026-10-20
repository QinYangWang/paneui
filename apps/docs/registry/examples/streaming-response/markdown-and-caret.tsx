import { ResponseMarkdown, StreamingCaret } from "@paneui/ui/components/streaming-response"

export default function StreamingResponseMarkdownAndCaret() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-4">
      <ResponseMarkdown caret text={"Checking three options:\n\n- **Direct** flight at 09:15\n- Via Taipei at 11:40"} />
      <p className="text-sm text-muted-foreground">
        Drafting your reply
        <StreamingCaret />
      </p>
    </div>
  )
}
