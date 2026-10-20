import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Shows brand logos.", "zh": "显示品牌标志。"},
  usage: {
    imports: `import { siGithub } from "simple-icons"

import { BrandIcon } from "@/components/ui/brand-icon"`,
    code: `<BrandIcon icon={siGithub} />`,
  },
  examples: [
    { id: "colors", title: { en: "Colors", zh: "颜色" },  },
    { id: "sizes", title: { en: "Sizes", zh: "尺寸" } },
    { id: "sign-in", title: { en: "Sign-in Buttons", zh: "登录按钮" } },
    { id: "integrations", title: { en: "Integrations", zh: "集成" } },
    { id: "own-marks", title: { en: "Your Own Marks", zh: "自定义标志" }, description: { en: "Use for a brand the package leaves out, or for your own product.", zh: "适用于自己的产品或图标集中没有的品牌。" } },
  ],
  notes: [
    {
      title: "Bundle size",
      body: "Import each logo by name (`import { siGithub } from \"simple-icons\"`). The package is marked side-effect free, so only the logos you import reach the bundle. Avoid `import * as icons` and slug lookups in app code: the full set is several megabytes.",
    },
    {
      title: "Brands that are not in the package",
      body: "Brands whose owners asked for removal or never gave permission are not in the package: Microsoft and its products (Teams, Outlook, Azure, VS Code, LinkedIn, Xbox), Amazon and AWS, OpenAI, Salesforce and Slack, Adobe, Oracle and Java, IBM, Twilio and Yahoo, among others. Use the brand's own asset under its guidelines, or a neutral glyph from the icon set (the templates use one for the Codex agent)",
    },
    {
      title: "Dark marks",
      body: "With `color=\"brand\"`, near-black logos (GitHub, Vercel, X) switch to the foreground colour in dark mode and near-white ones do the same in light mode, so no logo disappears on either theme.",
    },
    {
      title: "Trademarks",
      body: "The logos belong to their owners. Showing one says which service a feature connects to; it does not imply endorsement. Check each brand's guidelines before using its colour or mark more prominently.",
    },
    {
      title: "Accessibility",
      body: "Without `title` the logo is hidden from assistive tech, which is right when a visible name sits next to it. Pass `title` for a logo that stands alone.",
    },
  ],
  api: [
    {
      name: "BrandIcon",
      description: "One brand logo on the icon set's grid.",
      extends: "svg",
      props: [
        { name: "icon", type: "{ title: string; path: string; hex?: string }", required: true, description: "An icon object from the package, or your own 24×24 mark in the same shape." },
        { name: "color", type: `"current" | "brand"`, default: `"current"`, description: "Follow the text colour, or paint the brand's colour." },
        { name: "size", type: "number", default: "18", description: "Pixel size. Buttons, menus and icon chips size their icons themselves." },
        { name: "title", type: "string", description: "Accessible name for a logo without a visible label." },
        { name: "inset", type: "boolean", default: "true", description: "Keep the icon set's 2px margin so logos sit at the same optical size as icons." },
      ],
      dataAttributes: [{ name: "data-brand", description: "The brand's name, for styling or tests." }],
    },
  ],
} satisfies ComponentDoc
