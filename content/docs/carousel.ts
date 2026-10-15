import type { ComponentDoc } from "@/lib/doc-types"

export default {
  "usage": {
    "imports": "import {\n  Carousel,\n  CarouselContent,\n  CarouselDots,\n  CarouselItem,\n  CarouselNext,\n  CarouselPrevious,\n} from \"@/components/ui/carousel\"",
    "code": "<Carousel aria-label=\"Photos\">\n  <CarouselContent>\n    <CarouselItem>…</CarouselItem>\n    <CarouselItem>…</CarouselItem>\n  </CarouselContent>\n  <CarouselPrevious />\n  <CarouselNext />\n</Carousel>"
  },
  "composition": "Carousel\n├── CarouselContent\n│   └── CarouselItem × n\n├── CarouselPrevious / CarouselNext\n└── CarouselDots",
  "examples": [
    {
      "id": "several-per-view",
      "title": "Several per View",
      "description": "Give items `basis-1/3` (or any basis) to show several at once."
    }
  ],
  "notes": [
    {
      "title": "Behaviour",
      "body": "Slides scroll with native snapping, so touch, trackpad and wheel feel like the platform. ←/→ (↑/↓ when vertical) step one slide; with reduced motion the step jumps instead of scrolling smoothly."
    },
    {
      "title": "Accessibility",
      "body": "The root is a `region` with `aria-roledescription=\"carousel\"` and each item a `slide` group. Label both, for example \"2 of 5\" on items."
    }
  ],
  "api": [
    {
      "name": "Carousel",
      "extends": "div",
      "props": [
        {
          "name": "orientation",
          "type": "\"horizontal\" | \"vertical\"",
          "description": "Scroll axis. A vertical carousel needs a height.",
          "default": "\"horizontal\""
        },
        {
          "name": "loop",
          "type": "boolean",
          "description": "Buttons and keys wrap at the ends.",
          "default": "false"
        },
        {
          "name": "onIndexChange",
          "type": "(index: number) => void",
          "description": "Called when the current slide changes."
        }
      ]
    },
    {
      "name": "CarouselItem",
      "description": "`basis-full` by default.",
      "extends": "div",
      "props": []
    },
    {
      "name": "CarouselContent",
      "description": "The scroll container; `className` goes on the track (gap, padding).",
      "extends": "div",
      "props": []
    },
    {
      "name": "CarouselPrevious / CarouselNext",
      "extends": "Button",
      "extendsHref": "/docs/button#api-reference",
      "props": [
        {
          "name": "variant",
          "type": "Button variant",
          "description": "",
          "default": "\"secondary\""
        },
        {
          "name": "size",
          "type": "Button size",
          "description": "",
          "default": "\"icon-sm\""
        }
      ]
    },
    {
      "name": "CarouselDots",
      "extends": "div",
      "props": []
    },
    {
      "name": "useCarousel",
      "description": "Inside a Carousel: `index`, `count`, `canPrev`, `canNext`, `scrollTo`, `scrollPrev`, `scrollNext`.",
      "props": []
    }
  ]
} satisfies ComponentDoc
