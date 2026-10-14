import { MoreHorizontalIcon } from "@/components/icons";
import { Button } from "@/registry/base-nova/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/registry/base-nova/ui/card";

export default function CardDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Weekly digest</CardTitle>
          <CardDescription>
            Sales, stock and open tasks, every Monday.
          </CardDescription>
          <CardAction>
            <Button variant="ghost" size="icon-sm" aria-label="More">
              <MoreHorizontalIcon />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          Next run Monday 9:00.
        </CardContent>
        <CardFooter className="justify-end">
          <Button variant="secondary" size="sm">
            Edit
          </Button>
          <Button size="sm">Run now</Button>
        </CardFooter>
      </Card>
      <Card variant="inset" className="w-full max-w-sm">
        <CardPanel>
          <CardHeader>
            <CardTitle>Pro</CardTitle>
            <CardDescription>Unlimited agents, priority runs.</CardDescription>
          </CardHeader>
          <CardContent className="text-2xl font-semibold tabular-nums">
            $24/mo
          </CardContent>
        </CardPanel>
        <CardFooter className="justify-between py-3">
          <span className="text-muted-foreground">Billed yearly</span>
          <Button size="sm">Upgrade</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
