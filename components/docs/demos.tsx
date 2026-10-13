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
import ButtonStatefulDemo from "@/registry/base-nova/examples/button-stateful-demo"
import MagneticDemo from "@/registry/base-nova/examples/magnetic-demo"
import ButtonMagneticDemo from "@/registry/base-nova/examples/button-magnetic-demo"
import ButtonMetallicDemo from "@/registry/base-nova/examples/button-metallic-demo"
import HoldActionButtonDemo from "@/registry/base-nova/examples/hold-action-button-demo"
import SlideActionButtonDemo from "@/registry/base-nova/examples/slide-action-button-demo"
import ExpandingArrowButtonDemo from "@/registry/base-nova/examples/expanding-arrow-button-demo"
import ExpandableControlDemo from "@/registry/base-nova/examples/expandable-control-demo"
import TextCascadeDemo from "@/registry/base-nova/examples/text-cascade-demo"
import ActionSwapBlurDemo from "@/registry/base-nova/examples/action-swap-blur-demo"
import ActionSwapRollDemo from "@/registry/base-nova/examples/action-swap-roll-demo"
import ActionSwapCascadeDemo from "@/registry/base-nova/examples/action-swap-cascade-demo"
import DigitSwapDemo from "@/registry/base-nova/examples/digit-swap-demo"
import ChromaticTextRevealDemo from "@/registry/base-nova/examples/chromatic-text-reveal-demo"
import AnimatedBadgeDemo from "@/registry/base-nova/examples/animated-badge-demo"
import SelectMorphDemo from "@/registry/base-nova/examples/select-morph-demo"
import PopoverMorphDemo from "@/registry/base-nova/examples/popover-morph-demo"
import MorphingModalDemo from "@/registry/base-nova/examples/morphing-modal-demo"
import CenterMorphModalDemo from "@/registry/base-nova/examples/center-morph-modal-demo"
import SharedLayoutBgDemo from "@/registry/base-nova/examples/shared-layout-bg-demo"
import AspectRatioDemo from "@/registry/base-nova/examples/aspect-ratio-demo"
import TiltCardDemo from "@/registry/base-nova/examples/tilt-card-demo"
import WheelPickerDemo from "@/registry/base-nova/examples/wheel-picker-demo"
import ArcPickerDemo from "@/registry/base-nova/examples/arc-picker-demo"
import ColorPickerDemo from "@/registry/base-nova/examples/color-picker-demo"
import DateRangePickerDemo from "@/registry/base-nova/examples/date-range-picker-demo"
import SortableStackDemo from "@/registry/base-nova/examples/sortable-stack-demo"
import RangeSliderInlineDemo from "@/registry/base-nova/examples/range-slider-inline-demo"
import RangeSliderFluidDemo from "@/registry/base-nova/examples/range-slider-fluid-demo"
import RangeSliderWaveDemo from "@/registry/base-nova/examples/range-slider-wave-demo"
import RangeSliderBubbleDemo from "@/registry/base-nova/examples/range-slider-bubble-demo"
import RangeSliderRulerDemo from "@/registry/base-nova/examples/range-slider-ruler-demo"
import PullToRefreshDemo from "@/registry/base-nova/examples/pull-to-refresh-demo"
import SmoothScrollDemo from "@/registry/base-nova/examples/smooth-scroll-demo"
import ScrollProgressDemo from "@/registry/base-nova/examples/scroll-progress-demo"
import ParallaxDemo from "@/registry/base-nova/examples/parallax-demo"
import ScrollToDemo from "@/registry/base-nova/examples/scroll-to-demo"
import ScrollRevealDemo from "@/registry/base-nova/examples/scroll-reveal-demo"
import CylinderCarouselDemo from "@/registry/base-nova/examples/cylinder-carousel-demo"
import MorphingLightboxDemo from "@/registry/base-nova/examples/morphing-lightbox-demo"
import ShaderBackgroundDemo from "@/registry/base-nova/examples/shader-background-demo"

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
  "button-stateful": ButtonStatefulDemo,
  "magnetic": MagneticDemo,
  "button-magnetic": ButtonMagneticDemo,
  "button-metallic": ButtonMetallicDemo,
  "hold-action-button": HoldActionButtonDemo,
  "slide-action-button": SlideActionButtonDemo,
  "expanding-arrow-button": ExpandingArrowButtonDemo,
  "expandable-control": ExpandableControlDemo,
  "text-cascade": TextCascadeDemo,
  "action-swap-blur": ActionSwapBlurDemo,
  "action-swap-roll": ActionSwapRollDemo,
  "action-swap-cascade": ActionSwapCascadeDemo,
  "digit-swap": DigitSwapDemo,
  "chromatic-text-reveal": ChromaticTextRevealDemo,
  "animated-badge": AnimatedBadgeDemo,
  "select-morph": SelectMorphDemo,
  "popover-morph": PopoverMorphDemo,
  "morphing-modal": MorphingModalDemo,
  "center-morph-modal": CenterMorphModalDemo,
  "shared-layout-bg": SharedLayoutBgDemo,
  "aspect-ratio": AspectRatioDemo,
  "tilt-card": TiltCardDemo,
  "wheel-picker": WheelPickerDemo,
  "arc-picker": ArcPickerDemo,
  "color-picker": ColorPickerDemo,
  "date-range-picker": DateRangePickerDemo,
  "sortable-stack": SortableStackDemo,
  "range-slider-inline": RangeSliderInlineDemo,
  "range-slider-fluid": RangeSliderFluidDemo,
  "range-slider-wave": RangeSliderWaveDemo,
  "range-slider-bubble": RangeSliderBubbleDemo,
  "range-slider-ruler": RangeSliderRulerDemo,
  "pull-to-refresh": PullToRefreshDemo,
  "smooth-scroll": SmoothScrollDemo,
  "scroll-progress": ScrollProgressDemo,
  "parallax": ParallaxDemo,
  "scroll-to": ScrollToDemo,
  "scroll-reveal": ScrollRevealDemo,
  "cylinder-carousel": CylinderCarouselDemo,
  "morphing-lightbox": MorphingLightboxDemo,
  "shader-background": ShaderBackgroundDemo,
}
