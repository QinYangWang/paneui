import { DownloadIcon, PlusIcon } from "@paneui/ui/icons"
import { Button } from "@paneui/ui/components/button"
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderEyebrow,
  PageHeaderTitle,
} from "@paneui/ui/components/page-header"

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
