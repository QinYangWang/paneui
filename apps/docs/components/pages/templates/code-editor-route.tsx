"use client"

import CodeEditorPage from "@/registry/templates/vscode/page"
import { SiteRoot, type SiteProps } from "@/components/site/site-root"

export default function CodeEditorTemplateRoute({ site }: { site: SiteProps }) {
  return (
    <SiteRoot {...site}>
      <CodeEditorPage />
    </SiteRoot>
  )
}
