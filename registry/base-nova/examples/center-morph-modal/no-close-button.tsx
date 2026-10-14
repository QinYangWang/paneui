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

export default function CenterMorphModalNoCloseButton() {
  return (
    <CenterMorphModal>
      <CenterMorphModalTrigger render={<Button variant="destructive" />}>Revoke API key</CenterMorphModalTrigger>
      <CenterMorphModalContent showCloseButton={false}>
        <CenterMorphModalHeader>
          <CenterMorphModalTitle>Revoke “Production” key?</CenterMorphModalTitle>
          <CenterMorphModalDescription>Requests using it start failing right away. This can&apos;t be undone.</CenterMorphModalDescription>
        </CenterMorphModalHeader>
        <CenterMorphModalFooter>
          <CenterMorphModalClose render={<Button variant="ghost" />}>Keep key</CenterMorphModalClose>
          <CenterMorphModalClose render={<Button variant="destructive" />}>Revoke</CenterMorphModalClose>
        </CenterMorphModalFooter>
      </CenterMorphModalContent>
    </CenterMorphModal>
  )
}
