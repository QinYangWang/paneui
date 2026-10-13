import { BookmarkIcon, CheckIcon, MailIcon, SendIcon } from "@/components/icons"
import { ActionSwapCascadeButton } from "@/registry/base-nova/ui/action-swap-cascade"

export default function ActionSwapCascadeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <ActionSwapCascadeButton
        items={[
          { value: "subscribe", label: "Subscribe", icon: <MailIcon /> },
          { value: "subscribed", label: "Subscribed", icon: <CheckIcon /> },
        ]}
      />
      <ActionSwapCascadeButton
        variant="secondary"
        items={[
          { value: "save", label: "Save draft", icon: <BookmarkIcon /> },
          { value: "saved", label: "Draft saved", icon: <CheckIcon /> },
        ]}
      />
      <ActionSwapCascadeButton
        variant="outline"
        items={[
          { value: "send", label: "Send invite", icon: <SendIcon /> },
          { value: "sent", label: "Invite sent", icon: <CheckIcon /> },
          { value: "resend", label: "Resend", icon: <SendIcon /> },
        ]}
      />
    </div>
  )
}
