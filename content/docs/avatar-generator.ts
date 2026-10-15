import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { GeneratedAvatar } from "@/components/ui/generated-avatar"
import { AvatarGenerator } from "@/components/ui/avatar-generator"`,
    code: `<GeneratedAvatar seed={user.id} gender="female" size="lg" title={user.name} />`,
  },
  composition: `GeneratedAvatar        Avatar frame + illustrated drawing
GeneratedAvatarImage   bare <svg>, e.g. inside AvatarFallback
createGeneratedAvatar  no React: SVG string, data URI, resolved parts
AvatarGenerator        editor: seed, gender, part pickers, download, copy`,
  examples: [
    {
      id: "by-seed",
      title: "From a Seed",
      description: "Use a stable seed, like a user id, so a person gets the same avatar everywhere.",
    },
    {
      id: "gender",
      title: "Male and Female",
      description:
        "Use `gender` when the avatar should match the person's stated gender.",
    },
    {
      id: "options",
      title: "Options",
      description:
        "Use `selections` to pin parts the seed shouldn't choose, and `\"none\"` to turn off glasses, beard or gesture.",
    },
    {
      id: "generator",
      title: "Generator",
      description:
        "Use `AvatarGenerator` when people design their own avatar, storing the state from `onValueChange`.",
    },
  ],
  notes: [
    {
      title: "Artwork and licence",
      body: "The illustrations and the renderer install with the component as two packages; nothing is fetched at runtime. The licence metadata block is stripped from the SVG output; credits for the art and the renderer are in `THIRD_PARTY_NOTICES.md`.",
    },
    {
      title: "Parts",
      body: "Part names follow the drawing set, with hair `variant01`…`variant63` plus `hat`, eyes `variant01`…`05`, brows `01`…`13`, lips `01`…`30`, nose `01`…`20`, glasses `01`…`11`, beard `01`…`12`, body (the top) `01`…`25`, and gesture `waveLongArms`, `waveLongArm`, `wavePointLongArms`, `waveOkLongArms`, `pointLongArm`, `okLongArm`, `handPhone`. Use `getAvatarParts(slot, gender)` for the list with labels. Gestures are off unless picked; the set's `point`, `ok` and `hand` are left out because the closer crop hides the hand.",
    },
    {
      title: "Small sizes and ids",
      body: "The drawings are busts; the avatar is zoomed in (`scale` 135, `translateY` 8) so the face still reads at `xs`/`sm` (20–24px). Every id inside the SVG (the clip mask, some tops) is prefixed. `GeneratedAvatar` and `GeneratedAvatarImage` use React's `useId`, `createGeneratedAvatar` a hash of the options (or your `idPrefix`), so any number of avatars, identical ones included, can share a page without one borrowing another's mask, and the markup is the same on the server and the client.",
    },
    {
      title: "Storing an avatar",
      body: "Store the seed when the avatar can be regenerated from the user. When the user edits it, store `{ seed, gender, selections, accessories }` from `onValueChange`. A future release of the drawing set that adds parts can change seed-only picks, so pin explicit `selections` for avatars that must never change.",
    },
    {
      title: "Generator width",
      body: "`AvatarGenerator` lays out by its own width, not the screen's: stacked below 36rem, preview beside the controls from there. Size it with `className` (it fills its parent up to `max-w-2xl`).",
    },
    {
      title: "Dark mode",
      body: "The line art is black on white faces, so the default `tint` background stays light in both themes. Use `background=\"none\"` only on light surfaces.",
    },
  ],
  api: [
    {
      name: "GeneratedAvatar",
      description: "A seeded illustrated avatar inside the library's `Avatar` frame. Children (e.g. `AvatarStatus`) render on top.",
      extends: "Avatar",
      props: [
        { name: "seed", type: "string", required: true, description: "Any stable string." },
        { name: "gender", type: `"male" | "female" | "any"`, default: `"any"`, description: "Which hairstyles the seed picks from. `female` has 22 (long hair, bobs, buns, ponytails, headscarves) and never a beard; `male` has 35 short cuts and allows a beard; `any` uses all 64." },
        { name: "size", type: `"xs" | "sm" | "md" | "lg" | "xl" | number`, default: `"md"`, description: "An Avatar size or a pixel size. Inside an `AvatarGroup` it follows the group." },
        { name: "shape", type: `"circle" | "rounded"`, default: `"circle"`, description: "Passed to `Avatar`." },
        { name: "accessories", type: "boolean", default: "false", description: "Let the seed add glasses (about one in three)." },
        { name: "background", type: `"tint" | "circle" | "none" | string`, default: `"tint"`, description: "`tint` is a light grey square, `circle` the same tint as a disc, `none` transparent, or pass a hex colour." },
        { name: "selections", type: `{ hair?, eyes?, brows?, lips?, nose?, glasses?, beard?, body?, gesture?: string }`, description: "Explicit part per slot by name (`{ hair: \"variant46\", glasses: \"none\" }`). Overrides the seed; the Parts note lists the names." },
        { name: "colors", type: `{ background?: string }`, description: "Hex colour for the background tint." },
        { name: "idPrefix", type: "string", description: "Prefix for ids inside the SVG. Defaults to one from `useId` (a hash of the options in `createGeneratedAvatar`)." },
        { name: "title", type: "string", description: "Accessible name. Without it the avatar is decorative." },
      ],
    },
    {
      name: "GeneratedAvatarImage",
      description: "The drawing alone as an `<svg>` that fills its box. Same options as `GeneratedAvatar` minus size and shape.",
      extends: "svg",
      props: [],
    },
    {
      name: "createGeneratedAvatar",
      description: "Framework-free builder. Returns `{ selections, viewBox, content, toString(size?), toDataUri(size?) }`; `selections` is the part each slot ended up with (`\"none\"` for an empty optional slot).",
      props: [{ name: "options", type: "GeneratedAvatarOptions", required: true, description: "Same options as `GeneratedAvatar` (seed, gender, accessories, background, selections, colors)." }],
    },
    {
      name: "getAvatarParts",
      description: "The parts a slot offers for a gender, for building your own pickers. Only hair differs by gender (and beard is empty for `female`); glasses, beard and gesture start with `none`.",
      props: [
        { name: "slot", type: `"hair" | "eyes" | "brows" | "lips" | "nose" | "glasses" | "beard" | "body" | "gesture"`, required: true, description: "Returns `{ name, label, gender? }[]`." },
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
        { name: "onValueChange", type: "(state: { seed, gender, selections, accessories }) => void", description: "Called on every change; store it to redraw the same avatar with `GeneratedAvatar`." },
      ],
    },
  ],
} satisfies ComponentDoc
