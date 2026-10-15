import { Skeleton } from "@/registry/base-nova/ui/skeleton"

export default function SkeletonDemo() {
  return (
    <div className="flex w-full max-w-xs items-center gap-3" aria-busy aria-label="Loading profile">
      <Skeleton shape="circle" className="size-10" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-3.5 w-3/5" />
        <Skeleton className="h-3 w-4/5" />
      </div>
    </div>
  )
}
