import { MoreHorizontalIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/base-nova/ui/card"

export default function CardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Weekly digest</CardTitle>
        <CardDescription>Sales, stock and open tasks, every Monday.</CardDescription>
        <CardAction>
          <Button variant="ghost" size="icon-sm" aria-label="More">
            <MoreHorizontalIcon />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="text-muted-foreground">Next run Monday 9:00.</CardContent>
      <CardFooter className="justify-end">
        <Button variant="secondary" size="sm">Edit</Button>
        <Button size="sm">Run now</Button>
      </CardFooter>
    </Card>
  )
}
