import { Button } from "@/registry/base-nova/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/registry/base-nova/ui/card"
import { Input } from "@/registry/base-nova/ui/input"
import { Label } from "@/registry/base-nova/ui/label"

export default function CardWithForm() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Invite a teammate</CardTitle>
        <CardDescription>They get access to every shared project.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="invite-name">Name</Label>
          <Input id="invite-name" placeholder="Dana Reyes" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="invite-email">Email</Label>
          <Input id="invite-email" type="email" placeholder="dana@example.com" />
        </div>
      </CardContent>
      <CardFooter className="justify-end">
        <Button variant="ghost" size="sm">
          Cancel
        </Button>
        <Button size="sm">Send invite</Button>
      </CardFooter>
    </Card>
  )
}
