"use client"

import {
  ActionSwapButton,
  ActionSwapIcon,
  ActionSwapText,
  type ActionSwapButtonProps,
  type ActionSwapIconProps,
  type ActionSwapItem,
  type ActionSwapTextProps,
} from "@/registry/base-nova/ui/action-swap-blur"

/* Cascade preset: the label rolls letter by letter, left to right; icons roll as one piece. */

type ActionSwapCascadeButtonProps = Omit<ActionSwapButtonProps, "animation">
type ActionSwapCascadeTextProps = Omit<ActionSwapTextProps, "animation">
type ActionSwapCascadeIconProps = Omit<ActionSwapIconProps, "animation">

function ActionSwapCascadeButton(props: ActionSwapCascadeButtonProps) {
  return <ActionSwapButton {...props} animation="cascade" />
}

function ActionSwapCascadeText(props: ActionSwapCascadeTextProps) {
  return <ActionSwapText {...props} animation="cascade" />
}

function ActionSwapCascadeIcon(props: ActionSwapCascadeIconProps) {
  return <ActionSwapIcon {...props} animation="cascade" />
}

export {
  ActionSwapCascadeButton,
  ActionSwapCascadeText,
  ActionSwapCascadeIcon,
  type ActionSwapItem,
  type ActionSwapCascadeButtonProps,
  type ActionSwapCascadeTextProps,
  type ActionSwapCascadeIconProps,
}
