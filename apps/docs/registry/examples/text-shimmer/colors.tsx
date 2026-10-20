import type * as React from "react"

import { TextShimmer } from "@paneui/ui/components/text-shimmer"

export default function TextShimmerColors() {
  return (
    <div className="flex flex-col items-start gap-3">
      <TextShimmer
        className="text-sm font-medium"
        style={{ "--shimmer-highlight": "var(--primary)" } as React.CSSProperties}
      >
        Connecting to your calendar…
      </TextShimmer>
      <TextShimmer
        className="text-sm font-medium"
        style={
          {
            "--shimmer-base": "var(--success)",
            "--shimmer-highlight": "var(--foreground)",
          } as React.CSSProperties
        }
      >
        Payment verified, finishing up…
      </TextShimmer>
    </div>
  )
}
