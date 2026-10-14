import { ArrowRightIcon, SparklesIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"

export default function ButtonWithIcon() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button variant="secondary">
        <SparklesIcon data-icon="inline-start" />
        Generate
      </Button>
      <Button>
        Continue
        <ArrowRightIcon data-icon="inline-end" />
      </Button>
    </div>
  )
}
