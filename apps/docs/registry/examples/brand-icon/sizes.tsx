import { siLinear } from "simple-icons"

import { BrandIcon } from "@paneui/ui/components/brand-icon"
import { IconChip } from "@paneui/ui/components/icon-chip"

export default function BrandIconSizes() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      <div className="flex items-end gap-4">
        {[14, 16, 18, 24].map((size) => (
          <BrandIcon key={size} icon={siLinear} size={size} color="brand" />
        ))}
      </div>
      <div className="flex items-center gap-3">
        {(["sm", "default", "lg", "xl"] as const).map((size) => (
          <IconChip key={size} size={size}>
            <BrandIcon icon={siLinear} color="brand" />
          </IconChip>
        ))}
      </div>
    </div>
  )
}
