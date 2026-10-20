import { DirectionProvider } from "@base-ui/react/direction-provider"
import { ArrowUpIcon, SearchIcon } from "@paneui/ui/icons"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@paneui/ui/components/input-group"
import { Kbd } from "@paneui/ui/components/kbd"

export default function InputGroupRtl() {
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl" className="flex w-full max-w-xs flex-col gap-3">
        <InputGroup>
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput placeholder="ابحث في المهام" aria-label="ابحث في المهام" />
          <InputGroupAddon align="inline-end">
            <Kbd>⌘K</Kbd>
          </InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupInput placeholder="اسأل أي شيء" aria-label="الرسالة" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton variant="default" size="icon-xs" aria-label="إرسال">
              <ArrowUpIcon />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </DirectionProvider>
  )
}
