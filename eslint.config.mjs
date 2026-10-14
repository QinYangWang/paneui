import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import { plugin as shadcn } from "@shadcn/lint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// ───────────────────────────────────────────────────────────────────────────
// qinyang/ui design-system rules
//
// One consistent style across every coding agent working in this repo.
// Rule reference: https://github.com/shadcn-ui/lint/blob/main/docs/rules.md
// Contracts + messages: https://github.com/shadcn-ui/lint/blob/main/docs/design-systems.md
//
// Two audiences:
//   LIBRARY   – component authors (registry ui + blocks, icon set). Components
//               own their appearance, so no-restyle is off; motion/geometry may
//               need arbitrary values (warn only).
//   CONSUMERS – anything that *uses* the library (examples, templates, docs
//               site). Strict: tokens only, no restyling beyond layout and the
//               per-family contracts below.
// ───────────────────────────────────────────────────────────────────────────

const LIBRARY_FILES = [
  "registry/base-nova/ui/**/*.{ts,tsx}",
  "registry/base-nova/blocks/**/*.{ts,tsx}",
  "components/icons.tsx",
];

const CONSUMER_FILES = [
  "registry/base-nova/examples/**/*.{ts,tsx}",
  "registry/base-nova/templates/**/*.{ts,tsx}",
  "app/**/*.{ts,tsx}",
  "components/docs/**/*.{ts,tsx}",
];

const THEME = "app/globals.css";
const TOKENS =
  "background, foreground, card, popover, primary, secondary, muted, muted-foreground, accent, destructive, success, warning, border, input, ring";

const messages = {
  rawColors:
    '"{{className}}" is not a theme color. Use a token from ' + THEME + " (" + TOKENS + "), " +
    "with an opacity modifier for washes (bg-success/12). {{suggestions}}",
  arbitrary:
    'Use {{suggestions|a theme token or scale value}} instead of "{{className}}". ' +
    "Colors, radii, text sizes, and shadows (shadow-raised, -raised-hover, -pressed, -primary, -well, -surface, -chip) live in " +
    THEME + ".",
  unknown:
    '"{{className}}" is not a class this project\'s Tailwind generates. {{suggestions}} ' +
    "Custom utilities and tokens are declared in " + THEME + ".",
};

const restyleMessage = {
  spacing:
    '"{{className}}": <{{component}}> owns its padding and gap. Use a size ({{sizes|none defined}}), or {{around|margin here or gap on the parent}}.',
  default:
    '"{{className}}": <{{component}}> owns its {{category}}. Use a variant ({{variants|none defined}}) from {{file}}, ' +
    "or style a plain wrapper element. Add a variant only if the design calls for it.",
};

// Every utility that only places an element (margins, flex/grid placement,
// position). Used where a contract narrows "layout" (e.g. Button).
const PLACEMENT = [
  "m", "mx", "my", "mt", "mr", "mb", "ml", "ms", "me",
  "self-*", "justify-self-*", "place-self-*", "order-*", "col-span-*", "col-start-*", "row-span-*",
  "shrink", "shrink-0", "grow", "flex-1", "flex-none",
  "hidden", "flex", "inline-flex",
  "absolute", "relative", "sticky", "top-*", "right-*", "bottom-*", "left-*", "inset-*", "z-*",
];

// Unstyled primitives with no surface of their own (scroll containers,
// motion wrappers, triggers): the caller supplies the frame with tokens.
const HEADLESS = [
  "SmoothScroll", "MessageScroller", "PullToRefresh", "ShaderBackground",
  "Collapsible", "ContextMenuTrigger", "SharedLayoutBg", "SharedLayoutBgItem",
  "TiltCard", "TiltCardLayer", "SidebarProvider", "SidebarInset", "SidebarHideCollapsed",
  "Magnetic", "ScrollReveal", "Parallax", "ParallaxLayer",
];

// Text-effect components: callers set the type size, weight, and token color.
const TEXT_COMPONENTS = [
  "TextReveal", "TextShimmer", "TextScramble", "TextCascade", "ChromaticTextReveal",
  "DigitSwap", "NumberTicker", "AnimatedNumber", "ReasoningText",
];

const re = (names) => "^(" + names.join("|") + ")$";

