import { PlayIcon } from "@/components/icons"
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

export default function CenterMorphModalBackdrop() {
  return (
    <CenterMorphModal>
      <CenterMorphModalTrigger render={<Button variant="secondary" />}>
        <PlayIcon data-icon="inline-start" />
        Watch the tour
      </CenterMorphModalTrigger>
      <CenterMorphModalContent backdropClassName="bg-black/70">
        <CenterMorphModalHeader>
          <CenterMorphModalTitle>Product tour</CenterMorphModalTitle>
          <CenterMorphModalDescription>Two minutes on building, previewing and shipping a page.</CenterMorphModalDescription>
        </CenterMorphModalHeader>
        <div className="flex aspect-video items-center justify-center rounded-xl bg-muted text-muted-foreground">
          <PlayIcon size={32} />
        </div>
        <CenterMorphModalFooter>
          <CenterMorphModalClose render={<Button variant="ghost" />}>Close</CenterMorphModalClose>
        </CenterMorphModalFooter>
      </CenterMorphModalContent>
    </CenterMorphModal>
  )
}
