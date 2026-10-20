import { Button } from "@paneui/ui/components/button"
import { Input } from "@paneui/ui/components/input"

export default function InputWithButton() {
  return (
    <form className="flex w-full max-w-sm items-center gap-2">
      <Input type="email" placeholder="you@example.com" aria-label="Email" />
      <Button type="submit">Subscribe</Button>
    </form>
  )
}
