import { StatefulButton } from "@paneui/ui/components/button-stateful"

export default function ButtonStatefulNoTint() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <StatefulButton state="success" successText="Published">
        Publish
      </StatefulButton>
      <StatefulButton state="success" successText="Published" tint={false}>
        Publish
      </StatefulButton>
    </div>
  )
}
