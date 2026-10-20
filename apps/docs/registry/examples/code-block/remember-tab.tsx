import { CodeBlock, CodeGroup } from "@paneui/ui/components/code-block"

const ts = "<pre class=\"shiki shiki-themes\" style=\"--shiki-light:#1f2328;--shiki-dark:#e6edf3;--shiki-light-bg:#ffffff;--shiki-dark-bg:#0d1117\" tabindex=\"0\"><code><span class=\"line\"><span style=\"--shiki-light:#CF222E;--shiki-dark:#FF7B72\">import</span><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\"> { Button } </span><span style=\"--shiki-light:#CF222E;--shiki-dark:#FF7B72\">from</span><span style=\"--shiki-light:#0A3069;--shiki-dark:#A5D6FF\"> \"@/components/ui/button\"</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"--shiki-light:#CF222E;--shiki-dark:#FF7B72\">export</span><span style=\"--shiki-light:#CF222E;--shiki-dark:#FF7B72\"> default</span><span style=\"--shiki-light:#CF222E;--shiki-dark:#FF7B72\"> function</span><span style=\"--shiki-light:#8250DF;--shiki-dark:#D2A8FF\"> Page</span><span style=\"--shiki-light:#953800;--shiki-dark:#FFA657\">() </span><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">{</span></span>\n<span class=\"line\"><span style=\"--shiki-light:#CF222E;--shiki-dark:#FF7B72\">  return</span><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\"> &#x3C;</span><span style=\"--shiki-light:#116329;--shiki-dark:#7EE787\">Button</span><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">>Deploy&#x3C;/</span><span style=\"--shiki-light:#116329;--shiki-dark:#7EE787\">Button</span><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">></span></span>\n<span class=\"line\"><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">}</span></span></code></pre>"
const css = "<pre class=\"shiki shiki-themes\" style=\"--shiki-light:#1f2328;--shiki-dark:#e6edf3;--shiki-light-bg:#ffffff;--shiki-dark-bg:#0d1117\" tabindex=\"0\"><code><span class=\"line\"><span style=\"--shiki-light:#CF222E;--shiki-dark:#FF7B72\">@import</span><span style=\"--shiki-light:#0A3069;--shiki-dark:#A5D6FF\"> \"tailwindcss\"</span><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">;</span></span>\n<span class=\"line\"><span style=\"--shiki-light:#CF222E;--shiki-dark:#FF7B72\">@import</span><span style=\"--shiki-light:#0A3069;--shiki-dark:#A5D6FF\"> \"./typeset.css\"</span><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">;</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"--shiki-light:#0550AE;--shiki-dark:#79C0FF\">:root</span><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\"> {</span></span>\n<span class=\"line\"><span style=\"--shiki-light:#953800;--shiki-dark:#FFA657\">  --radius</span><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">: </span><span style=\"--shiki-light:#0550AE;--shiki-dark:#79C0FF\">0.625</span><span style=\"--shiki-light:#CF222E;--shiki-dark:#FF7B72\">rem</span><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">;</span></span>\n<span class=\"line\"><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">}</span></span></code></pre>"

export default function CodeBlockRememberTab() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <CodeGroup storageKey="example-code-group">
        <CodeBlock title="TypeScript" language="tsx" html={ts} />
        <CodeBlock title="CSS" language="css" html={css} />
      </CodeGroup>
      <CodeGroup storageKey="example-code-group">
        <CodeBlock title="TypeScript" language="tsx" html={ts} />
        <CodeBlock title="CSS" language="css" html={css} />
      </CodeGroup>
    </div>
  )
}
