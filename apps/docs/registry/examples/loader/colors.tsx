import { Loader } from "@paneui/ui/components/loader"

export default function LoaderColors() {
  return (
    <div className="flex items-center gap-6">
      <Loader variant="ring" className="text-primary" />
      <Loader variant="pulse" className="text-success" />
      <Loader variant="bars" className="text-warning" />
      <Loader variant="ripple" className="text-destructive" />
      <Loader variant="typing" className="text-muted-foreground" />
    </div>
  )
}
