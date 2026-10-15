import { GeneratedAvatar } from "@/registry/base-nova/ui/generated-avatar"

const seeds = ["alpha", "bravo", "charlie", "delta", "echo"]

export default function AvatarGeneratorGender() {
  return (
    <div className="@container flex w-full max-w-md flex-col gap-4">
      {(["female", "male"] as const).map((gender) => (
        <div key={gender} className="flex flex-col gap-2 @sm:flex-row @sm:items-center @sm:gap-4">
          <span className="text-sm text-muted-foreground capitalize @sm:w-14 @sm:shrink-0">{gender}</span>
          <div className="flex flex-wrap gap-2">
            {seeds.map((seed) => (
              <GeneratedAvatar key={seed} seed={seed} gender={gender} size="xl" />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
