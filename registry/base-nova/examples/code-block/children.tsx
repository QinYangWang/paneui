import { CodeBlock } from "@/registry/base-nova/ui/code-block"

// Class names as the highlighter emits them (not Tailwind classes).
// eslint-disable-next-line shadcn/no-unknown-classes -- highlighter output classes that CodeBlock styles
const pre = "shiki shiki-themes"
// eslint-disable-next-line shadcn/no-unknown-classes -- highlighter output classes that CodeBlock styles
const line = "line"
const tone = (light: string, dark: string) => ({ "--shiki-light": light, "--shiki-dark": dark }) as React.CSSProperties

// The same markup as elements, e.g. a custom `pre` in an MDX components map.
export default function CodeBlockChildren() {
  return (
    <CodeBlock title="config.json" className="w-full max-w-lg">
      <pre className={pre} style={tone("#1f2328", "#e6edf3")}>
        <code>
          <span className={line}>{"{"}</span>
          {"\n"}
          <span className={line}>
            <span style={tone("#0550ae", "#79c0ff")}>{'  "title"'}</span>
            {": "}
            <span style={tone("#0a3069", "#a5d6ff")}>{'"Docs"'}</span>
          </span>
          {"\n"}
          <span className={line}>{"}"}</span>
        </code>
      </pre>
    </CodeBlock>
  )
}
