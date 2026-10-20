import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@paneui/ui/components/resizable"

export default function ResizableDemo() {
  return (
    <div className="h-72 w-full max-w-2xl overflow-hidden rounded-xl bg-card shadow-raised">
      <ResizablePanelGroup direction="horizontal" autoSaveId="resizable-demo">
        <ResizablePanel id="files" defaultSize={28} minSize="140px" collapsible>
          <div className="flex h-full flex-col gap-1 p-3 text-ui text-muted-foreground">
            <span className="text-ui-sm">Files</span>
            <span>app/page.tsx</span>
            <span>app/layout.tsx</span>
            <span>packages/ui/src/lib/utils.ts</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel id="editor" minSize={30}>
          <ResizablePanelGroup direction="vertical" autoSaveId="resizable-demo-editor">
            <ResizablePanel id="code" defaultSize={65} minSize={20}>
              <div className="flex h-full items-center justify-center text-ui text-muted-foreground">Editor</div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel id="terminal" minSize={15} collapsible>
              <div className="flex h-full items-center justify-center bg-secondary font-mono text-ui-sm text-muted-foreground">Terminal</div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
