import { repoPath } from "@/lib/repo-path"
import fs from "node:fs"
import type * as React from "react"

import { CheckCircleIcon, XCircleIcon } from "@paneui/ui/icons"
import { AgentSkill } from "@/components/docs/agent-skill"
import type { TocEntry } from "@/components/docs/doc-toc"
import { DocsCode, highlight } from "@/components/docs/docs-code"
import { DocHeading } from "@/components/docs/doc-heading"
import { Code, GuideH2, GuidePage } from "@/components/docs/guide-page"
import { InstallCommand } from "@/components/docs/install-command"
import { ruleSlug, SKILL_EXAMPLE_FILES, SKILL_EXAMPLES } from "@/components/docs/skill-examples"
import { REGISTRY_NAME } from "@/lib/docs"
import { T } from "@/lib/site-locale"

export const metadata = { title: "Design skill" }

type Rule = { n: number; title: string; why: string; id: string }

/** Rules straight from skills/paneui-design/SKILL.md: "### N. Title" and the sentence under it. */
function readSkill() {
  const skill = fs.readFileSync(repoPath( "skills/paneui-design/SKILL.md"), "utf8")
  const body = skill.slice(skill.indexOf("\n## Rules"), skill.indexOf("\n## References"))
  const rules: Rule[] = []
  for (const block of body.split(/\n### /).slice(1)) {
    const [head, ...rest] = block.split("\n")
    const m = head.match(/^(\d+)\.\s+(.+)$/)
    if (!m) continue
    const why = rest.join("\n").trim().split(/\n\s*\n/)[0].replace(/\s+/g, " ")
    rules.push({ n: Number(m[1]), title: m[2], why, id: ruleSlug(m[2]) })
  }
  const missing = rules.filter((r) => !SKILL_EXAMPLES[r.id] && !SKILL_EXAMPLE_FILES[r.id]).map((r) => r.id)
  if (missing.length) console.warn(`[docs/skill] rules without an example in skill-examples.tsx: ${missing.join(", ")}`)
  return { skill, rules }
}

/** `code` spans in a line of markdown as inline code. */
function Md({ text }: { text: string }) {
  return (
    <>
      {text.split(/(`[^`]+`)/).map((part, i) => (part.startsWith("`") ? <Code key={i}>{part.slice(1, -1)}</Code> : part))}
    </>
  )
}

/** Chinese copy for the rule titles and their summary sentence in SKILL.md, keyed by rule number. */
const RULE_ZH: Record<number, { title: string; why: string }> = {
  1: {
    title: "颜色使用主题变量",
    why: "变量会跟随主题、主题色预设和深色模式；调色板类名和十六进制值不会。",
  },
  2: {
    title: "实心背景上的文字用对应的前景变量",
    why: "中性主题色的实心背景在深色模式下接近白色，因此 `text-white` 会消失在上面。",
  },
  3: {
    title: "状态用填充，面板用表面",
    why: "`secondary`、`muted` 和 `accent` 是半透明填充；任何浮起或承载内容的部分都需要不透明的表面。",
  },
  4: {
    title: "用阴影变量提升层级，而不是边框加阴影",
    why: "每个阴影层级本身已带有细线，再叠加 CSS 边框会让边缘变粗一倍。",
  },
  5: {
    title: "数据系列使用图表配色",
    why: "八个固定色相在任何主题色和两种模式下表现一致，并让相邻系列保持区分。",
  },
  6: {
    title: "嵌套圆角保持同心",
    why: "子元素的圆角不跟随容器的曲线时，在任何圆角预设下都像是错误。",
  },
  7: {
    title: "圆角不超过 16px",
    why: "超过 16px 后容器会变成一团，嵌套部分也无法保持同心。",
  },
  8: {
    title: "所有圆角都从基础圆角推导",
    why: "预设和圆角滑块会缩放 `--radius` 及基于它的变量，而不是写死的像素圆角。",
  },
  9: {
    title: "使用界面文字层级",
    why: "一套紧凑的字号让密集界面保持整齐；随意指定字号会逐渐走样。",
  },
  10: {
    title: "标题用 semibold，标签用 medium",
    why: "两级字重就能表达层级；更粗的字在密集布局里会显得吵闹。",
  },
  11: {
    title: "保留字体原有字距",
    why: "字体已按字号设置好间距；收紧小字会更难阅读。",
  },
  12: {
    title: "会变化或需要对齐的数字用等宽数字",
    why: "比例数字会让列和计数器跳动。",
  },
  13: {
    title: "按桌面密度设置控件尺寸",
    why: "桌面屏幕一屏能放更多内容；触屏尺寸的控件会浪费空间。",
  },
  14: {
    title: "相关内容靠得更近",
    why: "在任何边框之前，间距先完成内容分组。",
  },
  15: {
    title: "导航文字从同一条左边缘开始",
    why: "缩进和引导线会加宽侧栏，并打断视线跟随的那一列。",
  },
  16: {
    title: "组合组件库，不要重设样式",
    why: "组件的变体和尺寸就是它的设计；在每个页面覆盖它们会让样式分叉。",
  },
  17: {
    title: "菜单标签保持在分组内",
    why: "标签为辅助技术命名分组，而基础组件的标签在分组外会抛错。",
  },
  18: {
    title: "文件夹用箭头，文件用类型图标",
    why: "箭头旁再放文件夹图标重复表达了同一件事，还把名称推开。",
  },
  19: {
    title: "同一分组只用一套图标",
    why: "一个分组里出现两套字形，看起来像两个不同的产品。",
  },
  20: {
    title: "标题图标加外框，导航图标保持裸放",
    why: "外框把图标标为卡片的主题；放在列表里就是干扰。",
  },
  21: {
    title: "其他产品使用真实品牌图标",
    why: "重绘或近似的标志在熟悉品牌的人看来就是错的。",
  },
  22: {
    title: "人和工作区用头像表示",
    why: "头像表达“谁”；那个位置的通用图标什么也没说。",
  },
  23: {
    title: "按下时用填充回应",
    why: "原生控件按下时不会缩小；让每个按钮都缩放会让界面感觉弹来弹去。",
  },
  24: {
    title: "过渡明确的属性，时长要短",
    why: "`transition-all` 会动画你没打算动的布局，慢速悬停会显得卡顿。",
  },
  25: {
    title: "根据减少动态效果限制位移",
    why: "位移、缩放和模糊会让部分读者不适；透明度渐变也能表达同样的变化。",
  },
  26: {
    title: "键盘聚焦时显示焦点环",
    why: "键盘用户需要看到自己在哪；悬停样式帮不到他们。",
  },
  27: {
    title: "让预览自己说明",
    why: "实时预览已经展示了外观、布局和状态；重复描述的文案只是噪音。",
  },
  28: {
    title: "描述只用一句朴素的话",
    why: "组件库描述同时是页面导语、搜索文本和 meta 标签。",
  },
  29: {
    title: "不要写冒号列表或堆叠形容词",
    why: "“X：a、b、c 和 d”和“强大、无缝”读起来都像填充内容。",
  },
  30: {
    title: "描述它做什么，而不是它来自哪里",
    why: "“区块编辑器”、“语法高亮器”、“桌面密度”。注释、文案和文档里不写来源说明，也不写模仿某项目风格的措辞；许可声明只放在一个声明文件里。包名只在需要处保留：导入、依赖和安装命令。",
  },
  31: {
    title: "模板片段不要与组件库条目同名",
    why: "片段文件与条目同名（`parts/avatar.tsx` 紧邻 `avatar` 条目）会在安装和导入时冲突。",
  },
  32: {
    title: "主题更新后运行升级检查",
    why: "CLI 会新增并更新主题变量，但从不删除，因此移除的变量会残留。",
  },
  33: {
    title: "每个点击目标都留出 24px",
    why: "16px 的复选框或关闭按钮用触控板都难命中，用手指更难。",
  },
  34: {
    title: "收窄按钮图标一侧的内边距",
    why: "图标的侧边空白会额外占位，等量的内边距会把内容推离中心。",
  },
  35: {
    title: "用中性细线给图片描边",
    why: "没有边缘时浅色照片会融进白色卡片；灰色边框会带上表面的色调。",
  },
  36: {
    title: "图标切换用交叉淡入淡出",
    why: "从复制直接切成对勾的字形很容易被忽略；就地变化才读作新的状态。",
  },
  37: {
    title: "状态用过渡，一次性动画用关键帧",
    why: "状态中途翻转时过渡会重新定目标；关键帧会重新开始并跳变。",
  },
  38: {
    title: "离场比入场更安静",
    why: "视线已经移向接下来的内容；过大的退场会把它拉回来。",
  },
  39: {
    title: "用 CSS 改变图标颜色，保留描边和网格",
    why: "更粗的描边、偏离网格的尺寸或写死的填充，会让一个字形看起来像另一套图标。",
  },
  40: {
    title: "每个纯图标按钮都要有名称",
    why: "屏幕阅读器对未命名的图标按钮只会读作“按钮”，别的一无所有。",
  },
  41: {
    title: "图标描边与文字字重匹配",
    why: "半粗文字旁的常规描边会显得发虚，像是图标被禁用了。",
  },
  42: {
    title: "没有行填充时用实心图标表示选中",
    why: "仅靠颜色很难说明自己在哪，尤其是在阳光下的手机上。",
  },
  43: {
    title: "文字按阅读方向对齐",
    why: "在阿拉伯语和希伯来语中文字从右侧开始，`text-left` 仍然靠左。",
  },
}

const LABEL = {
  good: { text: { en: "Recommended", zh: "推荐" }, icon: <CheckCircleIcon className="size-4 text-success" /> },
  bad: { text: { en: "Avoid", zh: "避免" }, icon: <XCircleIcon className="size-4 text-destructive" /> },
} as const

function LiveExample({ tone, children }: { tone: keyof typeof LABEL; children: React.ReactNode }) {
  return (
    <figure className="flex min-w-0 flex-col overflow-hidden rounded-xl bg-card shadow-raised">
      <figcaption className="flex h-10 items-center gap-2 border-b px-4 text-ui-sm font-medium">
        {LABEL[tone].icon}
        <T en={LABEL[tone].text.en} zh={LABEL[tone].text.zh} />
      </figcaption>
      <div className="grid min-h-40 flex-1 place-items-center bg-background p-6">{children}</div>
    </figure>
  )
}

/** The good/bad pair the skill ships in examples/<dir>/. */
function fileExample(dir: string) {
  const read = (kind: string) => fs.readFileSync(repoPath( "skills/paneui-design/examples", dir, `${kind}.tsx`), "utf8").trim()
  return { kind: "code" as const, lang: "tsx", good: read("good"), bad: read("bad") }
}

function RuleExamples({ id }: { id: string }) {
  const ex = SKILL_EXAMPLES[id] ?? (SKILL_EXAMPLE_FILES[id] ? fileExample(SKILL_EXAMPLE_FILES[id]) : undefined)
  if (!ex) return null
  if (ex.kind === "code")
    return (
      <div className="grid gap-3">
        <DocsCode
          code={ex.good}
          language={ex.lang}
          title={<T en={LABEL.good.text.en} zh={LABEL.good.text.zh} />}
          icon={LABEL.good.icon}
        />
        <DocsCode
          code={ex.bad}
          language={ex.lang}
          title={<T en={LABEL.bad.text.en} zh={LABEL.bad.text.zh} />}
          icon={LABEL.bad.icon}
        />
      </div>
    )
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <LiveExample tone="good">{ex.good}</LiveExample>
      <LiveExample tone="bad">{ex.bad}</LiveExample>
    </div>
  )
}

const CHECK = `node .agents/skills/paneui-design/scripts/check.mjs
node .agents/skills/paneui-design/scripts/check.mjs app components --strict
node .agents/skills/paneui-design/scripts/check.mjs --list`

export default async function SkillPage() {
  const { skill, rules } = readSkill()
  const toc: TocEntry[] = [
    { id: "installation", title: "Installation" },
    { id: "check", title: { en: "Check", zh: "检查" } },
    { id: "platforms", title: { en: "Web and Native", zh: "Web 与 Native" } },
    { id: "rules", title: { en: "Rules", zh: "规则" } },
    ...rules.map((r) => ({
      id: r.id,
      title: { en: r.title.replace(/`/g, ""), zh: (RULE_ZH[r.n]?.title ?? r.title).replace(/`/g, "") },
      depth: 2 as const,
    })),
  ]
  return (
    <GuidePage href="/docs/skill" toc={toc}>
      <section className="flex flex-col gap-4">
        <GuideH2 id="installation">Installation</GuideH2>
        <AgentSkill name="paneui-design" skill={skill} html={await highlight(skill, "markdown")} />
        <p className="text-muted-foreground">
          <T
            en={<>Or through the shadcn CLI, into <Code>.agents/skills</Code>:</>}
            zh={<>或通过 shadcn CLI 安装到 <Code>.agents/skills</Code>：</>}
          />
        </p>
        <InstallCommand args={`add @${REGISTRY_NAME}/design-skill`} />
      </section>

      <section className="flex flex-col gap-4">
        <GuideH2 id="check">
          <T en="Check" zh="检查" />
        </GuideH2>
        <p className="text-muted-foreground">
          <T
            en={<>Run it before you commit. It exits with an error when a rule breaks; allow-list a deliberate exception in{" "}<Code>paneui-design.config.json</Code> with its reason.</>}
            zh={<>提交前运行。规则被违反时会报错退出；如果是有意保留的例外，在 <Code>paneui-design.config.json</Code> 中加白名单并写明原因。</>}
          />
        </p>
        <DocsCode code={CHECK} language="bash" />
        <p className="text-muted-foreground">
          <T
            en={<>For what only the rendered page shows, open the screen and paste <Code>scripts/radius-probe.js</Code> (nested corners) or <Code>scripts/polish-probe.js</Code> (hit areas, image edges, live numbers) into the browser console.</>}
            zh={<>对于只有渲染后的页面才能看到的问题，打开对应页面，把 <Code>scripts/radius-probe.js</Code>（嵌套圆角）或 <Code>scripts/polish-probe.js</Code>（点击区域、图片边缘、实时数字）粘贴到浏览器控制台。</>}
          />
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <GuideH2 id="platforms">
          <T en="Web and Native" zh="Web 与 Native" />
        </GuideH2>
        <p className="text-pretty text-muted-foreground">
          <T
            en={<>Share semantic colours, spacing and wording. Web uses CSS tokens and browser semantics; Native uses touch dimensions, system text scaling and native accessibility. The platform references in the skill explain where their implementations differ.</>}
            zh={<>共享语义颜色、间距和措辞。Web 使用 CSS 变量和浏览器语义；Native 使用触控尺寸、系统文字缩放和原生无障碍能力。技能中的平台参考文档说明了各自实现的不同之处。</>}
          />
        </p>
        <p className="text-pretty text-muted-foreground">
          <T
            en={<>Native checks inspect visible styles and primitive props. Prop spreads, imported styles, effective touch bounds and device announcements still need review. Browser probes apply to Web elements; a browser preview does not replace a device run.</>}
            zh={<>Native 检查会审视可见样式和基础组件属性。属性展开、导入的样式、实际触控范围和设备播报仍需人工检查。浏览器探针只适用于 Web 元素；浏览器预览不能替代真机运行。</>}
          />
        </p>
        <RuleExamples id="native-touch-target" />
        <RuleExamples id="native-accessibility" />
      </section>

      <section className="flex flex-col gap-12">
        <GuideH2 id="rules">
          <T en="Rules" zh="规则" />
        </GuideH2>
        {rules.map((r) => (
          <section key={r.id} className="flex flex-col gap-3">
            <DocHeading as="h3" id={r.id} className="text-balance">
              <span className="me-2 text-muted-foreground tabular-nums">{r.n}.</span>
              <T
                en={<Md text={r.title} />}
                zh={<Md text={RULE_ZH[r.n]?.title ?? r.title} />}
              />
            </DocHeading>
            <p className="text-pretty text-muted-foreground">
              <T
                en={<Md text={r.why} />}
                zh={<Md text={RULE_ZH[r.n]?.why ?? r.why} />}
              />
            </p>
            <RuleExamples id={r.id} />
          </section>
        ))}
      </section>
    </GuidePage>
  )
}
