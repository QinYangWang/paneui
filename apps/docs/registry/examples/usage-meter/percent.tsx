import { UsageMeter } from "@paneui/ui/components/usage-meter"

export default function UsageMeterPercent() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <UsageMeter label="API quota" value={6200} max={10000} readout="percent" />
      <UsageMeter label="Build minutes" value={410} max={500} readout="percent" warnAt={0.6} dangerAt={0.95} />
    </div>
  )
}
