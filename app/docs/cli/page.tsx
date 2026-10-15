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
  "description": "Triggers an action or submits a form.",
  "dependencies": ["@base-ui/react", "class-variance-authority"],
  "registryDependencies": ["${ns}/theme"],
  "files": [{ "path": "registry/base-nova/ui/button.tsx", "type": "registry:ui", "content": "…" }]
}`
  const templateUrl = (name: string) => REGISTRY_URL.replace("{name}", name)
  const templates = [
    { name: "saas", app: "my-saas", what: "a starter app with marketing pages, sign-in and a dashboard" },
    { name: "agent-workspace", app: "my-agent", what: "the agent workspace as the home page, with its ACP bridge server" },
    { name: "docs", app: "my-docs", what: "a docs site at /docs" },
    { name: "blog", app: "my-blog", what: "a blog at /blog" },
  ]
  const toc = [
    { id: "templates", title: "Templates in one command" },
    { id: "the-registry", title: "The registry" },
    { id: "add", title: "add" },
    { id: "view", title: "view" },
    { id: "search", title: "search" },
    { id: "by-url", title: "Install by URL" },
    { id: "updating", title: "Updating" },
    { id: "icon-style", title: "Switch the icon style" },
    { id: "item-types", title: "Item types" },
  ]
  return (
    <GuidePage href="/docs/cli" toc={toc}>
      <section className="flex flex-col gap-4">
        <GuideH2 id="templates">Templates in one command</GuideH2>
        <p className="text-muted-foreground">
          To start a new app from a template, pass its URL to <Code>init</Code>. The CLI creates a Next.js project, writes
          the theme, installs every component the template uses and adds its routes. You don&apos;t need to set up{" "}
          <Code>components.json</Code> first, because items point at their dependencies by URL.
        </p>
        <InstallCommand args={`init -d -n my-saas ${templateUrl("saas")}`} />
        <p className="text-muted-foreground">
          Then <Code>cd my-saas</Code> and run <Code>pnpm dev</Code>. In an existing Next.js app with Tailwind 4, use{" "}
          <Code>add</Code> instead. It asks before replacing files such as <Code>app/page.tsx</Code>.
        </p>
        <InstallCommand args={`add ${templateUrl("saas")}`} />
        <ul className="flex list-disc flex-col gap-2 pl-5 text-muted-foreground marker:text-border">
          {templates.map((t) => (
            <li key={t.name}>
              <Code>{t.name}</Code> installs {t.what}.{" "}
              <Code>init -d -n {t.app} {templateUrl(t.name)}</Code>
            </li>
          ))}
        </ul>
        <p className="text-muted-foreground">
          The notion-editor and email-editor blocks install into an existing app the same way, for example{" "}
          <Code>add {templateUrl("notion-editor")}</Code>.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <GuideH2 id="the-registry">The registry</GuideH2>
        <p className="text-muted-foreground">
          qinyang/ui is published as one static JSON file per item at <Code>{SITE_URL}/r/&lt;name&gt;.json</Code>. Register
          the namespace so every command below accepts short names like <Code>{ns}/button</Code>.
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
          Add <Code>--dry-run</Code> to preview the files without writing them, or <Code>--diff &lt;path&gt;</Code> to see
          what would change in a file you already have. Use <Code>--overwrite</Code> to replace existing files and{" "}
          <Code>--path</Code> to choose where they go.
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
          Any command also takes an item&apos;s URL in place of its name. Keep the namespace registered anyway, because
          items depend on other <Code>{ns}</Code> items such as the theme.
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
        <GuideH2 id="icon-style">Switch the icon style</GuideH2>
        <p className="text-muted-foreground">
          The icon set comes in three styles with the same exports, and all of them install to the same file. Replace it to
          switch the icons in every component.
        </p>
        <InstallCommand args={`add ${templateUrl("icons-puffy")} --overwrite`} />
        <InstallCommand args={`add ${templateUrl("icons-outline")} --overwrite`} />
        <p className="text-muted-foreground">To go back to the default rounded set, run this.</p>
        <InstallCommand args={`add ${templateUrl("icons")} --overwrite`} />
        <p className="text-muted-foreground">
          When you later add an item that uses icons, the CLI asks before overwriting <Code>components/icons.tsx</Code>.
          Answer no to keep your style. A non-interactive run stops at that question. If you add with{" "}
          <Code>--overwrite</Code>, the rounded set comes back, so run your style&apos;s command again. Compare the styles on{" "}
          <TextLink href="/docs/icons#icon-styles">Icons</TextLink>.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <GuideH2 id="item-types">Item types</GuideH2>
        <ul className="flex list-disc flex-col gap-2 pl-5 text-muted-foreground marker:text-border">
          <li>
            <Code>registry:ui</Code> is a component, installed to your <Code>ui</Code> alias.
          </li>
          <li>
            <Code>registry:block</Code> is a block or template, which can ship several files including a{" "}
            <Code>page.tsx</Code>.
          </li>
          <li>
            <Code>registry:theme</Code> is the theme or an accent preset, which writes CSS variables rather than files (see{" "}
            <TextLink href="/docs/theming">Theming</TextLink>).
          </li>
          <li>
            <Code>registry:lib</Code> and <Code>registry:component</Code> are shared files such as <Code>{ns}/utils</Code>{" "}
            and <Code>{ns}/icons</Code>.
          </li>
        </ul>
        <p className="text-muted-foreground">This is a trimmed item file as the CLI receives it.</p>
        <AgentCodeBlock code={itemJson} filename={itemUrl.replace(/^https?:\/\//, "")} language="json" />
      </section>
    </GuidePage>
  )
}
