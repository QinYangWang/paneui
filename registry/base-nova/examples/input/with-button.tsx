import { Button } from "@/registry/base-nova/ui/button"
import { Input } from "@/registry/base-nova/ui/input"

export default function InputWithButton() {
  return (
    <form className="flex w-full max-w-sm items-center gap-2">
      <Input type="email" placeholder="you@example.com" aria-label="Email" />
      <Button type="submit">Subscribe</Button>
    </form>
  )
}
