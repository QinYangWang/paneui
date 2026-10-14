import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/base-nova/ui/card"

export default function CardSizeSm() {
  return (
    <div className="grid w-full max-w-md grid-cols-2 gap-3">
      <Card size="sm">
        <CardHeader>
          <CardTitle>Open tasks</CardTitle>
          <CardDescription>Across 3 projects</CardDescription>
        </CardHeader>
        <CardContent className="text-2xl font-semibold tabular-nums">12</CardContent>
      </Card>
      <Card size="sm">
        <CardHeader>
          <CardTitle>Spent this month</CardTitle>
          <CardDescription>Budget $600</CardDescription>
        </CardHeader>
        <CardContent className="text-2xl font-semibold tabular-nums">$418</CardContent>
      </Card>
    </div>
  )
}
