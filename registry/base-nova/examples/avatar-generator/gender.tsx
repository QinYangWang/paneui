import { GeneratedAvatar } from "@/registry/base-nova/ui/generated-avatar"

const seeds = ["alpha", "bravo", "charlie", "delta", "echo", "foxtrot"]

export default function AvatarGeneratorGender() {
  return (
    <div className="flex flex-col gap-4">
      {(["female", "male"] as const).map((gender) => (
        <div key={gender} className="flex items-center gap-4">
          <span className="w-14 text-sm text-muted-foreground capitalize">{gender}</span>
          <div className="flex gap-2">
            {seeds.map((seed) => (
              <GeneratedAvatar key={seed} seed={seed} gender={gender} size="xl" />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
