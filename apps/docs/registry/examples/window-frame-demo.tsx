import { Button } from "@paneui/ui/components/button"
import { WindowFrame, WindowFrameActions, WindowFrameBar, WindowFrameBody, WindowFrameTitle } from "@paneui/ui/components/window-frame"

export default function WindowFrameDemo() {
  return (
    <WindowFrame className="w-full max-w-md">
      <WindowFrameBar>
        <WindowFrameTitle>Northwind</WindowFrameTitle>
        <WindowFrameActions>
          <Button size="xs" variant="secondary">
            Share
          </Button>
        </WindowFrameActions>
      </WindowFrameBar>
      <WindowFrameBody className="flex h-40 flex-col gap-2 p-4">
        <p className="text-ui font-medium">Weekly report</p>
        <p className="text-ui text-muted-foreground">Signups are up 12% on last week.</p>
      </WindowFrameBody>
    </WindowFrame>
  )
}
