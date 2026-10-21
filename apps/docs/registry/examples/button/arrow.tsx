import { Button, ButtonArrow } from "@paneui/ui/components/button"

export default function ButtonWithArrow() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button shape="pill" size="lg" variant="secondary" nativeButton={false} render={<a href="#api-reference" />}>
        API reference
        <ButtonArrow />
      </Button>
      <Button shape="pill" size="lg" variant="outline" nativeButton={false} render={<a href="https://example.com" target="_blank" rel="noreferrer" />}>
        Changelog
        <ButtonArrow external />
      </Button>
    </div>
  )
}
