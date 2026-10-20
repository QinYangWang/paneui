import { GeneratedAvatar } from "@paneui/ui/components/generated-avatar"

const variants = [
  { label: "Default", props: {} },
  { label: "Accessories", props: { accessories: true } },
  { label: "Glasses", props: { selections: { glasses: "variant05" } } },
  { label: "Gesture", props: { selections: { gesture: "waveLongArm" } } },
  { label: "Circle", props: { background: "circle" } },
  { label: "Picked parts", props: { selections: { hair: "variant46", eyes: "variant02", lips: "variant03", body: "variant12" } } },
  { label: "Background", props: { colors: { background: "#EAF2FB" } } },
  { label: "Hex background", props: { background: "#FDEFD8" } },
  { label: "Transparent", props: { background: "none" } },
  { label: "Male + beard", props: { gender: "male" as const, selections: { hair: "variant52", beard: "variant02" } } },
]

export default function AvatarGeneratorOptions() {
  return (
    <div className="@container w-full max-w-lg">
      <div className="grid grid-cols-3 gap-4 @md:grid-cols-5">
        {variants.map((variant) => (
          <figure key={variant.label} className="flex flex-col items-center gap-2">
            <GeneratedAvatar seed="hana" gender="female" size={64} shape="rounded" {...variant.props} />
            <figcaption className="text-center text-xs text-balance text-muted-foreground">{variant.label}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
