import { Textarea } from "@/registry/base-nova/ui/textarea"

export default function TextareaSizes() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Textarea size="sm" placeholder="Small" aria-label="Small" />
      <Textarea placeholder="Default" aria-label="Default" />
      <Textarea size="lg" placeholder="Large" aria-label="Large" />
    </div>
  )
}
