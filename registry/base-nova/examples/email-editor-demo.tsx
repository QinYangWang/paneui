"use client"

import { EmailEditor } from "@/registry/base-nova/blocks/email-editor/email-editor"
import { defaultEmailVariables, sampleEmailValues, welcomeEmail } from "@/registry/base-nova/blocks/email-editor/templates"

export default function EmailEditorDemo() {
  return (
    <EmailEditor
      defaultValue={welcomeEmail}
      variables={defaultEmailVariables}
      previewValues={sampleEmailValues}
      fileName="welcome"
      className="h-180 w-full max-w-4xl"
    />
  )
}
