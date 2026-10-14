"use client"

import * as React from "react"

import { GitBranchIcon } from "@/components/icons"
import { ComposerPicker } from "@/registry/base-nova/ui/model-picker"

export default function ModelPickerComposerPicker() {
  const [branch, setBranch] = React.useState("main")
  return (
    <ComposerPicker
      label="Branch"
      heading="Work on"
      icon={<GitBranchIcon />}
      side="bottom"
      value={branch}
      onValueChange={setBranch}
      options={[
        { value: "main", label: "main", description: "Default branch" },
        { value: "fix/drag", label: "fix/chat-dragging", description: "PR #1526" },
        { value: "new", label: "New worktree…", group: "Worktrees" },
      ]}
    />
  )
}
