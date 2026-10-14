import { GeneratedAvatar } from "@/registry/base-nova/ui/generated-avatar"

const variants = [
  { label: "Sketch (default)", props: {} },
  { label: "Smooth", props: { variant: "smooth" as const } },
  { label: "Accessories", props: { accessories: true } },
  { label: "Glasses", props: { selections: { eyes: "glasses" } } },
  { label: "Skin tone", props: { selections: { skin: "tan" } } },
  { label: "No blush", props: { blush: false } },
  { label: "Circle", props: { background: "circle" } },
  { label: "Picked parts", props: { selections: { hair: "bun", eyes: "happy", mouth: "open", top: "collar" } } },
  { label: "Colours", props: { colors: { hair: "#5B3A29", background: "#EAF2FB" } } },
  { label: "Transparent", props: { background: "none" } },
]

export default function AvatarGeneratorOptions() {
  return (
    <div className="grid grid-cols-5 gap-x-5 gap-y-5">
      {variants.map((variant) => (
        <figure key={variant.label} className="flex flex-col items-center gap-2">
          <GeneratedAvatar seed="hana" gender="female" size={64} shape="rounded" {...variant.props} />
          <figcaption className="text-xs text-muted-foreground">{variant.label}</figcaption>
        </figure>
      ))}
    </div>
  )
}
