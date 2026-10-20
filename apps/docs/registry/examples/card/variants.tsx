import { Card, CardContent, CardDescription, CardHeader, CardPanel, CardTitle } from "@paneui/ui/components/card"

const variants = ["default", "outline", "ghost"] as const

export default function CardVariants() {
  return (
    <div className="grid w-full max-w-2xl grid-cols-2 items-start gap-3">
      {variants.map((variant) => (
        <Card key={variant} variant={variant}>
          <CardHeader>
            <CardTitle className="capitalize">{variant}</CardTitle>
            <CardDescription>Weekly active users</CardDescription>
          </CardHeader>
          <CardContent className="text-2xl font-semibold tabular-nums">1,284</CardContent>
        </Card>
      ))}
      <Card variant="inset">
        <CardPanel>
          <CardHeader>
            <CardTitle>Inset</CardTitle>
            <CardDescription>Weekly active users</CardDescription>
          </CardHeader>
          <CardContent className="text-2xl font-semibold tabular-nums">1,284</CardContent>
        </CardPanel>
      </Card>
    </div>
  )
}
