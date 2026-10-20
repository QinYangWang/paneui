import { Button } from "@paneui/ui/components/button"

export default function ButtonDisabled() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button disabled>Default</Button>
      <Button variant="secondary" disabled>
        Secondary
      </Button>
    </div>
  )
}
