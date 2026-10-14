import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/registry/base-nova/ui/resizable"

export default function ResizableWithHandle() {
  return (
    <div className="h-48 w-full max-w-xl overflow-hidden rounded-xl bg-card shadow-raised">
      <ResizablePanelGroup>
        <ResizablePanel id="left" minSize={20}>
          <div className="flex h-full items-center justify-center text-ui text-muted-foreground">Chat A</div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel id="right" minSize={20}>
          <div className="flex h-full items-center justify-center text-ui text-muted-foreground">Chat B</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
