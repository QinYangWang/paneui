import { WindowFrame, WindowFrameBar, WindowFrameBody, WindowFrameTitle } from "@paneui/ui/components/window-frame"

export default function WindowFrameNoControls() {
  return (
    <WindowFrame size="sm" className="w-full max-w-md">
      <WindowFrameBar controls={false}>
        <WindowFrameTitle>Preview</WindowFrameTitle>
      </WindowFrameBar>
      <WindowFrameBody className="h-32 p-4">
        <p className="text-ui text-muted-foreground">Nothing to show yet.</p>
      </WindowFrameBody>
    </WindowFrame>
  )
}
