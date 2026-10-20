import { DownloadIcon } from "@paneui/ui/icons"
import { StatefulButton, type ButtonState } from "@paneui/ui/components/button-stateful"

const STATES: ButtonState[] = ["idle", "loading", "success", "error"]

export default function ButtonStatefulStates() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {STATES.map((state) => (
        <StatefulButton
          key={state}
          state={state}
          loadingText="Exporting"
          successText="Exported"
          errorText="Export failed"
          icon={<DownloadIcon />}
        >
          Export CSV
        </StatefulButton>
      ))}
    </div>
  )
}
