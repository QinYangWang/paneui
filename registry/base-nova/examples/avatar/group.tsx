import { AvatarGroup, AvatarGroupCount } from "@/registry/base-nova/ui/avatar"
import { GeneratedAvatar } from "@/registry/base-nova/ui/generated-avatar"

const team = [
  { seed: "aiko", gender: "female" },
  { seed: "ben", gender: "male" },
  { seed: "chloe", gender: "female" },
  { seed: "dev", gender: "male" },
  { seed: "emi", gender: "female" },
] as const

export default function AvatarGroupExample() {
  return (
    <div className="flex flex-col items-center gap-5">
      <AvatarGroup>
        {team.map(({ seed, gender }) => (
          <GeneratedAvatar key={seed} seed={seed} gender={gender} title={seed} />
        ))}
        <AvatarGroupCount>+8</AvatarGroupCount>
      </AvatarGroup>
      <AvatarGroup size="lg" shape="rounded">
        {team.slice(0, 4).map(({ seed, gender }) => (
          <GeneratedAvatar key={seed} seed={seed} gender={gender} title={seed} />
        ))}
        <AvatarGroupCount>+3</AvatarGroupCount>
      </AvatarGroup>
      <AvatarGroup size="sm">
        {team.map(({ seed, gender }) => (
          <GeneratedAvatar key={seed} seed={seed} gender={gender} title={seed} />
        ))}
      </AvatarGroup>
    </div>
  )
}
