"use client"

import SaasAuthLayout from "@/registry/templates/saas/app/(auth)/layout"
import SaasLogin from "@/registry/templates/saas/app/(auth)/login/page"
import SaasSignup from "@/registry/templates/saas/app/(auth)/signup/page"
import SaasForgotPassword from "@/registry/templates/saas/app/(auth)/forgot-password/page"
import SaasVerify from "@/registry/templates/saas/app/(auth)/verify/page"
import { SaasPreview } from "@/components/pages/templates/saas-route"
import type { SiteProps } from "@/components/site/site-root"

/* Each auth page sits inside the template's (auth) layout, which renders the split shell. */

export function SaasLoginRoute({ site }: { site: SiteProps }) {
  return (
    <SaasPreview site={site}>
      <SaasAuthLayout>
        <SaasLogin />
      </SaasAuthLayout>
    </SaasPreview>
  )
}

export function SaasSignupRoute({ site }: { site: SiteProps }) {
  return (
    <SaasPreview site={site}>
      <SaasAuthLayout>
        <SaasSignup />
      </SaasAuthLayout>
    </SaasPreview>
  )
}

export function SaasForgotPasswordRoute({ site }: { site: SiteProps }) {
  return (
    <SaasPreview site={site}>
      <SaasAuthLayout>
        <SaasForgotPassword />
      </SaasAuthLayout>
    </SaasPreview>
  )
}

export function SaasVerifyRoute({ site }: { site: SiteProps }) {
  return (
    <SaasPreview site={site}>
      <SaasAuthLayout>
        <SaasVerify />
      </SaasAuthLayout>
    </SaasPreview>
  )
}
