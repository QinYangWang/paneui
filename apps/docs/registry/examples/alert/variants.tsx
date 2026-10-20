import { Alert, AlertContent, AlertDescription, AlertIcon, AlertTitle } from "@paneui/ui/components/alert"

const variants = [
  { variant: "default", title: "New sign-in", body: "Chrome on macOS, Hong Kong." },
  { variant: "info", title: "Maintenance tonight", body: "Search is read-only from 02:00 to 02:30." },
  { variant: "success", title: "Export ready", body: "248 rows saved to your downloads." },
  { variant: "warning", title: "Storage at 90%", body: "Old builds are removed after 30 days." },
  { variant: "destructive", title: "Payment failed", body: "Update your card to keep the Pro plan." },
] as const

export default function AlertVariants() {
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      {variants.map(({ variant, title, body }) => (
        <Alert key={variant} variant={variant}>
          <AlertIcon />
          <AlertContent>
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{body}</AlertDescription>
          </AlertContent>
        </Alert>
      ))}
    </div>
  )
}
