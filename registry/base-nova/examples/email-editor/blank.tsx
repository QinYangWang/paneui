"use client"

import { EmailEditor } from "@/registry/base-nova/blocks/email-editor/email-editor"
import { defaultEmailVariables } from "@/registry/base-nova/blocks/email-editor/templates"

export default function EmailEditorBlank() {
  return <EmailEditor variables={defaultEmailVariables} className="h-140 w-full max-w-3xl" />
}
