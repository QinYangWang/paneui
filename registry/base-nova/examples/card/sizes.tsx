import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/base-nova/ui/card"

export default function CardSizes() {
  return (
    <div className="grid w-full max-w-2xl grid-cols-3 items-start gap-3">
      {(["sm", "default", "lg"] as const).map((size) => (
        <Card key={size} size={size}>
          <CardHeader>
            <CardTitle>{size === "sm" ? "Small" : size === "lg" ? "Large" : "Default"}</CardTitle>
            <CardDescription>Open tasks</CardDescription>
          </CardHeader>
          <CardContent className="text-2xl font-semibold tabular-nums">12</CardContent>
        </Card>
      ))}
    </div>
  )
}
