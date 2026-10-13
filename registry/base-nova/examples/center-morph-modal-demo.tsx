import { Button } from "@/registry/base-nova/ui/button"
import {
  CenterMorphModal,
  CenterMorphModalClose,
  CenterMorphModalContent,
  CenterMorphModalDescription,
  CenterMorphModalFooter,
  CenterMorphModalHeader,
  CenterMorphModalTitle,
  CenterMorphModalTrigger,
} from "@/registry/base-nova/ui/center-morph-modal"

export default function CenterMorphModalDemo() {
  return (
    <CenterMorphModal>
      <CenterMorphModalTrigger render={<Button />}>Publish changes</CenterMorphModalTrigger>
      <CenterMorphModalContent>
        <CenterMorphModalHeader>
          <CenterMorphModalTitle>Publish to production?</CenterMorphModalTitle>
          <CenterMorphModalDescription>
            12 changed components go live on ui.qinyang.wang. You can roll back from the deploy history at any time.
          </CenterMorphModalDescription>
        </CenterMorphModalHeader>
        <CenterMorphModalFooter>
          <CenterMorphModalClose render={<Button variant="ghost" />}>Not yet</CenterMorphModalClose>
          <CenterMorphModalClose render={<Button />}>Publish</CenterMorphModalClose>
        </CenterMorphModalFooter>
      </CenterMorphModalContent>
    </CenterMorphModal>
  )
}
