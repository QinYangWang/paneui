import { Button } from "@paneui/ui/components/button"

export default function ButtonPill() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button shape="pill" size="sm" variant="secondary">
          Small
        </Button>
        <Button shape="pill" variant="secondary">
          Default
        </Button>
        <Button shape="pill" size="lg" variant="secondary">
          Large
        </Button>
        <Button shape="pill" size="xl" variant="secondary">
          Extra large
        </Button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3 rounded-2xl bg-primary/12 p-6">
        <Button shape="pill" size="xl" variant="inverse">
          Get started
        </Button>
        <Button shape="pill" size="xl" variant="glass">
          Browse components
        </Button>
      </div>
    </div>
  )
}
