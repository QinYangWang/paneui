import type { Metadata } from "next"

import { CustomersPage } from "@/registry/base-nova/templates/saas/components/app/customers-page"

export const metadata: Metadata = { title: "Customers" }

export default function CustomersRoute() {
  return <CustomersPage />
}
