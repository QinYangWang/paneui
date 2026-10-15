import { CodeBlock } from "@/registry/base-nova/ui/code-block"

const html = "<pre class=\"shiki shiki-themes\" style=\"--shiki-light:#1f2328;--shiki-dark:#e6edf3;--shiki-light-bg:#ffffff;--shiki-dark-bg:#0d1117\" tabindex=\"0\"><code><span class=\"line\"><span style=\"--shiki-light:#953800;--shiki-dark:#FFA657\">mkdir</span><span style=\"--shiki-light:#0A3069;--shiki-dark:#A5D6FF\"> docs</span><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\"> &#x26;&#x26; </span><span style=\"--shiki-light:#0550AE;--shiki-dark:#79C0FF\">cd</span><span style=\"--shiki-light:#0A3069;--shiki-dark:#A5D6FF\"> docs</span></span>\n<span class=\"line\"><span style=\"--shiki-light:#953800;--shiki-dark:#FFA657\">npx</span><span style=\"--shiki-light:#0A3069;--shiki-dark:#A5D6FF\"> shadcn@latest</span><span style=\"--shiki-light:#0A3069;--shiki-dark:#A5D6FF\"> init</span></span></code></pre>"

export default function CodeBlockWithoutTitle() {
  return <CodeBlock html={html} className="w-full max-w-lg" />
}
