import { DownloadIcon, PlusIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderEyebrow,
  PageHeaderTitle,
} from "@/registry/base-nova/ui/page-header"

export default function PageHeaderDemo() {
  return (
    <PageHeader className="w-full max-w-3xl">
      <PageHeaderContent>
        <PageHeaderEyebrow>Workspace · Northwind</PageHeaderEyebrow>
        <PageHeaderTitle>Customers</PageHeaderTitle>
        <PageHeaderDescription>Every workspace owner, their plan and what they pay.</PageHeaderDescription>
      </PageHeaderContent>
      <PageHeaderActions>
        <Button variant="secondary" size="sm">
          <DownloadIcon data-icon="inline-start" />
          Export
        </Button>
        <Button size="sm">
          <PlusIcon data-icon="inline-start" />
          Add customer
        </Button>
      </PageHeaderActions>
    </PageHeader>
  )
}
