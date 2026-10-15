import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { ShaderBackground } from "@/components/ui/shader-background"`,
    code: `<ShaderBackground className="h-64 rounded-3xl p-6">
  <h2>Your week, handled</h2>
</ShaderBackground>`,
  },
  examples: [
    {
      id: "custom-colors",
      title: "Custom Colors",
      description: "Use to match a brand palette instead of the theme.",
    },
    {
      id: "paused",
      title: "Speed and Paused",
      description: "Use `paused` or a lower `speed` behind content that needs a calm backdrop.",
    },
    {
      id: "shader-props",
      title: "Shader Props",
      description: "Use to tune a shader beyond the built-in props.",
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
          type: "string[]",
          description: "Any CSS colours, including `var(--token)` and `color-mix(...)`, re-read when the theme changes. Defaults to tints of `--primary` and `--background`; `waves` uses only the first colour.",
        },
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
