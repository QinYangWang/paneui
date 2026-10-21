import { AgentProgress } from "@paneui/ui/components/agent-progress"
import { WindowFrame, WindowFrameActions, WindowFrameBar, WindowFrameBody, WindowFrameTitle } from "@paneui/ui/components/window-frame"

export default function WindowFrameCenteredTitle() {
  return (
    <WindowFrame className="w-full max-w-lg">
      <WindowFrameBar>
        <WindowFrameTitle align="center">Release review</WindowFrameTitle>
        <WindowFrameActions>
          <AgentProgress label="Working" running={false} />
        </WindowFrameActions>
      </WindowFrameBar>
      <WindowFrameBody className="h-36 p-4">
        <p className="text-ui text-muted-foreground">Three checks passed.</p>
      </WindowFrameBody>
    </WindowFrame>
  )
}
