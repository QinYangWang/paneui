import { siDiscord, siFigma, siGithub, siStripe, siVercel } from "simple-icons"

import { BrandIcon } from "@/registry/base-nova/ui/brand-icon"

const BRANDS = [siGithub, siVercel, siFigma, siStripe, siDiscord]

export default function BrandIconColors() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-4 text-muted-foreground">
        {BRANDS.map((b) => (
          <BrandIcon key={b.slug} icon={b} size={24} title={b.title} />
        ))}
      </div>
      <div className="flex items-center gap-4">
        {BRANDS.map((b) => (
          <BrandIcon key={b.slug} icon={b} size={24} color="brand" title={b.title} />
        ))}
      </div>
    </div>
  )
}
