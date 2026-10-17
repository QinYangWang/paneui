import { ChevronRightIcon, LinkIcon, MailIcon, UsersIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import { Input } from "@/registry/base-nova/ui/input"
import {
  MorphingModal,
  MorphingModalClose,
  MorphingModalContent,
  MorphingModalDescription,
  MorphingModalFooter,
  MorphingModalHeader,
  MorphingModalLink,
  MorphingModalTitle,
  MorphingModalTrigger,
  MorphingModalView,
} from "@/registry/base-nova/ui/morphing-modal"

export default function MorphingModalDemo() {
  return (
    <MorphingModal>
      <MorphingModalTrigger render={<Button variant="secondary" />}>Share project</MorphingModalTrigger>
      <MorphingModalContent>
        <MorphingModalView name="main">
          <MorphingModalHeader>
            <MorphingModalTitle>Share “Launch site”</MorphingModalTitle>
            <MorphingModalDescription>Pick how you want to bring people in.</MorphingModalDescription>
          </MorphingModalHeader>
          <div className="-mx-2 flex flex-col">
            <MorphingModalLink to="invite">
              <UsersIcon className="text-muted-foreground" />
              <span className="flex-1">Invite teammates</span>
              <ChevronRightIcon className="text-muted-foreground rtl:-scale-x-100" />
            </MorphingModalLink>
            <MorphingModalLink to="link">
              <LinkIcon className="text-muted-foreground" />
              <span className="flex-1">Get a share link</span>
              <ChevronRightIcon className="text-muted-foreground rtl:-scale-x-100" />
            </MorphingModalLink>
          </div>
        </MorphingModalView>

        <MorphingModalView name="invite">
          <MorphingModalHeader>
            <MorphingModalTitle>Invite teammates</MorphingModalTitle>
          </MorphingModalHeader>
          <MorphingModalDescription>They’ll get an email with edit access to this project.</MorphingModalDescription>
          <Input type="email" placeholder="name@company.com" aria-label="Email address" />
          <MorphingModalFooter>
            <MorphingModalClose render={<Button />}>
              <MailIcon />
              Send invite
            </MorphingModalClose>
          </MorphingModalFooter>
        </MorphingModalView>

        <MorphingModalView name="link">
          <MorphingModalHeader>
            <MorphingModalTitle>Share link</MorphingModalTitle>
          </MorphingModalHeader>
          <Input readOnly value="https://ui.qinyang.wang/p/launch" aria-label="Share link" />
          <p className="text-sm text-muted-foreground">Anyone with the link can view. Only teammates can edit.</p>
        </MorphingModalView>
      </MorphingModalContent>
    </MorphingModal>
  )
}
