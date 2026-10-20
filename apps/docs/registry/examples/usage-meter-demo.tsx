import { UsageMeter } from "@paneui/ui/components/usage-meter"

export default function UsageMeterDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <UsageMeter label="Sandbox storage" value={38} max={100} unit="GB" description="Snapshots kept for 30 days" />
      <UsageMeter label="Agent runs" value={8420} max={10000} unit="runs" description="Resets on Nov 1" />
      <UsageMeter label="Seats" value={24} max={25} unit="seats" description="1 seat left on this plan" />
    </div>
  )
}
