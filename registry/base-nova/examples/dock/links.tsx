import { GithubIcon, GlobeIcon, MailIcon } from "@/components/icons"
import { Dock, DockGroup, DockItem, DockSeparator } from "@/registry/base-nova/ui/dock"

export default function DockLinks() {
  return (
    <div className="flex h-32 items-end justify-center">
      <Dock aria-label="Links">
        <DockGroup>
          <DockItem label="Website" render={<a href="#website" />}>
            <GlobeIcon />
          </DockItem>
          <DockItem label="GitHub" render={<a href="#github" />}>
            <GithubIcon />
          </DockItem>
        </DockGroup>
        <DockSeparator />
        <DockItem label="Email" render={<a href="#contact" />}>
          <MailIcon />
        </DockItem>
      </Dock>
    </div>
  )
}
