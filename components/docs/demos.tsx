import type * as React from "react"

import ApprovalCardDemo from "@/registry/base-nova/examples/approval-card-demo"
import BadgeDemo from "@/registry/base-nova/examples/badge-demo"
import ButtonDemo from "@/registry/base-nova/examples/button-demo"
import CardDemo from "@/registry/base-nova/examples/card-demo"
import ChatDemo from "@/registry/base-nova/examples/chat-demo"
import DialogDemo from "@/registry/base-nova/examples/dialog-demo"
import IconsDemo from "@/registry/base-nova/examples/icons-demo"
import InputDemo from "@/registry/base-nova/examples/input-demo"
import LabelDemo from "@/registry/base-nova/examples/label-demo"
import MenuDemo from "@/registry/base-nova/examples/menu-demo"
import TooltipDemo from "@/registry/base-nova/examples/tooltip-demo"
import SelectDemo from "@/registry/base-nova/examples/select-demo"
import ToastDemo from "@/registry/base-nova/examples/toast-demo"
import PromptBarDemo from "@/registry/base-nova/examples/prompt-bar-demo"
import RecommendationCardDemo from "@/registry/base-nova/examples/recommendation-card-demo"
import SwitchDemo from "@/registry/base-nova/examples/switch-demo"
import TabsDemo from "@/registry/base-nova/examples/tabs-demo"
import TaskRowDemo from "@/registry/base-nova/examples/task-row-demo"
import TextareaDemo from "@/registry/base-nova/examples/textarea-demo"
import ThemeDemo from "@/registry/base-nova/examples/theme-demo"

export const demos: Record<string, React.ComponentType> = {
  theme: ThemeDemo,
  icons: IconsDemo,
  button: ButtonDemo,
  badge: BadgeDemo,
  card: CardDemo,
  input: InputDemo,
  textarea: TextareaDemo,
  label: LabelDemo,
  switch: SwitchDemo,
  tabs: TabsDemo,
  dialog: DialogDemo,
  menu: MenuDemo,
  tooltip: TooltipDemo,
  select: SelectDemo,
  toast: ToastDemo,
  "prompt-bar": PromptBarDemo,
  chat: ChatDemo,
  "approval-card": ApprovalCardDemo,
  "task-row": TaskRowDemo,
  "recommendation-card": RecommendationCardDemo,
}
