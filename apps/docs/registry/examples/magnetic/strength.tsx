import { Magnetic } from "@paneui/ui/components/magnetic"

const STRENGTHS = [0.15, 0.3, 0.6]

export default function MagneticStrength() {
  return (
    <div className="flex items-end gap-8">
      {STRENGTHS.map((strength) => (
        <div key={strength} className="flex flex-col items-center gap-3">
          <Magnetic strength={strength}>
            <div className="grid size-14 place-items-center rounded-2xl bg-card text-sm font-medium shadow-raised tabular-nums">
              {strength}
            </div>
          </Magnetic>
          <span className="text-xs text-muted-foreground">strength</span>
        </div>
      ))}
    </div>
  )
}
