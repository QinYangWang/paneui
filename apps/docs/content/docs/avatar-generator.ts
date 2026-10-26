import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Creates and edits avatars.", "zh": "生成或编辑用户头像。"},
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
      title: { en: "From a Seed", zh: "按种子生成" },
      description: { en: "Use a stable seed, like a user id, so a person gets the same avatar everywhere.", zh: "使用固定种子，让同一用户始终获得同一头像。" },
    },
    {
      id: "gender",
      title: { en: "Male and Female", zh: "男性与女性" },
    },
    {
      id: "options",
      title: { en: "Options", zh: "选项" },
    },
    {
      id: "generator",
      title: { en: "Generator", zh: "生成器" },
    },
  ],
  notes: [
    {
      title: "Artwork and licence",
      body: { en: "The illustrations and the renderer install with the component as two packages; nothing is fetched at runtime. The licence metadata block is stripped from the SVG output; credits for the art and the renderer are in `THIRD_PARTY_NOTICES.md`.", zh: "插图和渲染器作为两个包随组件一起安装；运行时不会获取任何内容。SVG 输出中会剥离许可证元数据块；美术和渲染器的致谢见 `THIRD_PARTY_NOTICES.md`。" },
    },
    {
      title: "Parts",
      body: { en: "Part names follow the drawing set, with hair `variant01`…`variant63` plus `hat`, eyes `variant01`…`05`, brows `01`…`13`, lips `01`…`30`, nose `01`…`20`, glasses `01`…`11`, beard `01`…`12`, body (the top) `01`…`25`, and gesture `waveLongArms`, `waveLongArm`, `wavePointLongArms`, `waveOkLongArms`, `pointLongArm`, `okLongArm`, `handPhone`. Use `getAvatarParts(slot, gender)` for the list with labels. Gestures are off unless picked; the set's `point`, `ok` and `hand` are left out because the closer crop hides the hand.", zh: "部件名称遵循绘制集：头发 `variant01`…`variant63` 加上 `hat`，眼睛 `variant01`…`05`，眉毛 `01`…`13`，嘴唇 `01`…`30`，鼻子 `01`…`20`，眼镜 `01`…`11`，胡须 `01`…`12`，身体（上衣）`01`…`25`，手势 `waveLongArms`、`waveLongArm`、`wavePointLongArms`、`waveOkLongArms`、`pointLongArm`、`okLongArm`、`handPhone`。使用 `getAvatarParts(slot, gender)` 获取带标签的列表。手势除非被选中否则关闭；绘制集中的 `point`、`ok` 和 `hand` 被排除，因为更近的裁剪会遮住手。" },
    },
    {
      title: "Small sizes and ids",
      body: { en: "The drawings are busts; the avatar is zoomed in (`scale` 135, `translateY` 8) so the face still reads at `xs`/`sm` (20–24px). Every id inside the SVG (the clip mask, some tops) is prefixed. `GeneratedAvatar` and `GeneratedAvatarImage` use React's `useId`, `createGeneratedAvatar` a hash of the options (or your `idPrefix`), so any number of avatars, identical ones included, can share a page without one borrowing another's mask, and the markup is the same on the server and the client.", zh: "插图是半身像；头像被放大（`scale` 135，`translateY` 8），以便面部在 `xs`/`sm`（20–24px）下仍然清晰。SVG 内的每个 id（裁剪蒙版、部分上衣）都加了前缀。`GeneratedAvatar` 和 `GeneratedAvatarImage` 使用 React 的 `useId`，`createGeneratedAvatar` 使用选项的哈希（或你的 `idPrefix`），因此任意数量的头像（包括完全相同的）可以共享一个页面，而不会互相借用蒙版，并且服务器和客户端上的标记相同。" },
    },
    {
      title: "Storing an avatar",
      body: { en: "Store the seed when the avatar can be regenerated from the user. When the user edits it, store `{ seed, gender, selections, accessories }` from `onValueChange`. A future release of the drawing set that adds parts can change seed-only picks, so pin explicit `selections` for avatars that must never change.", zh: "当头像可以从用户重新生成时，存储种子。当用户编辑它时，从 `onValueChange` 存储 `{ seed, gender, selections, accessories }`。未来添加部件的绘制集版本可能会改变仅基于种子的选择，因此对于绝不能改变的头像，请固定显式的 `selections`。" },
    },
    {
      title: "Generator width",
      body: { en: "`AvatarGenerator` lays out by its own width, not the screen's: stacked below 36rem, preview beside the controls from there. Size it with `className` (it fills its parent up to `max-w-2xl`).", zh: "`AvatarGenerator` 按其自身宽度布局，而非屏幕宽度：低于 36rem 时堆叠，高于此宽度时预览位于控件旁边。用 `className` 设置尺寸（它会填满父容器，最大到 `max-w-2xl`）。" },
    },
    {
      title: "Dark mode",
      body: { en: "The line art is black on white faces, so the default `tint` background stays light in both themes. Use `background=\"none\"` only on light surfaces.", zh: "线条艺术是白脸上的黑色，因此默认的 `tint` 背景在两种主题下都保持浅色。仅在浅色表面上使用 `background=\"none\"`。" },
    },
  ],
  api: [
    {
      name: "GeneratedAvatar",
      description: { en: "A seeded illustrated avatar inside the library's `Avatar` frame. Children (e.g. `AvatarStatus`) render on top.", zh: "库的 `Avatar` 框架内一个基于种子的插图头像。子元素（例如 `AvatarStatus`）渲染在上层。" },
      extends: "Avatar",
      props: [
        { name: "seed", type: "string", required: true, description: { en: "Any stable string.", zh: "任意稳定字符串。" } },
        { name: "gender", type: `"male" | "female" | "any"`, default: `"any"`, description: { en: "Which hairstyles the seed picks from. `female` has 22 (long hair, bobs, buns, ponytails, headscarves) and never a beard; `male` has 35 short cuts and allows a beard; `any` uses all 64.", zh: "种子从中选择哪些发型。`female` 有 22 种（长发、波波头、丸子头、马尾、头巾），且从不留胡须；`male` 有 35 种短发，允许胡须；`any` 使用全部 64 种。" } },
        { name: "size", type: `"xs" | "sm" | "md" | "lg" | "xl" | number`, default: `"md"`, description: { en: "An Avatar size or a pixel size. Inside an `AvatarGroup` it follows the group.", zh: "Avatar 尺寸或像素尺寸。在 `AvatarGroup` 内则跟随组。" } },
        { name: "shape", type: `"circle" | "rounded"`, default: `"circle"`, description: { en: "Passed to `Avatar`.", zh: "传递给 `Avatar`。" } },
        { name: "accessories", type: "boolean", default: "false", description: { en: "Let the seed add glasses (about one in three).", zh: "让种子添加眼镜（约三分之一）。" } },
        { name: "background", type: `"tint" | "circle" | "none" | string`, default: `"tint"`, description: { en: "`tint` is a light grey square, `circle` the same tint as a disc, `none` transparent, or pass a hex colour.", zh: "`tint` 是浅灰色方块，`circle` 是相同色调的圆盘，`none` 透明，或传入十六进制颜色。" } },
        { name: "selections", type: `{ hair?, eyes?, brows?, lips?, nose?, glasses?, beard?, body?, gesture?: string }`, description: { en: "Explicit part per slot by name (`{ hair: \"variant46\", glasses: \"none\" }`). Overrides the seed; the Parts note lists the names.", zh: "按名称显式指定每个槽位的部件（`{ hair: \"variant46\", glasses: \"none\" }`）。覆盖种子；部件说明列出了名称。" } },
        { name: "colors", type: `{ background?: string }`, description: { en: "Hex colour for the background tint.", zh: "背景色调的十六进制颜色。" } },
        { name: "idPrefix", type: "string", description: { en: "Prefix for ids inside the SVG. Defaults to one from `useId` (a hash of the options in `createGeneratedAvatar`).", zh: "SVG 内 id 的前缀。默认为来自 `useId` 的前缀（在 `createGeneratedAvatar` 中是选项的哈希）。" } },
        { name: "title", type: "string", description: { en: "Accessible name. Without it the avatar is decorative.", zh: "可访问名称。没有它，头像为装饰性。" } },
      ],
    },
    {
      name: "GeneratedAvatarImage",
      description: { en: "The drawing alone as an `<svg>` that fills its box. Same options as `GeneratedAvatar` minus size and shape.", zh: "仅绘制内容作为填充其盒子的 `<svg>`。选项与 `GeneratedAvatar` 相同，但减去尺寸和形状。" },
      extends: "svg",
      props: [],
    },
    {
      name: "createGeneratedAvatar",
      description: { en: "Framework-free builder. Returns `{ selections, viewBox, content, toString(size?), toDataUri(size?) }`; `selections` is the part each slot ended up with (`\"none\"` for an empty optional slot).", zh: "无框架构建器。返回 `{ selections, viewBox, content, toString(size?), toDataUri(size?) }`；`selections` 是每个槽位最终得到的部件（空的可选槽位为 `\"none\"`）。" },
      props: [{ name: "options", type: "GeneratedAvatarOptions", required: true, description: { en: "Same options as `GeneratedAvatar` (seed, gender, accessories, background, selections, colors).", zh: "选项与 `GeneratedAvatar` 相同（seed、gender、accessories、background、selections、colors）。" } }],
    },
    {
      name: "getAvatarParts",
      description: { en: "The parts a slot offers for a gender, for building your own pickers. Only hair differs by gender (and beard is empty for `female`); glasses, beard and gesture start with `none`.", zh: "某个性别下槽位提供的部件，用于构建你自己的选择器。只有头发因性别而异（并且胡须对 `female` 为空）；眼镜、胡须和手势以 `none` 开头。" },
      props: [
        { name: "slot", type: `"hair" | "eyes" | "brows" | "lips" | "nose" | "glasses" | "beard" | "body" | "gesture"`, required: true, description: { en: "Returns `{ name, label, gender? }[]`.", zh: "返回 `{ name, label, gender? }[]`。" } },
        { name: "gender", type: `"male" | "female" | "any"`, default: `"any"`, description: "" },
      ],
    },
    {
      name: "AvatarGenerator",
      description: { en: "The editor UI.", zh: "编辑器 UI。" },
      extends: "div",
      props: [
        { name: "defaultSeed", type: "string", default: `"paneui"`, description: { en: "Initial seed.", zh: "初始种子。" } },
        { name: "defaultGender", type: `"male" | "female" | "any"`, default: `"any"`, description: { en: "Initial gender.", zh: "初始性别。" } },
        { name: "onValueChange", type: "(state: { seed, gender, selections, accessories }) => void", description: { en: "Called on every change; store it to redraw the same avatar with `GeneratedAvatar`.", zh: "每次更改时调用；存储它以用 `GeneratedAvatar` 重绘相同的头像。" } },
      ],
    },
  ],
} satisfies ComponentDoc
