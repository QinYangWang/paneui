import { Loader } from "@/registry/base-nova/ui/loader"

export default function LoaderSizes() {
  return (
    <div className="flex items-center gap-6 text-muted-foreground">
      {(["xs", "sm", "md", "lg"] as const).map((size) => (
        <Loader key={size} size={size} />
      ))}
    </div>
  )
}