const designSystemRules = [
  // Shared recognition + note for every shadcn rule.
  {
    files: ["**/*.{ts,tsx}"],
    settings: {
      shadcn: {
        ui: ["@/registry/base-nova/ui", "@/registry/base-nova/blocks"],
        componentImports: ["^@/components/icons$"],
        note: "See AGENTS.md for qinyang/ui design rules.",
      },
    },
  },

  // LIBRARY: component authors.
  {
    files: LIBRARY_FILES,
    rules: {
      "shadcn/no-raw-colors": ["error", { message: messages.rawColors }],
      "shadcn/no-unknown-classes": ["error", { message: messages.unknown }],
      "shadcn/require-static-classes": "error",
      // Motion, geometry, and skeuomorphic shadows often need exact values:
      // warn, so off-scale sizes/radii stay visible as token candidates.
      // Named transition lists and easing curves are the motion vocabulary.
      "shadcn/no-arbitrary-values": [
        "warn",
        {
          allow: ["transition", "ease", "will-change", "grid-cols", "grid-rows"],
          message: messages.arbitrary,
        },
      ],
      "shadcn/no-restyle": "off",
      // motion/react drives style props (x, scale, opacity, CSS vars).
      "shadcn/no-inline-styles": "off",
    },
  },

  // CONSUMERS: examples, templates, docs site.
  {
    files: CONSUMER_FILES,
    rules: {
      "shadcn/no-raw-colors": ["error", { message: messages.rawColors }],
      "shadcn/no-arbitrary-values": [
        "error",
        {
          // Structural values with no scale equivalent: named transition
          // property lists (never `transition-all`), grid templates, and the
          // sidebar width variable.
          allow: ["transition", "grid-cols", "grid-rows", "[--sidebar-width:*]"],
          message: messages.arbitrary,
        },
      ],
      "shadcn/no-unknown-classes": ["error", { message: messages.unknown }],
      "shadcn/require-static-classes": "error",
      "shadcn/no-inline-styles": "warn",
      "shadcn/no-restyle": [
        "error",
        {
          allow: ["layout"],
          message: restyleMessage,
          // Only the LAST matching contract applies: order general -> specific.
          contracts: [
            // Containers whose padding and gap belong to the page.
            {
              pattern: "^(Card|Tabs)$|(Header|Footer|Group|Section|List)$",
              allow: ["layout", "spacing"],
            },
            // Content regions: spacing plus the type and token color of their
            // content, and the scrollbar utilities from globals.css.
            {
              pattern: "(Content|Panel|Body)$",
              allow: [
                "layout", "spacing", "typography", "text-color",
                "scrollbar-thin", "scrollbar-hover", "scrollbar-none",
              ],
            },
            // Labels: gap to their control, and font-normal for option labels.
            { pattern: "Label$", allow: ["layout", "spacing", "font-normal"] },
            // Text parts: type scale and weight (not family), gap for an inline icon.
            {
              pattern: "(Title|Description)$",
              allow: ["layout", "typography", "gap-*"],
              deny: ["font-family"],
            },
            // Buttons: margins and full width only; size/shape/color come from props.
            {
              pattern: "Button$",
              allow: [
                ...PLACEMENT, "w-full", "w-auto", "min-w-0", "justify-*",
                // quiet ghost/secondary triggers (search fields, toolbar icons)
                "text-muted-foreground", "text-foreground",
              ],
              message: {
                ...restyleMessage,
                layout:
                  '"{{className}}": <{{component}}> takes margins and w-full/w-auto only. Height and padding come from its size prop; set other widths on the parent.',
              },
            },
            // The accent slot is a documented color hook (accentClassName).
            { pattern: "^ExpandingArrowButton$", allow: [...PLACEMENT, "w-full", "color"] },
            // Icons from components/icons.tsx (IconChip is a component, not an icon).
            {
              pattern: "^(?!IconChip$).+Icon$",
              allow: ["layout", "size-*", "text-color", "opacity", "motion"],
              message:
                '"{{className}}": icons take size, layout, and a token text color only (16px text-muted-foreground in nav, text-foreground when active). ' +
                "Title/card icons go inside <IconChip>. See notes/icon-usage.md.",
            },
            { pattern: re(TEXT_COMPONENTS), allow: ["layout", "typography", "text-color"] },
            {
              pattern: re(HEADLESS),
              allow: ["layout", "spacing", "shape", "color", "effects", "typography", "motion"],
            },
          ],
        },
      ],
    },
  },
];

const eslintConfig = [
  {
    // `next lint` ignored these implicitly; `eslint .` needs them spelled out.
    ignores: [
      ".next/**",
      "out/**",
      "public/**",
      "node_modules/**",
      "next-env.d.ts",
      // Vendored agent skills (installed via skills-lock.json), not our code.
      ".agents/**",
      ".claude/**",
      "agent/**",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // @shadcn/lint: register the plugin. eslint-config-next already sets up
    // the TypeScript/JSX parser for these files, so no parser override here.
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: { shadcn },
  },
  ...designSystemRules,
];

export default eslintConfig;
