import { Avatar, AvatarFallback, AvatarStatus } from "@paneui/ui/components/avatar"
import { GeneratedAvatar } from "@paneui/ui/components/generated-avatar"

const people = [
  { seed: "noa", status: "online", label: "Online" },
  { seed: "ren", status: "away", label: "Away" },
  { seed: "ivy", status: "busy", label: "Do not disturb" },
] as const

export default function AvatarStatusExample() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-4">
        {people.map((person) => (
          <GeneratedAvatar key={person.seed} seed={person.seed} size="lg">
            <AvatarStatus status={person.status} label={person.label} />
          </GeneratedAvatar>
        ))}
        <Avatar size="lg" shape="rounded">
          <AvatarFallback>JD</AvatarFallback>
          <AvatarStatus status="offline" label="Offline" />
        </Avatar>
      </div>
    </div>
  )
}
