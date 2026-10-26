import { CodeBlock } from "@paneui/ui/components/code-block"

// Class names as the highlighter emits them (not Tailwind classes).
// eslint-disable-next-line shadcn/no-unknown-classes -- highlighter output classes that CodeBlock styles
const pre = "code-syntax"
// eslint-disable-next-line shadcn/no-unknown-classes -- highlighter output classes that CodeBlock styles
const line = "line"
const tone = (role: string) => ({ color: `var(--${role})` })

// The same markup as elements, e.g. a custom `pre` in an MDX components map.
export default function CodeBlockChildren() {
  return (
    <CodeBlock title="config.json" className="w-full max-w-lg">
      <pre className={pre} style={tone("foreground")}>
        <code>
          <span className={line}>{"{"}</span>
          {"\n"}
          <span className={line}>
            <span style={tone("chart-1")}>{'  "title"'}</span>
            {": "}
            <span style={tone("success")}>{'"Docs"'}</span>
          </span>
          {"\n"}
          <span className={line}>{"}"}</span>
        </code>
      </pre>
    </CodeBlock>
  )
}
