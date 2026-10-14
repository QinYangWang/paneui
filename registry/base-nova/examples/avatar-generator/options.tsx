import { GeneratedAvatar } from "@/registry/base-nova/ui/generated-avatar"

const variants = [
  { label: "Default", props: {} },
  { label: "Accessories", props: { accessories: true } },
  { label: "Whole figure", props: { framing: "body" as const } },
  { label: "No blush", props: { blush: false } },
  { label: "Transparent", props: { background: "transparent" } },
  { label: "Picked parts", props: { selections: { head: "bun", glasses: "none" } } },
]

export default function AvatarGeneratorOptions() {
  return (
    <div className="grid grid-cols-3 gap-x-6 gap-y-5">
      {variants.map((variant) => (
        <figure key={variant.label} className="flex flex-col items-center gap-2">
          <GeneratedAvatar seed="hana" gender="female" size={64} shape="rounded" {...variant.props} />
          <figcaption className="text-xs text-muted-foreground">{variant.label}</figcaption>
        </figure>
      ))}
    </div>
  )
}
