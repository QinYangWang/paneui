const surfaces = ["raised", "pressed", "primary", "well", "surface", "chip"] as const

export default function ThemeDemo() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {surfaces.map((s) => (
        <div key={s} className="flex flex-col items-center gap-2">
          <div
            className={
              s === "primary"
                ? "size-16 rounded-2xl bg-primary shadow-primary"
                : "size-16 rounded-2xl bg-card"
            }
            style={s === "primary" ? undefined : { boxShadow: `var(--skeuo-${s})` }}
          />
          <code className="text-xs text-muted-foreground">shadow-{s}</code>
        </div>
      ))}
    </div>
  )
}
