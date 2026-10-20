import { SaasBase } from "@/registry/templates/saas/lib/routes"

/** Mounts the SaaS template under /templates/saas for the docs preview (an installed app has no base). */
export default function SaasPreviewLayout({ children }: { children: React.ReactNode }) {
  return <SaasBase base="/templates/saas">{children}</SaasBase>
}
