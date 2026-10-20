import { Button } from "@paneui/ui/components/button"
import { Loader } from "@paneui/ui/components/loader"

export default function LoaderInContext() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Button disabled>
        <Loader variant="ring" size="sm" label="Saving" />
        Saving changes
      </Button>
      <div className="flex items-center gap-3 rounded-xl bg-card px-4 py-3 text-sm shadow-raised">
        <span className="flex text-muted-foreground">
          <Loader variant="spinner" size="sm" label="Syncing calendar" />
        </span>
        <span>Syncing your calendar…</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader variant="typing" size="sm" label="Assistant is typing" />
        <span>Assistant is typing</span>
      </div>
    </div>
  )
}
