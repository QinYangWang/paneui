import { ArrowRightIcon, SparklesIcon } from "@paneui/ui/icons"
import { Button } from "@paneui/ui/components/button"

export default function ButtonWithIcon() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button variant="secondary">
        <SparklesIcon data-icon="inline-start" />
        Generate
      </Button>
      <Button>
        Continue
        <ArrowRightIcon className="rtl:-scale-x-100" data-icon="inline-end" />
      </Button>
    </div>
  )
}
