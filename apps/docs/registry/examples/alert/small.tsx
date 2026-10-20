import { Alert, AlertContent, AlertDescription, AlertIcon, AlertTitle } from "@paneui/ui/components/alert"

export default function AlertSmall() {
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <Alert size="sm" variant="info">
        <AlertIcon />
        <AlertContent>
          <AlertTitle>Sync paused</AlertTitle>
          <AlertDescription>Resumes when you are back online.</AlertDescription>
        </AlertContent>
      </Alert>
      <Alert size="sm" variant="warning">
        <AlertIcon />
        <AlertContent>
          <AlertTitle>Card expires in 5 days</AlertTitle>
        </AlertContent>
      </Alert>
    </div>
  )
}
