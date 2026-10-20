import { PreviewRail } from "@paneui/ui/components/preview-rail"

const years = ["2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"].map((y) => ({
  id: y,
  label: y,
  description: `Photos and notes from ${y}.`,
}))

export default function PreviewRailSideStart() {
  return (
    <div className="flex w-full max-w-md justify-end">
      <PreviewRail
        items={years}
        side="start"
        showActive={false}
        itemSize={16}
        tickLength={28}
        label="Years"
      />
    </div>
  )
}
