import { T } from "@/lib/site-locale"

import { LocalizedText } from "@/components/docs/localized"
import { DocHeading } from "@/components/docs/doc-heading"
import { Code, GuidePage, TextLink } from "@/components/docs/guide-page"
import { InstallCommand } from "@/components/docs/install-command"
import { REGISTRY_NAME, REGISTRY_URL } from "@/lib/docs"
import { DocsCode } from "@/components/docs/docs-code"
import { Alert, AlertContent, AlertDescription, AlertIcon, AlertTitle } from "@paneui/ui/components/alert"

export const metadata = { title: "Installation" }

function Step({ n, id, title, children }: { n: number; id: string; title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <DocHeading id={id} className="flex items-center gap-3 text-lg tracking-normal">
        <span data-md-skip className="grid size-7 shrink-0 place-items-center rounded-full bg-card text-ui tabular-nums shadow-raised">{n}</span>
        <LocalizedText text={title} />
      </DocHeading>
      <div className="flex flex-col gap-3 sm:pl-10">{children}</div>
    </section>
  )
}

const USAGE = `import { Button } from "@/components/ui/button"

export function Save() {
  return <Button>Save changes</Button>
}`

export default function Installation() {
  const config = JSON.stringify({ registries: { [`@${REGISTRY_NAME}`]: REGISTRY_URL } }, null, 2)
  const toc = [
    { id: "requirements", title: { en: "Requirements", zh: "环境要求" } },
    { id: "add-the-registry", title: { en: "Add the registry", zh: "添加组件库" } },
    { id: "install-the-theme", title: { en: "Install the theme", zh: "安装主题" } },
    { id: "add-components", title: { en: "Add components", zh: "添加组件" } },
    { id: "use-them", title: { en: "Use them", zh: "开始使用" } },
  ]
  return (
    <GuidePage
      href="/docs/installation"
      toc={toc}
      lede={{ en: "Install the theme, then add components.", zh: "安装主题，再添加组件。" }}
    >
      <Alert variant="info" id="requirements" className="scroll-mt-20">
        <AlertIcon />
        <AlertContent>
          <AlertTitle><LocalizedText text="Requirements" /></AlertTitle>
          <AlertDescription>
            <T
              en={
                <>
                  A React project with Tailwind CSS 4 and shadcn initialised with the base-nova style. Run{" "}
                  <Code>shadcn init</Code> first if you have no components.json yet. To start a new app from a template, see{" "}
                  <TextLink href="/docs/cli#templates">Templates in one command</TextLink>.
                </>
              }
              zh={
                <>
                  一个使用 Tailwind CSS 4 的 React 项目，并已用 base-nova 样式初始化 shadcn。如果还没有 components.json，请先运行{" "}
                  <Code>shadcn init</Code>。想用模板新建应用，见{" "}
                  <TextLink href="/docs/cli#templates">一条命令创建模板</TextLink>。
                </>
              }
            />
          </AlertDescription>
        </AlertContent>
      </Alert>

      <Step n={1} id="add-the-registry" title="Add the registry">
        <p className="text-muted-foreground">
          <T en="Add the namespace to your components.json." zh="把命名空间添加到你的 components.json。" />
        </p>
        <DocsCode code={config} filename="components.json" language="json" />
      </Step>

      <Step n={2} id="install-the-theme" title="Install the theme">
        <p className="text-muted-foreground">
          <T
            en="Every component reads the theme's tokens, so install it first, together with the icon set."
            zh="每个组件都会读取主题的变量，所以请先安装主题，并一并安装图标集。"
          />
        </p>
        <InstallCommand args={`add @${REGISTRY_NAME}/theme @${REGISTRY_NAME}/icons`} />
        <p className="text-muted-foreground">
          <T
            en={
              <>
                The accent is blue by default. To change it, add one accent preset after the theme.{" "}
                <TextLink href="/docs/theming#accent-presets">Theming</TextLink> lists the presets and what each token
                does.
              </>
            }
            zh={
              <>
                主题色默认为蓝色。要更换主题色，在主题之后添加一个主题色预设。{" "}
                <TextLink href="/docs/theming#accent-presets">主题</TextLink>列出了所有预设以及每个变量的作用。
              </>
            }
          />
        </p>
        <InstallCommand args={`add @${REGISTRY_NAME}/theme-violet`} />
      </Step>

      <Step n={3} id="add-components" title="Add components">
        <InstallCommand args={`add @${REGISTRY_NAME}/button @${REGISTRY_NAME}/prompt-bar`} />
        <p className="text-muted-foreground">
          <T
            en="The CLI also installs the components and npm packages each item depends on. Everything lands in your project as source, so edit it as you need."
            zh="CLI 还会安装每个条目所依赖的组件和 npm 包。所有内容都以源码形式进入你的项目，可按需修改。"
          />
        </p>
      </Step>

      <Step n={4} id="use-them" title="Use them">
        <p className="text-muted-foreground">
          <T
            en="Import from the path your components.json aliases point to. Every component page lists its parts and props under API Reference."
            zh="从你的 components.json 别名指向的路径导入。每个组件页面都会在 API 参考下列出它的各个部分和属性。"
          />
        </p>
        <DocsCode code={USAGE} filename="save.tsx" language="tsx" />
        <p className="text-muted-foreground">
          <T
            en={
              <>
                For other commands, see <TextLink href="/docs/cli">CLI &amp; registry</TextLink>.
              </>
            }
            zh={
              <>
                其他命令见 <TextLink href="/docs/cli">CLI 与组件库</TextLink>。
              </>
            }
          />
        </p>
      </Step>
    </GuidePage>
  )
}
