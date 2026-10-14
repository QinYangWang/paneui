import { StatefulButton } from "@/registry/base-nova/ui/button-stateful"

export default function ButtonStatefulSizes() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <StatefulButton size="xs" state="loading" loadingText="Saving">
        Save
      </StatefulButton>
      <StatefulButton size="sm" state="loading" loadingText="Saving">
        Save
      </StatefulButton>
      <StatefulButton state="loading" loadingText="Saving">
        Save
      </StatefulButton>
      <StatefulButton size="lg" state="loading" loadingText="Saving">
        Save
      </StatefulButton>
    </div>
  )
}
