import { ShaderBackground } from "@paneui/ui/components/shader-background"

export default function ShaderBackgroundCustomColors() {
  return (
    <ShaderBackground
      colors={["var(--success)", "color-mix(in oklch, var(--success), var(--background) 60%)", "var(--background)", "var(--warning)"]}
      className="flex h-56 w-full max-w-lg items-end rounded-3xl p-6 shadow-surface"
    >
      <div className="rounded-2xl bg-card/80 p-4 shadow-raised backdrop-blur-md">
        <p className="text-sm font-semibold">All systems normal</p>
        <p className="mt-1 text-sm text-muted-foreground">Every check passed in the last 24 hours.</p>
      </div>
    </ShaderBackground>
  )
}
