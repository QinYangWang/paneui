import { Card, CardFooter, CardPanel } from "@paneui/ui/components/card"

export default function CardInsetCode() {
  return (
    <Card variant="inset" className="w-full max-w-sm">
      <CardFooter className="justify-between py-2">
        <span className="font-mono text-xs text-muted-foreground">terminal</span>
        <span className="text-xs text-muted-foreground">pnpm</span>
      </CardFooter>
      <CardPanel className="px-4 font-mono text-xs">
        pnpm dlx shadcn@latest add @paneui/card
      </CardPanel>
    </Card>
  )
}
