# Bugs / gaps found while writing component docs (2026-10-14)
Not fixed yet. One line each.
- composition-chart: `hidden` prop collides with HTML `hidden` (type boolean & string[]) → Omit from section props. status-bar `title` same.
- tabs: indicator only moves on x; vertical orientation unsupported.
- popover-morph & color-picker: morph starts from a pill while trigger is rounded-lg.
- range-slider-wave/fluid: thumb has no accessible name without `label`.
- animated-sidebar (⌘B) and ai-sidebar (⌘K): every instance adds a window listener; ai-sidebar hint always shows ⌘.
- cylinder-carousel: controlled `index` ≠ defaultIndex starts ring at defaultIndex. cylinder-carousel/morphing-lightbox demos use picsum (break offline).
- morphing-modal: onViewChange inside setStack updater (double fire in StrictMode); reset() doesn't call it.
- tool-approval: Undo clears Always-allow; decision=null doesn't reopen args. tool-result shows "0ms" when no duration.
- price-target-fan: header hardcodes "12-month horizon". liquidity-heatmap rounds price to 2dp. bump-chart uses active/defaultActive vs activeId elsewhere.
- treemap/candlestick: white labels on light fills. funnel-chart single color goes near-black in dark. donut `description` never rendered.
- dialog: no max-height/overscroll for long content. pull-to-refresh: reopen glitch when onRefresh returns nothing + controlled refreshing.
- range-slider-ruler: max off step grid → last value can exceed max. tilt-card: perspective fixed at mount. chromatic-text-reveal: SR text only prefix + first word.
- Lint vs props: loader colour, expanding-arrow-button labelClassName, action-swap text slots, table rowClassName, center-morph-modal backdropClassName all flagged as restyle → allowlist component-owned className props in shadcn lint.
- Radius/size drift: combobox popup rounded-2xl/items rounded-xl; multi-select rounded-[1.125rem]; CardDescription/PopoverTitle/DialogDescription text-[0.95rem]; IconChip rounded-[10px]; Stepper text-[15px]; Dock rounded-[1.375rem].
- Hardcoded English: Stepper Decrease/Increase, image-generation error text. Label peer-disabled never applies to Base UI checkbox/radio/switch.
- Motion: number-ticker/animated-number springs far outside house range; order-book arrow moves under reduced motion.
- Duplicate shiki/copy logic in tool-result and agent-code-block.
