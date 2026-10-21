import { WindowFrame, WindowFrameBar, WindowFrameBody, WindowFrameTitle } from "@paneui/ui/components/window-frame"

export default function WindowFrameGlass() {
  return (
    <div className="flex w-full max-w-xl justify-center rounded-2xl bg-primary/12 p-8">
      <WindowFrame variant="glass" size="sm" className="w-full">
        <WindowFrameBar>
          <WindowFrameTitle>app.example.com</WindowFrameTitle>
        </WindowFrameBar>
        <WindowFrameBody className="h-36 p-4">
          <p className="text-ui text-muted-foreground">Your app goes here.</p>
        </WindowFrameBody>
      </WindowFrame>
    </div>
  )
}
