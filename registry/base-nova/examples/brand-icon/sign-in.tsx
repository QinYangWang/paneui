import { siApple, siGithub, siGoogle } from "simple-icons"

import { BrandIcon } from "@/registry/base-nova/ui/brand-icon"
import { Button } from "@/registry/base-nova/ui/button"

export default function BrandIconSignIn() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Button variant="outline">
        <BrandIcon icon={siGithub} data-icon="inline-start" />
        Continue with GitHub
      </Button>
      <Button variant="outline">
        <BrandIcon icon={siGoogle} color="brand" data-icon="inline-start" />
        Continue with Google
      </Button>
      <Button variant="outline">
        <BrandIcon icon={siApple} data-icon="inline-start" />
        Continue with Apple
      </Button>
    </div>
  )
}
