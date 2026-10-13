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
import CheckboxDemo from "@/registry/base-nova/examples/checkbox-demo"
import RadioDemo from "@/registry/base-nova/examples/radio-demo"
import StepperDemo from "@/registry/base-nova/examples/stepper-demo"
import SliderDemo from "@/registry/base-nova/examples/slider-demo"
import OtpInputDemo from "@/registry/base-nova/examples/otp-input-demo"
import PopoverDemo from "@/registry/base-nova/examples/popover-demo"
import ContextMenuDemo from "@/registry/base-nova/examples/context-menu-demo"
import DrawerDemo from "@/registry/base-nova/examples/drawer-demo"
import BottomSheetDemo from "@/registry/base-nova/examples/bottom-sheet-demo"
import CommandPaletteDemo from "@/registry/base-nova/examples/command-palette-demo"
import AlertDemo from "@/registry/base-nova/examples/alert-demo"
import CollapsibleDemo from "@/registry/base-nova/examples/collapsible-demo"
import AccordionDemo from "@/registry/base-nova/examples/accordion-demo"
import BreadcrumbDemo from "@/registry/base-nova/examples/breadcrumb-demo"
import DockDemo from "@/registry/base-nova/examples/dock-demo"
import TextRevealDemo from "@/registry/base-nova/examples/text-reveal-demo"
import TextShimmerDemo from "@/registry/base-nova/examples/text-shimmer-demo"
import TextScrambleDemo from "@/registry/base-nova/examples/text-scramble-demo"
import NumberTickerDemo from "@/registry/base-nova/examples/number-ticker-demo"
import AnimatedNumberDemo from "@/registry/base-nova/examples/animated-number-demo"
import MarqueeDemo from "@/registry/base-nova/examples/marquee-demo"
import ComboboxDemo from "@/registry/base-nova/examples/combobox-demo"
import MultiSelectDemo from "@/registry/base-nova/examples/multi-select-demo"
import ColorSelectorDemo from "@/registry/base-nova/examples/color-selector-demo"
import LoaderDemo from "@/registry/base-nova/examples/loader-demo"

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
  "checkbox": CheckboxDemo,
  "radio": RadioDemo,
  "stepper": StepperDemo,
  "slider": SliderDemo,
  "otp-input": OtpInputDemo,
  "popover": PopoverDemo,
  "context-menu": ContextMenuDemo,
  "drawer": DrawerDemo,
  "bottom-sheet": BottomSheetDemo,
  "command-palette": CommandPaletteDemo,
  "alert": AlertDemo,
  "collapsible": CollapsibleDemo,
  "accordion": AccordionDemo,
  "breadcrumb": BreadcrumbDemo,
  "dock": DockDemo,
  "text-reveal": TextRevealDemo,
  "text-shimmer": TextShimmerDemo,
  "text-scramble": TextScrambleDemo,
  "number-ticker": NumberTickerDemo,
  "animated-number": AnimatedNumberDemo,
  "marquee": MarqueeDemo,
  "combobox": ComboboxDemo,
  "multi-select": MultiSelectDemo,
  "color-selector": ColorSelectorDemo,
  "loader": LoaderDemo,
}
