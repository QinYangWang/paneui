import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Stops iOS from zooming into small text fields on focus.", "zh": "防止聚焦小字号输入框时自动放大。"},
  usage: {
    imports: `import { IosZoomLock } from "@/components/ui/ios-zoom-lock"`,
    code: `// app/layout.tsx
<body>
  <IosZoomLock />
  {children}
</body>`,
  },
  examples: [
    {
      id: "scoped",
      title: { en: "Scoped", zh: "局部生效" },
    },
  ],
  notes: [
    {
      title: "Why",
      body: { en: "Fields keep the 13px control text on phones. iOS and iPadOS Safari zoom into a focused field whose text is under 16px and stay zoomed after it loses focus. This is the recommended fix when that zoom gets in the way; `max-md:text-base` on a field is the alternative when you'd rather have 16px text on phones.", zh: "字段在手机上保持 13px 的控制文本。iOS 和 iPadOS Safari 会放大聚焦的字段，如果其文本小于 16px，并在失去焦点后保持放大。当这种缩放造成妨碍时，这是推荐的修复方法；如果你更希望在手机上使用 16px 文本，字段上的 `max-md:text-base` 是替代方案。" },
    },
    {
      title: "How it works",
      body: { en: "When an input, textarea, select or contenteditable element gets focus, the viewport meta gains `maximum-scale=1` (an existing `maximum-scale` is replaced). When focus leaves text entry, the meta gets its original `content` back exactly. Moving from one field to the next keeps the lock, so the meta doesn't flicker. Buttons, checkboxes, radios, ranges, file and colour inputs don't lock.", zh: "当输入框、文本域、选择框或 contenteditable 元素获得焦点时，视口 meta 增加 `maximum-scale=1`（已有的 `maximum-scale` 被替换）。当焦点离开文本输入时，meta 精确恢复其原始 `content`。从一个字段移到下一个会保持锁定，因此 meta 不会闪烁。按钮、复选框、单选按钮、范围、文件和颜色输入不会锁定。" },
    },
    {
      title: "Pinch zoom",
      body: { en: "Outside a focused field the viewport is untouched, so pinch zoom works as before. Safari still allows pinch zoom while a field is focused, since it ignores `maximum-scale` for gestures; a home-screen web app honours it, so there pinch zoom waits until the field loses focus.", zh: "在聚焦字段之外，视口不受影响，因此双指缩放照常工作。Safari 在字段聚焦时仍允许双指缩放，因为它对手势忽略 `maximum-scale`；主屏幕 Web 应用会遵守它，因此在那里双指缩放要等到字段失去焦点。" },
    },
    {
      title: "Devices",
      body: { en: "Off by default and imported by nothing else. It runs only on iPhone, iPad and iPod, including iPads that report a desktop Mac user agent (`MacIntel` with more than one touch point). `devices=\"touch\"` adds every coarse pointer; other browsers don't zoom on focus, so this is rarely needed.", zh: "默认关闭，且不被其他任何东西导入。它仅在 iPhone、iPad 和 iPod 上运行，包括报告桌面 Mac 用户代理的 iPad（`MacIntel` 且多于一个触摸点）。`devices=\"touch\"` 添加每个粗略指针；其他浏览器不会在聚焦时缩放，因此很少需要。" },
    },
    {
      title: "Edge cases",
      body: { en: "Everything runs in effects, so server rendering is unaffected. Without a viewport meta, a temporary one is added while a field is focused and removed afterwards. Several mounted locks share one listener set, and the original content comes back when the last one unmounts or its `enabled` turns off, focused or not. A field removed while focused fires no blur; the next touch restores the meta.", zh: "一切都在 effect 中运行，因此服务端渲染不受影响。没有视口 meta 时，在字段聚焦期间添加一个临时 meta，之后移除。多个挂载的锁共享一组监听器，当最后一个卸载或其 `enabled` 关闭时，原始内容会恢复，无论是否聚焦。聚焦时移除的字段不会触发 blur；下一次触摸会恢复 meta。" },
    },
  ],
  api: [
    {
      name: "IosZoomLock",
      description: { en: "Runs `useIosInputZoomLock` and renders nothing. Mount it once in a layout, a form or a sheet.", zh: "运行 `useIosInputZoomLock` 且不渲染任何内容。在布局、表单或 sheet 中挂载一次。" },
      props: [
        { name: "enabled", type: "boolean", default: "true", description: { en: "Turns the lock off without unmounting.", zh: "关闭锁定而不卸载。" } },
        { name: "devices", type: '"ios" | "touch"', default: '"ios"', description: { en: "`touch` also locks on any coarse pointer.", zh: "`touch` 也会在任何粗略指针上锁定。" } },
      ],
    },
    {
      name: "useIosInputZoomLock",
      description: { en: "`useIosInputZoomLock({ enabled, devices })` with the same options, for a component that already owns the state.", zh: "`useIosInputZoomLock({ enabled, devices })` 使用相同选项，适用于已拥有该状态的组件。" },
      props: [],
    },
    { name: "isIosDevice", description: { en: "True on iPhone, iPad and iPod, including iPadOS with a desktop user agent. Call it in an effect.", zh: "在 iPhone、iPad 和 iPod 上为 true，包括使用桌面用户代理的 iPadOS。在 effect 中调用它。" }, props: [] },
    { name: "withMaximumScale", description: { en: "Returns viewport content with `maximum-scale=1`, keeping the other directives in order.", zh: "返回带有 `maximum-scale=1` 的视口内容，保持其他指令顺序。" }, props: [] },
  ],
} satisfies ComponentDoc
