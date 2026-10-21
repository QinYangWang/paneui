import { Badge } from "@paneui/ui/components/badge"
import { Button } from "@paneui/ui/components/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@paneui/ui/components/card"

export default function ThemePaperDemo() {
  return (
    <div data-style="paper" className="w-full max-w-sm rounded-3xl bg-background p-4 text-foreground">
      <Card>
        <CardHeader>
          <CardTitle>Weekly notes</CardTitle>
          <CardDescription>Three drafts are ready for review.</CardDescription>
        </CardHeader>
        <CardFooter className="gap-2">
          <Button>Review</Button>
          <Button variant="outline">Later</Button>
          <Badge variant="chip" className="ms-auto">
            Draft
          </Badge>
        </CardFooter>
      </Card>
    </div>
  )
}
