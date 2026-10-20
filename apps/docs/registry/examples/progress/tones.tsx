import { Progress, ProgressLabel, ProgressValue } from "@paneui/ui/components/progress"

export default function ProgressTones() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-5">
      <Progress value={100} tone="success" size="sm">
        <ProgressLabel>Backup</ProgressLabel>
        <ProgressValue />
      </Progress>
      <Progress value={82} tone="warning">
        <ProgressLabel>Storage</ProgressLabel>
        <ProgressValue />
      </Progress>
      <Progress value={97} tone="destructive" size="lg">
        <ProgressLabel>API quota</ProgressLabel>
        <ProgressValue />
      </Progress>
    </div>
  )
}
