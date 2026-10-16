import { ApertureIcon } from "@/components/icons"
import { BrandIcon, type BrandIconData } from "@/registry/base-nova/ui/brand-icon"
import { IconChip } from "@/registry/base-nova/ui/icon-chip"

/** Your own 24×24 mark, for a brand the package does not carry. */
const acme: BrandIconData = {
  title: "Acme",
  hex: "6E56CF",
  path: "M12 2 22 20H2L12 2Zm0 5.2L6.4 17h11.2L12 7.2Z",
}

export default function BrandIconOwnMarks() {
  return (
    <div className="flex items-center gap-3">
      <IconChip>
        <BrandIcon icon={acme} color="brand" />
      </IconChip>
      <IconChip>
        <ApertureIcon />
      </IconChip>
    </div>
  )
}
