"use client"

import AgentPage from "@/registry/templates/agent-workspace/page"
import { SiteRoot, type SiteProps } from "@/components/site/site-root"

export default function AgentWorkspaceTemplateRoute({ site }: { site: SiteProps }) {
  return (
    <SiteRoot {...site}>
      <AgentPage />
    </SiteRoot>
  )
}
