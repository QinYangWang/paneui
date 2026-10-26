import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Creates page share images.", "zh": "生成页面分享图片。"},
  usage: {
    imports: `import { ImageResponse } from "next/og"
import { OgImage, ogImageContentType, ogImageSize } from "@/components/ui/og-image"`,
    code: `// app/opengraph-image.tsx
export const alt = "Field Notes"
export const size = ogImageSize
export const contentType = ogImageContentType

export default async function Image() {
  return new ImageResponse(
    <OgImage title="Field Notes" description="Essays on interface density." siteName="Field Notes" fontFamily="Inter" />,
    { ...size, fonts }
  )
}`,
  },
  examples: [
    { id: "modes", title: { en: "Accents and Modes", zh: "主题色与模式" },  },
    { id: "image", title: { en: "Background", zh: "背景" }, description: { en: "Use a photo or your own palette behind the title.", zh: "标题背后放图片或自定义配色时使用。" } },
    { id: "cover-art", title: { en: "Cover Art", zh: "封面" },  },
    { id: "cjk", title: { en: "CJK Titles", zh: "中日韩文标题" } },
  ],
  notes: [
    {
      title: "Route files",
      body: { en: "`npx shadcn@latest add @paneui/og-image-route` writes `app/opengraph-image.tsx` and `app/twitter-image.tsx`; edit the `SITE` object at the top. Next.js links the image from every page under that folder and renders it at build time. `@paneui/og-image-post-route` writes `app/blog/[slug]/opengraph-image.tsx`, which reads `params` and colours the backdrop from the slug, matching `CoverArt` on the page. For several images in one route, export `generateImageMetadata` and read `id` in the image function.", zh: "`npx shadcn@latest add @paneui/og-image-route` 写入 `app/opengraph-image.tsx` 和 `app/twitter-image.tsx`；编辑顶部的 `SITE` 对象。Next.js 从该文件夹下的每个页面链接该图像，并在构建时渲染。`@paneui/og-image-post-route` 写入 `app/blog/[slug]/opengraph-image.tsx`，它读取 `params` 并根据 slug 为背景着色，与页面上的 `CoverArt` 匹配。对于一条路由中的多个图像，导出 `generateImageMetadata` 并在图像函数中读取 `id`。" },
    },
    {
      title: "Static export",
      body: { en: "With `output: \"export\"`, `opengraph-image` is written without an extension, and some static hosts then serve it as a download, which share previews ignore. Render the image from a route handler at `app/og.png/route.tsx` instead (a `GET` that returns the `ImageResponse`, with `dynamic = \"force-static\"`), and list `/og.png` in `metadata.openGraph.images`; metadata URLs don't get `basePath`, so prefix it yourself.", zh: "使用 `output: \"export\"` 时，`opengraph-image` 写入时没有扩展名，一些静态主机随后将其作为下载提供，分享预览会忽略。改为在 `app/og.png/route.tsx` 的路由处理器中渲染图像（一个返回 `ImageResponse` 的 `GET`，带有 `dynamic = \"force-static\"`），并在 `metadata.openGraph.images` 中列出 `/og.png`；元数据 URL 不会获得 `basePath`，所以自己加上前缀。" },
    },
    {
      title: "Rendering",
      body: { en: "The renderer behind `ImageResponse` lays out flexbox and absolute positioning only, with inline styles: no grid, classes, hooks, context or browser APIs. Every text box has a fixed size, and fades end on the same colour at alpha 0, since `transparent` blends through black there. Set `metadataBase` in the root layout so the image URL is absolute.", zh: "`ImageResponse` 背后的渲染器只布局 flexbox 和绝对定位，使用内联样式：没有 grid、类、hooks、context 或浏览器 API。每个文本框都有固定大小，淡出以相同颜色在 alpha 0 结束，因为 `transparent` 在那里混合通过黑色。在根布局中设置 `metadataBase`，以便图像 URL 是绝对的。" },
    },
    {
      title: "Fonts",
      body: { en: "The renderer reads `.ttf`, `.otf` and `.woff`, not `.woff2`. Load each weight with `readFile` from your repo, or fetch a subset from a font service with `text=` (a non-browser client gets TrueType back), and pass the family name as `fontFamily`; the route template does the fetch and falls back to the built-in font when it fails. A full CJK font is over 10 MB, so load only the characters on the image, plus `·` and `…`.", zh: "渲染器读取 `.ttf`、`.otf` 和 `.woff`，不读取 `.woff2`。使用仓库中的 `readFile` 加载每个字重，或使用 `text=` 从字体服务获取子集（非浏览器客户端得到 TrueType），并将家族名称作为 `fontFamily` 传递；路由模板执行获取，失败时回退到内置字体。完整的 CJK 字体超过 10 MB，所以只加载图像上的字符，加上 `·` 和 `…`。" },
    },
    {
      title: "Titles",
      body: { en: "The title is sized by length, counting CJK and full-width characters double: 80px up to 24, 68px up to 44, 56px up to 72 and 46px beyond. The two larger sizes clamp to two lines, the smaller to three; the description clamps to two. `ogImageTitleSize(title)` returns the size.", zh: "标题按长度调整大小，CJK 和全角字符计为双倍：24 以内为 80px，44 以内为 68px，72 以内为 56px，超过为 46px。两个较大的尺寸限制为两行，较小的限制为三行；描述限制为两行。`ogImageTitleSize(title)` 返回大小。" },
    },
    {
      title: "Colours",
      body: { en: "`OG_IMAGE_TOKENS` holds the theme's background, card, foreground, muted foreground, border and primary roles for every accent in both modes. It is generated from the theme, with translucent roles flattened over the background and wide-gamut values converted to sRGB, so a theme update reaches the image when you reinstall it. `colors` overrides single roles.", zh: "`OG_IMAGE_TOKENS` 保存主题的背景、卡片、前景、柔和前景、边框和主色角色，用于两种模式下每个主题色。它从主题生成，半透明角色在背景上展平，宽色域值转换为 sRGB，因此重新安装图像时主题更新会到达图像。`colors` 覆盖单个角色。" },
    },
    {
      title: "Images",
      body: { en: "`logo` (square, beside the site name) and `avatar` (round, beside the author) take a URL or a data URI of a PNG, JPEG or SVG; WebP is not supported. Both are decorative, so the route's `alt` export carries the title.", zh: "`logo`（方形，位于站点名称旁）和 `avatar`（圆形，位于作者旁）接受 PNG、JPEG 或 SVG 的 URL 或数据 URI；不支持 WebP。两者都是装饰性的，因此路由的 `alt` 导出携带标题。" },
    },
    {
      title: "Previews",
      body: { en: "The previews on this page draw the same components in the browser inside an SVG `foreignObject`, scaled from 1200 × 630.", zh: "此页面上的预览在浏览器内的 SVG `foreignObject` 中绘制相同的组件，从 1200 × 630 缩放。" },
    },
  ],
  api: [
    {
      name: "OgImage",
      props: [
        { name: "title", type: "string", required: true, description: { en: "Clamped to three lines and sized by length.", zh: "限制为三行并按长度调整大小。" } },
        { name: "siteName", type: "string", required: true, description: { en: "Shown at the top, beside `logo`.", zh: "显示在顶部，位于 `logo` 旁。" } },
        { name: "url", type: "string", description: { en: "Shown at the top right, such as the host and path.", zh: "显示在右上角，例如主机和路径。" } },
        { name: "description", type: "string", description: { en: "One or two lines under the title.", zh: "标题下方的一到两行。" } },
        { name: "author", type: "string", description: { en: "Shown in the footer, before `date`.", zh: "显示在页脚中，位于 `date` 之前。" } },
        { name: "avatar", type: "string", description: { en: "Round image beside the author.", zh: "作者旁的圆形图像。" } },
        { name: "logo", type: "string", description: { en: "Square image beside the site name.", zh: "站点名称旁的方形图像。" } },
        { name: "date", type: "string", description: { en: "Shown as given, so format it in the page's language.", zh: "按给定内容显示，因此使用页面语言格式化。" } },
        { name: "tags", type: "string[]", description: { en: "The first three are shown.", zh: "显示前三个。" } },
        { name: "accent", type: `"blue" | "neutral" | "green" | "orange" | "rose" | "violet"`, default: `"blue"`, description: { en: "The theme accent preset.", zh: "主题主题色预设。" } },
        { name: "mode", type: `"light" | "dark"`, default: `"light"`, description: { en: "The theme mode.", zh: "主题模式。" } },
        { name: "palette", type: `string[] | "random"`, description: { en: "Hex colours for the shader backdrop, or a random set. Defaults to the accent.", zh: "着色器背景的十六进制颜色，或随机集。默认为主题色。" } },
        { name: "seed", type: "string", description: { en: "Picks the random palette and layout. Defaults to `title`.", zh: "选择随机调色板和布局。默认为 `title`。" } },
        { name: "image", type: "string", description: { en: "Background image URL or data URI (PNG or JPEG) instead of the shader, under a wash that keeps text readable.", zh: "背景图像 URL 或数据 URI（PNG 或 JPEG）代替着色器，在保持文本可读的洗色下。" } },
        { name: "colors", type: "Partial<OgImageColors>", description: { en: "Overrides for single roles, on top of the accent and mode.", zh: "在主题色和模式之上覆盖单个角色。" } },
        { name: "fontFamily", type: "string", description: { en: "The family name the fonts were registered under.", zh: "字体注册时使用的家族名称。" } },
        { name: "style", type: "React.CSSProperties", description: { en: "Merged onto the root, for a background image or a renderer quirk.", zh: "合并到根上，用于背景图像或渲染器怪癖。" } },
      ],
      dataAttributes: [{ name: "data-slot", description: { en: "`og-image` on the root.", zh: "根上的 `og-image`。" } }],
    },
    {
      name: "OgCoverArt",
      description: { en: "Cover art for the same renderer: an image, or a still frame of the shader. The same `seed` gives the same colours as the in-page cover art.", zh: "同一渲染器的封面艺术：图像或着色器的静止帧。相同的 `seed` 给出与页面内封面艺术相同的颜色。" },
      props: [
        { name: "seed", type: "string", description: { en: "Keeps the random palette and layout stable.", zh: "保持随机调色板和布局稳定。" } },
        { name: "image", type: "string", description: { en: "Image URL or data URI drawn edge to edge. Wins over the shader.", zh: "边缘到边缘绘制的图像 URL 或数据 URI。优先于着色器。" } },
        { name: "palette", type: `string[] | "random"`, description: { en: "Hex colours, or a random set. Defaults to random with `seed`, else the accent.", zh: "十六进制颜色，或随机集。默认为带有 `seed` 的随机，否则为主题色。" } },
        { name: "accent", type: "OgImageAccent", default: `"blue"`, description: { en: "The theme accent preset.", zh: "主题主题色预设。" } },
        { name: "mode", type: `"light" | "dark"`, default: `"light"`, description: { en: "The theme mode.", zh: "主题模式。" } },
        { name: "width", type: "number", default: "1200", description: { en: "Width in px.", zh: "宽度，单位为 px。" } },
        { name: "height", type: "number", default: "630", description: { en: "Height in px.", zh: "高度，单位为 px。" } },
      ],
    },
    {
      name: "ogImageSize",
      description: { en: "The 1200 × 630 size, for the route's `size` export and the `ImageResponse` options. `ogImageContentType` is `\"image/png\"`.", zh: "1200 × 630 尺寸，用于路由的 `size` 导出和 `ImageResponse` 选项。`ogImageContentType` 为 `\"image/png\"`。" },
      props: [],
    },
    {
      name: "ogImageColors",
      description: { en: "`ogImageColors(accent, mode, overrides?)` returns the colours the card draws with.", zh: "`ogImageColors(accent, mode, overrides?)` 返回卡片绘制使用的颜色。" },
      props: [],
    },
    {
      name: "OG_IMAGE_TOKENS",
      description: { en: "The generated map, `OG_IMAGE_TOKENS[accent][mode]`, with `background`, `card`, `foreground`, `mutedForeground`, `border`, `primary`, `primaryForeground`, `primarySubtle` and `primaryBorder` as opaque hex.", zh: "生成的地图 `OG_IMAGE_TOKENS[accent][mode]`，其中 `background`、`card`、`foreground`、`mutedForeground`、`border`、`primary`、`primaryForeground`、`primarySubtle` 和 `primaryBorder` 为不透明十六进制。" },
      props: [],
    },
    {
      name: "ogImageTitleSize",
      description: { en: "`ogImageTitleSize(title)` returns the title's font size in px.", zh: "`ogImageTitleSize(title)` 返回标题的字体大小，单位为 px。" },
      props: [],
    },
  ],
} satisfies ComponentDoc
