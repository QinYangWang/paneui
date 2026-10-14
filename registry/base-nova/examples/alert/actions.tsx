import { Alert, AlertAction, AlertContent, AlertDescription, AlertIcon, AlertTitle } from "@/registry/base-nova/ui/alert"
import { Button } from "@/registry/base-nova/ui/button"

export default function AlertActions() {
  return (
    <Alert variant="info" className="w-full max-w-md">
      <AlertIcon />
      <AlertContent>
        <AlertTitle>Price dropped</AlertTitle>
        <AlertDescription>Your Tokyo flight is now $86 cheaper.</AlertDescription>
      </AlertContent>
      <AlertAction>
        <Button size="xs" variant="ghost">
          Ignore
        </Button>
        <Button size="xs">Rebook</Button>
      </AlertAction>
    </Alert>
  )
}
