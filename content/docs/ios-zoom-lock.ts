import type { ComponentDoc } from "@/lib/doc-types"

export default {
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
      title: "Scoped",
      description: "Use the hook with `enabled` when only one screen, such as a reply sheet, needs it.",
    },
  ],
  notes: [
    {
      title: "Why",
      body: "Fields keep the 13px control text on phones. iOS and iPadOS Safari zoom into a focused field whose text is under 16px and stay zoomed after it loses focus. This is the recommended fix when that zoom gets in the way; `max-md:text-base` on a field is the alternative when you'd rather have 16px text on phones.",
    },
    {
      title: "How it works",
      body: "When an input, textarea, select or contenteditable element gets focus, the viewport meta gains `maximum-scale=1` (an existing `maximum-scale` is replaced). When focus leaves text entry, the meta gets its original `content` back exactly. Moving from one field to the next keeps the lock, so the meta doesn't flicker. Buttons, checkboxes, radios, ranges, file and colour inputs don't lock.",
    },
    {
      title: "Pinch zoom",
      body: "Outside a focused field the viewport is untouched, so pinch zoom works as before. Safari still allows pinch zoom while a field is focused, since it ignores `maximum-scale` for gestures; a home-screen web app honours it, so there pinch zoom waits until the field loses focus.",
    },
    {
      title: "Devices",
      body: "Off by default and imported by nothing else. It runs only on iPhone, iPad and iPod, including iPads that report a desktop Mac user agent (`MacIntel` with more than one touch point). `devices=\"touch\"` adds every coarse pointer; other browsers don't zoom on focus, so this is rarely needed.",
    },
    {
      title: "Edge cases",
      body: "Everything runs in effects, so server rendering is unaffected. Without a viewport meta, a temporary one is added while a field is focused and removed afterwards. Several mounted locks share one listener set, and the original content comes back when the last one unmounts or its `enabled` turns off, focused or not. A field removed while focused fires no blur; the next touch restores the meta.",
    },
  ],
  api: [
    {
      name: "IosZoomLock",
      description: "Runs `useIosInputZoomLock` and renders nothing. Mount it once in a layout, a form or a sheet.",
      props: [
        { name: "enabled", type: "boolean", default: "true", description: "Turns the lock off without unmounting." },
        { name: "devices", type: '"ios" | "touch"', default: '"ios"', description: "`touch` also locks on any coarse pointer." },
      ],
    },
    {
      name: "useIosInputZoomLock",
      description: "`useIosInputZoomLock({ enabled, devices })` with the same options, for a component that already owns the state.",
      props: [],
    },
    { name: "isIosDevice", description: "True on iPhone, iPad and iPod, including iPadOS with a desktop user agent. Call it in an effect.", props: [] },
    { name: "withMaximumScale", description: "Returns viewport content with `maximum-scale=1`, keeping the other directives in order.", props: [] },
  ],
} satisfies ComponentDoc
