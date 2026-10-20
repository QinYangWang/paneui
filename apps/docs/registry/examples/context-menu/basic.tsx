import { CopyIcon, DownloadIcon, EditIcon, TrashIcon } from "@paneui/ui/icons"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@paneui/ui/components/context-menu"

export default function ContextMenuBasic() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-full max-w-xs items-center justify-center rounded-2xl bg-muted/50 text-sm text-muted-foreground shadow-well">
        Right-click invoice-0412.pdf
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          <EditIcon />
          Rename
          <ContextMenuShortcut>F2</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <CopyIcon />
          Duplicate
          <ContextMenuShortcut>⌘D</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <DownloadIcon />
          Download
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          <TrashIcon />
          Delete
          <ContextMenuShortcut>⌫</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
