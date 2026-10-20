import { Alert, AlertContent, AlertDescription, AlertIcon, AlertTitle } from "@paneui/ui/components/alert"

export default function AlertDefaultVariant() {
  return (
    <Alert className="w-full max-w-md">
      <AlertIcon />
      <AlertContent>
        <AlertTitle>Maintenance on Sunday</AlertTitle>
        <AlertDescription>Sync pauses from 02:00 to 02:30 HKT. Nothing to do on your side.</AlertDescription>
      </AlertContent>
    </Alert>
  )
}
