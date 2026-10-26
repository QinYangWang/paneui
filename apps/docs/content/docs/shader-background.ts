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
      body: "The animation stops under reduced motion and whenever the element is off screen. `waves` is a static pattern and ignores `speed`.",
    },
  ],
  api: [
    {
      name: "ShaderBackground",
      description: "A WebGL shader layer behind its children, coloured from your theme tokens by default.",
      extends: "div",
      props: [
        {
          name: "variant",
          type: `"mesh-gradient" | "grain-gradient" | "warp" | "waves" | "dot-orbit"`,
          default: `"mesh-gradient"`,
          description: "Which shader to render.",
        },
        {
          name: "colors",
          type: 'string[] | "random"',
          description: "Any CSS colours, including `var(--token)` and `color-mix(...)`, re-read when the theme changes. `\"random\"` picks a matching set. Defaults to tints of `--primary` and `--background`; `waves` uses only the first colour.",
        },
        { name: "seed", type: "string", description: "Makes `colors=\"random\"` repeatable; without it the palette changes on every mount." },
        { name: "colorBack", type: "string", default: `"var(--background)"`, description: "Base colour behind the pattern (grain, waves, dot orbit)." },
        { name: "speed", type: "number", default: "0.6", description: "Animation speed. `0` freezes the current frame." },
        { name: "paused", type: "boolean", default: "false", description: "Freeze the animation." },
        {
          name: "shaderProps",
          type: "Partial<MeshGradientProps | GrainGradientProps | WarpProps | WavesProps | DotOrbitProps>",
          description: "Extra props for the chosen shader, matched to `variant`. `speed` is always controlled by the component.",
        },
        { name: "shaderClassName", type: "string", description: "Class for the shader layer (e.g. opacity or blend mode)." },
      ],
      dataAttributes: [
        { name: "data-variant", description: "The active variant." },
        { name: "data-paused", description: "Present while the animation is frozen (paused, off screen or reduced motion)." },
      ],
    },
  ],
} satisfies ComponentDoc
