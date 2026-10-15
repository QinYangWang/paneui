import { Kbd, KbdGroup } from "@/registry/base-nova/ui/kbd"

export default function KbdDemo() {
  return (
    <div className="flex flex-col items-center gap-4 text-ui text-muted-foreground">
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>⇧</Kbd>
        <Kbd>P</Kbd>
      </KbdGroup>
      <p>
        Press{" "}
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <span>+</span>
          <Kbd>K</Kbd>
        </KbdGroup>{" "}
        to search
      </p>
    </div>
  )
}
