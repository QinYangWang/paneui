import { Code, GuideH2, GuidePage, TextLink } from "@/components/docs/guide-page"
import { InstallCommand } from "@/components/docs/install-command"
import { REGISTRY_NAME, REGISTRY_URL, SITE_URL } from "@/lib/docs"
import { AgentCodeBlock } from "@/registry/base-nova/ui/agent-code-block"

export const metadata = { title: "CLI & registry" }

export default function CliPage() {
  const ns = `@${REGISTRY_NAME}`
  const config = JSON.stringify({ registries: { [ns]: REGISTRY_URL } }, null, 2)
  const itemUrl = REGISTRY_URL.replace("{name}", "button")
  const itemJson = `{
  "name": "button",
  "type": "registry:ui",
  "title": "Button",
  "description": "Native desktop button (32px, 13px label) …",
  "dependencies": ["@base-ui/react", "class-variance-authority"],
  "registryDependencies": ["${ns}/theme"],
  "files": [{ "path": "registry/base-nova/ui/button.tsx", "type": "registry:ui", "content": "…" }]
}`
  const toc = [
    { id: "the-registry", title: "The registry" },
    { id: "add", title: "add" },
    { id: "view", title: "view" },
    { id: "search", title: "search" },
    { id: "by-url", title: "Install by URL" },
    { id: "updating", title: "Updating" },
    { id: "item-types", title: "Item types" },
  ]
  return (
    <GuidePage href="/docs/cli" toc={toc}>
      <section className="flex flex-col gap-4">
        <GuideH2 id="the-registry">The registry</GuideH2>
        <p className="text-muted-foreground">
          qinyang/ui is published as static JSON at <Code>{SITE_URL}/r/&lt;name&gt;.json</Code>, one file per item, built
          from the repository&apos;s <Code>registry.json</Code> with <Code>shadcn build</Code>. Registering the namespace
          lets every command below take short names like <Code>{ns}/button</Code>.
        </p>
        <AgentCodeBlock code={config} filename="components.json" language="json" />
      </section>

      <section className="flex flex-col gap-4">
        <GuideH2 id="add">add</GuideH2>
        <p className="text-muted-foreground">
          Copies one or more items into your project, along with their <Code>registryDependencies</Code> (other{" "}
          <Code>{ns}</Code> items) and npm <Code>dependencies</Code>.
        </p>
        <InstallCommand args={`add ${ns}/date-range-picker ${ns}/tool-result`} />
        <p className="text-muted-foreground">
          Useful flags: <Code>--dry-run</Code> previews the files without writing them, <Code>--diff &lt;path&gt;</Code> shows
          what would change in a file you already have, <Code>-o</Code> / <Code>--overwrite</Code> replaces existing files and{" "}
          <Code>-p</Code> / <Code>--path</Code> sets where the files go.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <GuideH2 id="view">view</GuideH2>
        <p className="text-muted-foreground">Prints an item&apos;s metadata and source before you install it.</p>
        <InstallCommand args={`view ${ns}/prompt-bar`} />
      </section>

      <section className="flex flex-col gap-4">
        <GuideH2 id="search">search</GuideH2>
        <p className="text-muted-foreground">
          Lists the items in the registry, optionally filtered with <Code>-q</Code>. <Code>list</Code> is an alias.
        </p>
        <InstallCommand args={`search ${ns} -q "chart"`} />
      </section>

      <section className="flex flex-col gap-4">
        <GuideH2 id="by-url">Install by URL</GuideH2>
        <p className="text-muted-foreground">
          Any command also takes an item&apos;s URL in place of its name. Items depend on other <Code>{ns}</Code> items (at
          least the theme), so keep the namespace registered for those to resolve.
        </p>
        <InstallCommand args={`add ${itemUrl}`} />
      </section>

      <section className="flex flex-col gap-4">
        <GuideH2 id="updating">Updating</GuideH2>
        <p className="text-muted-foreground">
          Installed files are yours, so nothing updates on its own. To pull a newer version of an item, compare first with{" "}
          <Code>--diff</Code>, then re-add it with <Code>--overwrite</Code> and re-apply any local edits. Check the{" "}
          <TextLink href="/docs/changelog">Changelog</TextLink> for what moved.
        </p>
        <InstallCommand args={`add ${ns}/button --diff components/ui/button.tsx`} />
      </section>

      <section className="flex flex-col gap-4">
        <GuideH2 id="item-types">Item types</GuideH2>
        <ul className="flex list-disc flex-col gap-2 pl-5 text-muted-foreground marker:text-border">
          <li>
            <Code>registry:ui</Code> components, installed to your <Code>ui</Code> alias.
          </li>
          <li>
            <Code>registry:block</Code> composed blocks and full-page templates, which can ship several files (a template
            also ships its <Code>page.tsx</Code>).
          </li>
          <li>
            <Code>registry:theme</Code> the theme and the <Code>theme-&lt;accent&gt;</Code> presets, which write CSS variables
            rather than files (see <TextLink href="/docs/theming">Theming</TextLink>).
          </li>
          <li>
            <Code>registry:lib</Code> and <Code>registry:component</Code> shared files: <Code>{ns}/utils</Code> (the{" "}
            <Code>cn</Code> helper) and the <Code>{ns}/icons</Code> set.
          </li>
        </ul>
        <p className="text-muted-foreground">A trimmed item file, as the CLI receives it:</p>
        <AgentCodeBlock code={itemJson} filename={itemUrl.replace(/^https?:\/\//, "")} language="json" />
      </section>
    </GuidePage>
  )
}
