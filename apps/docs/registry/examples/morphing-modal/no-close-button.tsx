import { Button } from "@paneui/ui/components/button"
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
} from "@paneui/ui/components/morphing-modal"

export default function MorphingModalNoCloseButton() {
  return (
    <MorphingModal>
      <MorphingModalTrigger render={<Button variant="destructive" />}>Delete project</MorphingModalTrigger>
      <MorphingModalContent showCloseButton={false}>
        <MorphingModalView name="main">
          <MorphingModalHeader>
            <MorphingModalTitle>Delete “Launch site”?</MorphingModalTitle>
            <MorphingModalDescription>All 14 deployments and their logs are removed.</MorphingModalDescription>
          </MorphingModalHeader>
          <MorphingModalLink to="details">
            <span className="text-muted-foreground">What else gets deleted?</span>
          </MorphingModalLink>
          <MorphingModalFooter>
            <MorphingModalClose render={<Button variant="ghost" />}>Cancel</MorphingModalClose>
            <MorphingModalClose render={<Button variant="destructive" />}>Delete</MorphingModalClose>
          </MorphingModalFooter>
        </MorphingModalView>
        <MorphingModalView name="details">
          <MorphingModalHeader>
            <MorphingModalTitle>What gets deleted</MorphingModalTitle>
            <MorphingModalDescription>
              Deployments, build logs, environment variables and the project&apos;s domains. Your team and billing stay as they are.
            </MorphingModalDescription>
          </MorphingModalHeader>
          <MorphingModalFooter>
            <MorphingModalClose render={<Button variant="ghost" />}>Cancel</MorphingModalClose>
            <MorphingModalClose render={<Button variant="destructive" />}>Delete</MorphingModalClose>
          </MorphingModalFooter>
        </MorphingModalView>
      </MorphingModalContent>
    </MorphingModal>
  )
}
