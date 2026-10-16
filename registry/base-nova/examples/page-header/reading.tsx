import { CopyIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderEyebrow,
  PageHeaderTitle,
} from "@/registry/base-nova/ui/page-header"

export default function PageHeaderReading() {
  return (
    <PageHeader size="lg" className="w-full max-w-2xl">
      <PageHeaderEyebrow>Getting started</PageHeaderEyebrow>
      <PageHeaderContent>
        <PageHeaderTitle>Installation</PageHeaderTitle>
      </PageHeaderContent>
      <PageHeaderActions>
        <Button variant="secondary" size="sm">
          <CopyIcon data-icon="inline-start" />
          Copy page
        </Button>
      </PageHeaderActions>
      <PageHeaderDescription>Add the registry to your project, then install the theme and a first component.</PageHeaderDescription>
    </PageHeader>
  )
}
