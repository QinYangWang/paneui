import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { CylinderCarousel } from "@/components/ui/cylinder-carousel"`,
    code: `<CylinderCarousel label="Trip ideas">
  {places.map((place) => (
    <img key={place.id} src={place.src} alt="" className="size-full object-cover" />
  ))}
</CylinderCarousel>`,
  },
  examples: [
    {
      id: "visible-items",
      title: "Visible Items",
      description: "`visibleItems` sets how many items sit fully in view; `aspectRatio` sets item height as a multiple of its width.",
    },
    {
      id: "controlled",
      title: "Controlled",
      description: "Drive the front item with `index` and `onIndexChange`, here from a row of buttons with `controls={false}`.",
    },
    {
      id: "item-width",
      title: "Item Width",
      description: "A fixed `itemWidth` in px overrides the arc fit; `dragSpeed` rolls more items per drag and `defaultIndex` picks the starting item.",
    },
  ],
  notes: [
    {
      title: "Keyboard",
      body: "Focus the stage and use ← / → to rotate one item, Home and End to jump to the first or last. Horizontal trackpad swipes and Shift + wheel rotate it too; clicking a side item brings it to the front.",
    },
    {
      title: "Motion",
      body: "Flicks roll on with the release velocity and settle on a heavy spring. Under reduced motion the ring jumps straight to the target item.",
    },
  ],
  api: [
    {
      name: "CylinderCarousel",
      description: "Items on the inside wall of a looping 3D cylinder. Each child is one item.",
      extends: "div",
      props: [
        { name: "children", type: "ReactNode", required: true, description: "One child per item; it fills the item frame." },
        { name: "visibleItems", type: "number", default: "5", description: "Items fully in view; the next one each side peeks in at the edge." },
        { name: "aspectRatio", type: "number", default: "1.25", description: "Item height as a multiple of its width." },
        { name: "itemWidth", type: "number", description: "Item width in px. Defaults to filling the arc between neighbours." },
        { name: "dragSpeed", type: "number", default: "1.2", description: "Items rolled per item-width dragged." },
        { name: "index", type: "number", description: "Controlled active index." },
        { name: "defaultIndex", type: "number", default: "0", description: "Initial active index when uncontrolled." },
        { name: "onIndexChange", type: "(index: number) => void", description: "Called when the front item changes." },
        { name: "controls", type: "boolean", default: "true", description: "Show previous / next buttons and a counter under the stage." },
        { name: "label", type: "string", default: `"Carousel"`, description: "Accessible name for the carousel region." },
      ],
      dataAttributes: [{ name: "data-active", description: "On the item currently at the front." }],
    },
  ],
} satisfies ComponentDoc
