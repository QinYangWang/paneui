import { CalendarDaysIcon, SparklesIcon } from "@/components/icons"
import { Alert, AlertContent, AlertDescription, AlertIcon, AlertTitle } from "@/registry/base-nova/ui/alert"

export default function AlertCustomIcon() {
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <Alert variant="info">
        <AlertIcon>
          <SparklesIcon />
        </AlertIcon>
        <AlertContent>
          <AlertTitle>Summary ready</AlertTitle>
          <AlertDescription>3 action items from this morning&apos;s standup.</AlertDescription>
        </AlertContent>
      </Alert>
      <Alert variant="warning">
        <AlertIcon>
          <CalendarDaysIcon />
        </AlertIcon>
        <AlertContent>
          <AlertTitle>Two meetings overlap</AlertTitle>
          <AlertDescription>Design review and 1:1 both start at 15:00.</AlertDescription>
        </AlertContent>
      </Alert>
    </div>
  )
}
