import { Button } from "@/registry/base-nova/ui/button"
import { Input } from "@/registry/base-nova/ui/input"
import { Label } from "@/registry/base-nova/ui/label"
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

export default function CenterMorphModalForm() {
  return (
    <CenterMorphModal>
      <CenterMorphModalTrigger render={<Button variant="secondary" />}>Rename project</CenterMorphModalTrigger>
      <CenterMorphModalContent>
        <CenterMorphModalHeader>
          <CenterMorphModalTitle>Rename project</CenterMorphModalTitle>
          <CenterMorphModalDescription>The URL updates too; old links redirect for 30 days.</CenterMorphModalDescription>
        </CenterMorphModalHeader>
        <div className="flex flex-col gap-2">
          <Label htmlFor="project-name">Project name</Label>
          <Input id="project-name" defaultValue="Launch site" />
        </div>
        <CenterMorphModalFooter>
          <CenterMorphModalClose render={<Button variant="ghost" />}>Cancel</CenterMorphModalClose>
          <CenterMorphModalClose render={<Button />}>Save</CenterMorphModalClose>
        </CenterMorphModalFooter>
      </CenterMorphModalContent>
    </CenterMorphModal>
  )
}
