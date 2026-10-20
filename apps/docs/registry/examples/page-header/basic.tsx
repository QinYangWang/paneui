import { Button } from "@paneui/ui/components/button"
import { PageHeader, PageHeaderActions, PageHeaderContent, PageHeaderDescription, PageHeaderTitle } from "@paneui/ui/components/page-header"

export default function PageHeaderBasic() {
  return (
    <PageHeader className="w-full max-w-2xl">
      <PageHeaderContent>
        <PageHeaderTitle>Customers</PageHeaderTitle>
        <PageHeaderDescription>Everyone with an active workspace.</PageHeaderDescription>
      </PageHeaderContent>
      <PageHeaderActions>
        <Button size="sm">Add customer</Button>
      </PageHeaderActions>
    </PageHeader>
  )
}
