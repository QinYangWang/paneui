import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { GeneratedAvatar } from "@/components/ui/generated-avatar"
import { AvatarGenerator } from "@/components/ui/avatar-generator"`,
    code: `<GeneratedAvatar seed={user.id} gender="female" size="lg" title={user.name} />`,
  },
  composition: `GeneratedAvatar        Avatar frame + drawing
GeneratedAvatarImage   bare <svg>, e.g. inside AvatarFallback
createGeneratedAvatar  no React: SVG string, data URI, resolved parts
AvatarGenerator        editor: seed, gender, style, part pickers, download, copy`,
  examples: [
    {
      id: "by-seed",
      title: "From a Seed",
      description: "Pass anything stable (a user id, an email). The same seed always draws the same avatar, on the server or the client.",
    },
    {
      id: "gender",
      title: "Male and Female",
      description:
        "`gender` limits hair to one presentation: `male` draws buzz, side part, messy or curly short; `female` draws bob, long straight, bun, ponytail or wavy. Eyes, mouths, tops and skin are shared, and the bow is female-only. `any` (the default) picks from every hairstyle.",
    },
    {
      id: "options",
      title: "Options",
      description:
        "`variant=\"smooth\"` swaps the hand-inked default for clean vector lines; `accessories` lets the seed add a beanie, bow or cowlick; `selections` pins any part (eyes, mouth, top, skin tone); `blush`, `background` (`tint`, `circle`, `none` or a hex) and `colors` fine-tune the drawing.",
    },
    {
      id: "generator",
      title: "Generator",
      description:
        "`AvatarGenerator` is the editor: type or shuffle a seed, pick a gender, a style (sketch or smooth) and parts, then download the SVG or copy the JSX. `onValueChange` hands you the state to store.",
    },
  ],
  notes: [
    {
      title: "Sketch and smooth",
      body: "The default `sketch` variant inks every line by hand, in code: each outline becomes a pen stroke that is thin where it lands and lifts and fuller on curves, every edge gets a seeded low-frequency wobble, closed shapes overshoot or stop short of where they started, faces are slightly lopsided, hair ends flick out and carries a few sheen strands, and eyes and cheeks are uneven blobs. The wobble comes from the seed, so the same seed draws the identical SVG on the server and the client. Under 40px `GeneratedAvatar` switches to `detail=\"simple\"` (no strands, a calmer hand) so small avatars stay crisp; set `detail` yourself to override, or when using `GeneratedAvatarImage` / `createGeneratedAvatar` at small sizes. `variant=\"smooth\"` draws the same parts as clean vector paths.",
    },
    {
      title: "Parts",
      body: "Every avatar is drawn in code on one 64×64 grid with one stroke weight, after Seline's logo: black hair mass, white face, black outline, pink cheeks, dot eyes. Slots: hair (`buzz`, `side-part`, `messy`, `curly`, `bob`, `long`, `bun`, `ponytail`, `wavy`), eyes (`dots`, `happy`, `sleepy`, `glasses`), mouth (`smile`, `none`, `flat`, `open`, `cat`), top (`crew`, `turtleneck`, `collar`), skin (`white`, `porcelain`, `peach`, `tan`, `brown`, `deep`) and accessory (`none`, `beanie`, `bow`, `cowlick`). The seed never changes skin; it stays white unless you pick a tone. No artwork package, nothing fetched at runtime.",
    },
    {
      title: "Storing an avatar",
      body: "Store the seed when the avatar can be regenerated from the user. When the user edits it, store `{ seed, gender, selections, accessories, variant }` from `onValueChange`. Adding parts in a later version can change seed-only picks, so pin explicit `selections` for avatars that must never change.",
    },
    {
      title: "Dark mode",
      body: "The default `tint` background stays light in both themes so black hair never disappears into a dark page. Use `background=\"none\"` only on light surfaces.",
    },
  ],
  api: [
    {
      name: "GeneratedAvatar",
      description: "A seeded avatar inside the library's `Avatar` frame. Children (e.g. `AvatarStatus`) render on top.",
      extends: "Avatar",
      props: [
        { name: "seed", type: "string", required: true, description: "Any stable string." },
        { name: "gender", type: `"male" | "female" | "any"`, default: `"any"`, description: "Which hairstyles (and accessories) the seed picks from." },
        { name: "size", type: `"xs" | "sm" | "md" | "lg" | "xl" | number`, default: `"md"`, description: "An Avatar size or a pixel size. Inside an `AvatarGroup` it follows the group." },
        { name: "shape", type: `"circle" | "rounded"`, default: `"circle"`, description: "Passed to `Avatar`." },
        { name: "variant", type: `"sketch" | "smooth"`, default: `"sketch"`, description: "Hand-inked pen lines, or clean vector lines." },
        { name: "detail", type: `"full" | "simple"`, description: "Sketch only. `simple` drops hair strands and calms the wobble. Defaults to `simple` under 40px, else `full`." },
        { name: "accessories", type: "boolean", default: "false", description: "Let the seed pick a beanie, bow or cowlick. Off keeps the clean look." },
        { name: "blush", type: "boolean", default: "true", description: "Pink cheeks." },
        { name: "background", type: `"tint" | "circle" | "none" | string`, default: `"tint"`, description: "Warm light grey square, the same tint as a disc, transparent, or a hex colour." },
        { name: "selections", type: `{ hair?, eyes?, mouth?, top?, skin?, accessory?: string }`, description: "Explicit part per slot by name (`{ hair: \"bun\", eyes: \"glasses\" }`). Overrides the seed; the Parts note lists the names." },
        { name: "colors", type: `{ hair?, stroke?, skin?, blush?, background?: string }`, description: "Hex colours: hair, outline and features, skin (overrides the tone), cheeks, background tint." },
        { name: "title", type: "string", description: "Accessible name. Without it the avatar is decorative." },
      ],
    },
    {
      name: "GeneratedAvatarImage",
      description: "The drawing alone as an `<svg>` that fills its box. Same options as `GeneratedAvatar` minus size and shape; `detail` defaults to `full` since it can't see its size.",
      extends: "svg",
      props: [],
    },
    {
      name: "createGeneratedAvatar",
      description: "Framework-free builder. Returns `{ selections, viewBox, content, toString(size?), toDataUri(size?) }`.",
      props: [{ name: "options", type: "GeneratedAvatarOptions", required: true, description: "Same options as `GeneratedAvatar` (seed, gender, variant, detail, accessories, blush, background, selections, colors). `detail` defaults to `full` here." }],
    },
    {
      name: "getAvatarParts",
      description: "The parts a slot offers for a gender, for building your own pickers. Only hair and accessories differ by gender.",
      props: [
        { name: "slot", type: `"hair" | "eyes" | "mouth" | "top" | "skin" | "accessory"`, required: true, description: "Returns `{ name, label, gender? }[]`." },
        { name: "gender", type: `"male" | "female" | "any"`, default: `"any"`, description: "" },
      ],
    },
    {
      name: "AvatarGenerator",
      description: "The editor UI.",
      extends: "div",
      props: [
        { name: "defaultSeed", type: "string", default: `"qinyang"`, description: "Initial seed." },
        { name: "defaultGender", type: `"male" | "female" | "any"`, default: `"any"`, description: "Initial gender." },
        { name: "defaultVariant", type: `"sketch" | "smooth"`, default: `"sketch"`, description: "Initial style." },
        { name: "onValueChange", type: "(state: { seed, gender, selections, accessories, variant }) => void", description: "Called on every change; store it to redraw the same avatar with `GeneratedAvatar`." },
      ],
    },
  ],
} satisfies ComponentDoc
