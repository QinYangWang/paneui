import { DirectionProvider } from "@base-ui/react/direction-provider"
import { Progress, ProgressLabel, ProgressValue } from "@/registry/base-nova/ui/progress"

export default function ProgressRtl() {
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl" className="w-full max-w-xs">
        <Progress value={64}>
          <ProgressLabel>رفع ٢٤ ملفًا</ProgressLabel>
          <ProgressValue />
        </Progress>
      </div>
    </DirectionProvider>
  )
}
