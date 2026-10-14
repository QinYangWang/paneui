import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { GeneratedAvatar } from "@/components/ui/generated-avatar"
import { AvatarGenerator } from "@/components/ui/avatar-generator"`,
    code: `<GeneratedAvatar seed={user.id} gender="female" size="lg" title={user.name} />`,
  },
  composition: `GeneratedAvatar        Avatar frame + Notionists drawing
GeneratedAvatarImage   bare <svg>, e.g. inside AvatarFallback
createGeneratedAvatar  no React: SVG string, data URI, resolved parts
AvatarGenerator        editor: seed, gender, part pickers, download, copy`,
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
        "`gender` limits hair to a hand-picked split of the Notionists styles: `female` draws long hair, bobs, buns, ponytails and headscarves (22 styles); `male` draws short cuts, quiffs and spikes (35 styles) and allows a beard. `female` never gets a beard. `any` (the default) picks from all 64, including the unisex curls, cap, paper hat and head wrap.",
    },
    {
      id: "options",
      title: "Options",
      description:
        "`accessories` lets the seed add glasses; `selections` pins any part (`hair`, `eyes`, `brows`, `lips`, `nose`, `glasses`, `beard`, `body`, `gesture`), with `\"none\"` to turn off glasses, beard or gesture; `background` is `tint`, `circle`, `none` or a hex, and `colors.background` recolours the tint.",
    },
    {
      id: "generator",
      title: "Generator",
      description:
        "`AvatarGenerator` is the editor: type or shuffle a seed, pick a gender and parts, then download the SVG or copy the JSX. `onValueChange` hands you the state to store.",
    },
  ],
  notes: [
    {
      title: "Artwork and licence",
      body: "The drawings are [Notionists](https://heyzoish.gumroad.com/l/notionists) by Zoish, released under CC0 1.0 (public domain, no attribution required, credited anyway), rendered with [DiceBear](https://www.dicebear.com/styles/notionists/) (`@dicebear/core` and `@dicebear/notionists`, MIT). Both packages install with the component; nothing is fetched at runtime. DiceBear's `<metadata>` block is stripped from the output; the credit lives here and in `THIRD_PARTY_NOTICES.md`.",
    },
    {
      title: "Parts",
      body: "Part names are DiceBear's: hair `variant01`…`variant63` plus `hat`, eyes `variant01`…`05`, brows `01`…`13`, lips `01`…`30`, nose `01`…`20`, glasses `01`…`11`, beard `01`…`12`, body (the top) `01`…`25`, and gesture `waveLongArms`, `waveLongArm`, `wavePointLongArms`, `waveOkLongArms`, `pointLongArm`, `okLongArm`, `handPhone`. Use `getAvatarParts(slot, gender)` for the list with labels. Gestures are off unless picked; DiceBear's `point`, `ok` and `hand` are left out because the closer crop hides the hand.",
    },
    {
      title: "Small sizes and ids",
      body: "Notionists is drawn as a bust; the avatar is zoomed in (DiceBear `scale` 135, `translateY` 8) so the face still reads at `xs`/`sm` (20–24px). Every id inside the SVG (the clip mask, some tops) is prefixed: `GeneratedAvatar` and `GeneratedAvatarImage` use React's `useId`, `createGeneratedAvatar` a hash of the options (or your `idPrefix`), so any number of avatars, identical ones included, can share a page without one borrowing another's mask, and the markup is the same on the server and the client.",
    },
    {
      title: "Storing an avatar",
      body: "Store the seed when the avatar can be regenerated from the user. When the user edits it, store `{ seed, gender, selections, accessories }` from `onValueChange`. A future DiceBear release that adds parts can change seed-only picks, so pin explicit `selections` for avatars that must never change.",
    },
    {
      title: "Dark mode",
      body: "The line art is black on white faces, so the default `tint` background stays light in both themes. Use `background=\"none\"` only on light surfaces.",
    },
  ],
  api: [
    {
      name: "GeneratedAvatar",
      description: "A seeded Notionists avatar inside the library's `Avatar` frame. Children (e.g. `AvatarStatus`) render on top.",
      extends: "Avatar",
      props: [
        { name: "seed", type: "string", required: true, description: "Any stable string." },
        { name: "gender", type: `"male" | "female" | "any"`, default: `"any"`, description: "Which hairstyles the seed picks from; `female` also turns beards off." },
        { name: "size", type: `"xs" | "sm" | "md" | "lg" | "xl" | number`, default: `"md"`, description: "An Avatar size or a pixel size. Inside an `AvatarGroup` it follows the group." },
        { name: "shape", type: `"circle" | "rounded"`, default: `"circle"`, description: "Passed to `Avatar`." },
        { name: "accessories", type: "boolean", default: "false", description: "Let the seed add glasses (about one in three). Off keeps the clean look." },
        { name: "background", type: `"tint" | "circle" | "none" | string`, default: `"tint"`, description: "Warm light grey square, the same tint as a disc, transparent, or a hex colour." },
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
