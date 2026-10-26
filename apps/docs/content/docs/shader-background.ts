import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Animated backdrop for hero sections and empty states.", "zh": "为页面提供动态背景。"},
  usage: {
    imports: `import { ShaderBackground } from "@/components/ui/shader-background"`,
    code: `<ShaderBackground className="h-64 rounded-3xl p-6">
  <h2>Your week, handled</h2>
</ShaderBackground>`,
  },
  examples: [
    {
      id: "custom-colors",
      title: { en: "Custom Colors", zh: "自定义颜色" },
      description: { en: "Use to match a brand palette instead of the theme.", zh: "适用于需要使用品牌色板的场景。" },
    },
    {
      id: "random-colors",
      title: { en: "Random Colors", zh: "随机颜色" },
      description: { en: "Use for one-off covers and headers that don't need a brand palette.", zh: "适用于不需要品牌色的封面和页头。" },
    },
    {
      id: "paused",
      title: { en: "Speed and Paused", zh: "速度与暂停" },
    },
    {
      id: "shader-props",
      title: { en: "Shader Props", zh: "着色器属性" },
      description: { en: "Use to tune a shader beyond the built-in props.", zh: "适用于需要进一步调整着色器的场景。" },
    },
  ],
  notes: [
    {
      title: "Motion",
      body: { en: "The animation stops under reduced motion and whenever the element is off screen. `waves` is a static pattern and ignores `speed`.", zh: "在减少动态效果下以及元素离开屏幕时动画停止。`waves` 是静态图案，忽略 `speed`。" },
    },
  ],
  api: [
    {
      name: "ShaderBackground",
      description: { en: "A WebGL shader layer behind its children, coloured from your theme tokens by default.", zh: "位于其子元素后面的 WebGL 着色器层，默认使用主题变量着色。" },
      extends: "div",
      props: [
        {
          name: "variant",
          type: `"mesh-gradient" | "grain-gradient" | "warp" | "waves" | "dot-orbit"`,
          default: `"mesh-gradient"`,
          description: { en: "Which shader to render.", zh: "要渲染的着色器。" },
        },
        {
          name: "colors",
          type: 'string[] | "random"',
          description: { en: "Any CSS colours, including `var(--token)` and `color-mix(...)`, re-read when the theme changes. `\"random\"` picks a matching set. Defaults to tints of `--primary` and `--background`; `waves` uses only the first colour.", zh: "任意 CSS 颜色，包括 `var(--token)` 和 `color-mix(...)`，在主题变化时重新读取。`\"random\"` 会选择一个匹配的集合。默认为 `--primary` 和 `--background` 的色调；`waves` 仅使用第一个颜色。" },
        },
        { name: "seed", type: "string", description: { en: "Makes `colors=\"random\"` repeatable; without it the palette changes on every mount.", zh: "使 `colors=\"random\"` 可重复；没有它，调色板会在每次挂载时改变。" } },
        { name: "colorBack", type: "string", default: `"var(--background)"`, description: { en: "Base colour behind the pattern (grain, waves, dot orbit).", zh: "图案后面的基础颜色（grain、waves、dot orbit）。" } },
        { name: "speed", type: "number", default: "0.6", description: { en: "Animation speed. `0` freezes the current frame.", zh: "动画速度。`0` 冻结当前帧。" } },
        { name: "paused", type: "boolean", default: "false", description: { en: "Freeze the animation.", zh: "冻结动画。" } },
        {
          name: "shaderProps",
          type: "Partial<MeshGradientProps | GrainGradientProps | WarpProps | WavesProps | DotOrbitProps>",
          description: { en: "Extra props for the chosen shader, matched to `variant`. `speed` is always controlled by the component.", zh: "所选着色器的额外 props，与 `variant` 匹配。`speed` 始终由组件控制。" },
        },
        { name: "shaderClassName", type: "string", description: { en: "Class for the shader layer (e.g. opacity or blend mode).", zh: "着色器层的 class（例如透明度或混合模式）。" } },
      ],
      dataAttributes: [
        { name: "data-variant", description: { en: "The active variant.", zh: "当前活动的 variant。" } },
        { name: "data-paused", description: { en: "Present while the animation is frozen (paused, off screen or reduced motion).", zh: "动画冻结时存在（暂停、离开屏幕或减少动态效果）。" } },
      ],
    },
  ],
} satisfies ComponentDoc
