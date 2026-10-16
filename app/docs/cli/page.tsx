import type { TocEntry } from "@/components/docs/doc-toc"
import { Code, GuideH2, GuideH3, GuidePage, TextLink } from "@/components/docs/guide-page"
import { InstallCommand } from "@/components/docs/install-command"
import { REGISTRY_NAME, REGISTRY_URL, SITE_URL } from "@/lib/docs"
import { DocsCode } from "@/components/docs/docs-code"
import {
  SimpleTable,
  SimpleTableBody,
  SimpleTableCell,
  SimpleTableHead,
  SimpleTableHeader,
  SimpleTableRow,
} from "@/registry/base-nova/ui/simple-table"

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
  const templates: { name: string; what: string; routes: string[] }[] = [
    { name: "saas", what: "Marketing pages, sign-in and a dashboard", routes: ["app/page.tsx", "app/not-found.tsx", "app/pricing", "app/changelog", "app/(auth)", "app/dashboard"] },
    { name: "vscode", what: "A code editor with a shared workspace and terminals", routes: ["app/page.tsx"] },
    { name: "agent-workspace", what: "The agent workspace with its ACP bridge server", routes: ["app/page.tsx", "server/acp-bridge.mjs"] },
    { name: "docs", what: "A docs site", routes: ["app/docs/page.tsx"] },
    { name: "blog", what: "A blog with a post page", routes: ["app/blog"] },
  ]
  const migrations: { version: string; changed: React.ReactNode; todo: React.ReactNode }[] = [
    {
      version: "2.2",
      changed: (
        <>
          Every radius token stops at <Code>--radius-max</Code> (16px), and the supported <Code>--radius</Code> range is 0
          to 1rem. Old <Code>rounded-4xl</Code> and <Code>rounded-5xl</Code> corners come out at 16px.
        </>
      ),
      todo: <>Reinstall the theme. The upgrade check flags a stylesheet without the cap or a base above 1rem.</>,
    },
    {
      version: "2.1",
      changed: (
        <>
          Wide-gamut colours and the layered popover shadow now apply. Older installs wrote them without the leading{" "}
          <Code>--</Code>, so browsers ignored them.
        </>
      ),
      todo: <>Reinstall the theme, then run the upgrade check with <Code>--fix</Code> to delete the broken lines.</>,
    },
    {
      version: "2",
      changed: (
        <>
          New foundation. The <Code>--accent-50</Code> to <Code>--accent-950</Code> ramp is replaced by eight role tokens;{" "}
          <Code>--radius</Code> goes from 0.625rem to 0.5rem; alpha grey text and borders; four shadow levels; Inter,
          JetBrains Mono and Newsreader font stacks; <Code>frame-*</Code> and <Code>rounded-inner</Code> utilities.
        </>
      ),
      todo: (
        <>
          Move <Code>accent-*</Code> classes to <Code>primary</Code> roles, then delete the ramp (<Code>--fix</Code>). Keep
          0.625rem with <Code>theme-radius-lg</Code> if you prefer it. Install <Code>fonts</Code> to self-host the fonts.
          Reinstall components so nested corners use the frame utilities.
        </>
      ),
    },
    {
      version: "1.x",
      changed: (
        <>
          <Code>size</Code> on <Code>Input</Code> and <Code>NativeSelect</Code> became the control size; the native
          attribute moved to <Code>htmlSize</Code>.
        </>
      ),
      todo: (
        <>
          Rename numeric <Code>size</Code> props to <Code>htmlSize</Code>. The upgrade check lists each one.
        </>
      ),
    },
  ]
  const toc: TocEntry[] = [
    { id: "templates", title: "Templates in one command" },
    { id: "new-project", title: "New project", depth: 2 },
    { id: "existing-project", title: "Existing project", depth: 2 },
    { id: "the-registry", title: "The registry" },
    { id: "add", title: "add" },
    { id: "view", title: "view" },
    { id: "search", title: "search" },
    { id: "by-url", title: "Install by URL" },
    { id: "updating", title: "Updating" },
    { id: "upgrading", title: "Upgrading after a theme change" },
    { id: "migrations", title: "Migrations", depth: 2 },
    { id: "cli-limits", title: "What the CLI merges", depth: 2 },
    { id: "icon-style", title: "Switch the icon style" },
    { id: "item-types", title: "Item types" },
  ]
  return (
    <GuidePage href="/docs/cli" toc={toc}>
      <section className="flex flex-col gap-4">
        <GuideH2 id="templates">Templates in one command</GuideH2>
        <p className="text-muted-foreground">
          Templates install by URL. Pick the path that matches where you start.
        </p>
        <div className="flex flex-col gap-4 pt-2">
          <GuideH3 id="new-project">New project</GuideH3>
          <p className="text-muted-foreground">
            Use <Code>init</Code> when you&apos;re starting from nothing. It creates the Next.js app with the theme and every
            component the template needs, so there is nothing to set up first.
          </p>
          <InstallCommand args={`init -d -n my-saas ${templateUrl("saas")}`} />
          <p className="text-muted-foreground">
            Then run <Code>cd my-saas</Code> and <Code>pnpm dev</Code>.
          </p>
        </div>

        <div className="flex flex-col gap-4 pt-2">
          <GuideH3 id="existing-project">Existing project</GuideH3>
          <p className="text-muted-foreground">
            Use <Code>add</Code> when the app is already set up and you want the template&apos;s pages next to your own.
          </p>
          <InstallCommand args={`add ${templateUrl("saas")}`} />
          <p className="text-muted-foreground">Before you run it, check these.</p>
          <ul className="flex list-disc flex-col gap-2 pl-5 text-muted-foreground marker:text-border">
            <li>
              The app uses the App Router and Tailwind CSS 4. If it has no <Code>components.json</Code>, the CLI offers to
              create one first.
            </li>
            <li>
              Your work is committed, so you can review the diff afterwards. Add <Code>--dry-run</Code> to list the files
              without writing them.
            </li>
            <li>
              Nothing you need lives at the template&apos;s routes (table below). The CLI asks before replacing an existing
              file; <Code>--overwrite</Code> replaces it without asking.
            </li>
            <li>
              The theme rewrites its variables in your global CSS, so custom values under the same names are replaced.
              Re-apply them after.
            </li>
          </ul>
          <p className="text-muted-foreground">
            The notion-editor and email-editor blocks install the same way, for example{" "}
            <Code>add {templateUrl("notion-editor")}</Code>.
          </p>
        </div>

        <div className="flex flex-col gap-4 pt-2">
          <GuideH3 id="template-list">Pick a template</GuideH3>
          <p className="text-muted-foreground">
            Swap <Code>saas</Code> in either command for another name. Each one also adds its parts under{" "}
            <Code>components/&lt;name&gt;/</Code>.
          </p>
          <SimpleTable className="min-w-xl">
              <SimpleTableHeader>
                <SimpleTableRow>
                  <SimpleTableHead>Template</SimpleTableHead>
                  <SimpleTableHead>You get</SimpleTableHead>
                  <SimpleTableHead>Writes to</SimpleTableHead>
                </SimpleTableRow>
              </SimpleTableHeader>
              <SimpleTableBody>
                {templates.map((t) => (
                  <SimpleTableRow key={t.name}>
                    <SimpleTableCell variant="code">{t.name}</SimpleTableCell>
                    <SimpleTableCell>{t.what}</SimpleTableCell>
                    <SimpleTableCell>
                      <span className="flex flex-wrap gap-1">
                        {t.routes.map((r) => (
                          <Code key={r}>{r}</Code>
                        ))}
                      </span>
                    </SimpleTableCell>
                  </SimpleTableRow>
                ))}
              </SimpleTableBody>
            </SimpleTable>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <GuideH2 id="the-registry">The registry</GuideH2>
        <p className="text-muted-foreground">
          qinyang/ui is published as one static JSON file per item at <Code>{SITE_URL}/r/&lt;name&gt;.json</Code>. Register
          the namespace so every command below accepts short names like <Code>{ns}/button</Code>.
        </p>
        <DocsCode code={config} filename="components.json" language="json" />
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
        <GuideH2 id="upgrading">Upgrading after a theme change</GuideH2>
        <p className="text-muted-foreground">
          When a release changes the theme, update it first, then the components that use it. Commit before you start so
          you can review every change.
        </p>
        <ol className="flex list-decimal flex-col gap-2 pl-5 text-muted-foreground marker:text-fg-tertiary">
          <li>
            Reinstall the theme. <Code>--overwrite</Code> is required: the theme also ships <Code>lib/utils.ts</Code>, and
            without it a non-interactive run stops at that question before the stylesheet is touched.
          </li>
        </ol>
        <InstallCommand args={`add ${ns}/theme --overwrite`} />
        <ol start={2} className="flex list-decimal flex-col gap-2 pl-5 text-muted-foreground marker:text-fg-tertiary">
          <li>Reinstall your accent and radius presets, if you use them, so they apply on top of the new theme.</li>
          <li>
            Run the upgrade check. It lists tokens the release removed, broken rules from older installs and code that uses
            a changed API, with a fix for each. <Code>--fix</Code> cleans the stylesheet; it never edits your source.
          </li>
        </ol>
        <InstallCommand args={`add ${ns}/upgrade-check`} />
        <DocsCode code={"node scripts/qinyang-upgrade-check.mjs\nnode scripts/qinyang-upgrade-check.mjs --fix"} language="bash" lineNumbers={false} />
        <ol start={4} className="flex list-decimal flex-col gap-2 pl-5 text-muted-foreground marker:text-fg-tertiary">
          <li>
            Re-add the components you use with <Code>--overwrite</Code>, a few at a time, and re-apply local edits from the
            diff.
          </li>
        </ol>

        <div className="flex flex-col gap-4 pt-2">
          <GuideH3 id="migrations">Migrations</GuideH3>
          <p className="text-muted-foreground">Newest first. Each step lists only what needs your attention.</p>
          <SimpleTable className="min-w-xl">
              <SimpleTableHeader>
                <SimpleTableRow>
                  <SimpleTableHead>Theme</SimpleTableHead>
                  <SimpleTableHead>What changed</SimpleTableHead>
                  <SimpleTableHead>What to do</SimpleTableHead>
                </SimpleTableRow>
              </SimpleTableHeader>
              <SimpleTableBody>
                {migrations.map((m) => (
                  <SimpleTableRow key={m.version}>
                    <SimpleTableCell variant="code">{m.version}</SimpleTableCell>
                    <SimpleTableCell>{m.changed}</SimpleTableCell>
                    <SimpleTableCell>{m.todo}</SimpleTableCell>
                  </SimpleTableRow>
                ))}
              </SimpleTableBody>
            </SimpleTable>
          <p className="text-muted-foreground">
            The installed version is <Code>meta.version</Code> in <Code>{ns}/theme</Code>; <Code>view {ns}/theme</Code>{" "}
            prints the current one.
          </p>
        </div>

        <div className="flex flex-col gap-4 pt-2">
          <GuideH3 id="cli-limits">What the CLI merges</GuideH3>
          <ul className="flex list-disc flex-col gap-2 pl-5 text-muted-foreground marker:text-border">
            <li>
              Variables in <Code>:root</Code>, <Code>.dark</Code> and <Code>@theme</Code> are added or updated in place, so
              new values replace old ones under the same name.
            </li>
            <li>
              Nothing is ever removed. A token a release drops stays in your stylesheet, along with any utility it generates;
              the upgrade check finds them.
            </li>
            <li>
              Rules inside <Code>@supports</Code> and <Code>@media</Code> blocks merge by selector and property, the same as
              variables.
            </li>
            <li>
              <Code>@property</Code> rules are appended again on every reinstall. The copies are identical and harmless; the
              upgrade check removes them.
            </li>
            <li>
              Component files are replaced whole with <Code>--overwrite</Code>, or skipped after a prompt without it. Use{" "}
              <Code>--diff</Code> or <Code>--dry-run</Code> first; there is no three-way merge of your edits.
            </li>
          </ul>
        </div>
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
        <DocsCode code={itemJson} filename={itemUrl.replace(/^https?:\/\//, "")} language="json" />
      </section>
    </GuidePage>
  )
}
