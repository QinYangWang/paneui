import { Loader } from "@/registry/base-nova/ui/loader"

export default function LoaderColors() {
  return (
    <div className="flex items-center gap-6">
      <span className="text-primary">
        <Loader variant="ring" />
      </span>
      <span className="text-success">
        <Loader variant="pulse" />
      </span>
      <span className="text-warning">
        <Loader variant="bars" />
      </span>
      <span className="text-destructive">
        <Loader variant="ripple" />
      </span>
      <span className="text-muted-foreground">
        <Loader variant="typing" />
      </span>
    </div>
  )
}
