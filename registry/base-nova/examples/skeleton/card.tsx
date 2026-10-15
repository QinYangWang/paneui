import { Card, CardContent, CardHeader } from "@/registry/base-nova/ui/card"
import { Skeleton } from "@/registry/base-nova/ui/skeleton"

export default function SkeletonCard() {
  return (
    <Card className="w-full max-w-xs" aria-busy aria-label="Loading">
      <CardHeader>
        <Skeleton className="h-4 w-2/5" />
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Skeleton shape="card" className="aspect-video w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/4" />
      </CardContent>
    </Card>
  )
}
