import type { ComponentDoc } from "@/lib/doc-types"

export default {
  "usage": {
    "imports": "import {\n  Command,\n  CommandEmpty,\n  CommandGroup,\n  CommandInput,\n  CommandItem,\n  CommandList,\n  CommandShortcut,\n} from \"@/components/ui/command\"",
    "code": "<Command>\n  <CommandInput placeholder=\"Type a command…\" />\n  <CommandList>\n    <CommandEmpty>No results.</CommandEmpty>\n    <CommandGroup heading=\"Files\">\n      <CommandItem onSelect={() => createFile()}>\n        New file\n        <CommandShortcut>⌘N</CommandShortcut>\n      </CommandItem>\n    </CommandGroup>\n  </CommandList>\n</Command>"
  },
  "composition": "Command  (or CommandDialog)\n├── CommandInput\n└── CommandList\n    ├── CommandEmpty\n    ├── CommandGroup\n    │   └── CommandItem\n    │       └── CommandShortcut\n    └── CommandSeparator",
  "examples": [
    {
      "id": "dialog",
      "title": "Dialog",
      "description": "Use `CommandDialog` for an app-wide palette bound to a shortcut."
    }
  ],
  "notes": [
    {
      "title": "Keyboard",
      "body": "↑/↓ (or Ctrl+N / Ctrl+P) move the highlight, Enter runs it, typing filters. Groups with no matches hide, and separators hide while searching."
    },
    {
      "title": "Filtering",
      "body": "Items rank by prefix, then substring, then letters in order, across `value` and `keywords`. Pass `filter` to change the ranking, or `shouldFilter={false}` when you filter the items yourself."
    }
  ],
  "api": [
    {
      "name": "Command",
      "extends": "div",
      "props": [
        {
          "name": "search",
          "type": "string",
          "description": "Controlled search text."
        },
        {
          "name": "onSearchChange",
          "type": "(search: string) => void",
          "description": "Called as the input changes."
        },
        {
          "name": "filter",
          "type": "(value, search, keywords?) => number",
          "description": "Ranking; 0 hides the item.",
          "default": "prefix / substring / in-order letters"
        },
        {
          "name": "shouldFilter",
          "type": "boolean",
          "description": "Set false for server-filtered items.",
          "default": "true"
        },
        {
          "name": "loop",
          "type": "boolean",
          "description": "Wrap at the ends with the arrow keys.",
          "default": "false"
        }
      ]
    },
    {
      "name": "CommandDialog",
      "description": "The Command in a centred dialog; the input takes focus on open.",
      "extends": "Dialog.Root",
      "extendsHref": "https://base-ui.com/react/components/dialog#root",
      "props": [
        {
          "name": "title",
          "type": "string",
          "description": "Screen-reader title.",
          "default": "\"Command palette\""
        },
        {
          "name": "commandProps",
          "type": "CommandProps",
          "description": "Props for the inner Command."
        }
      ]
    },
    {
      "name": "CommandItem",
      "extends": "div",
      "props": [
        {
          "name": "value",
          "type": "string",
          "description": "Identity and search text.",
          "default": "the text content"
        },
        {
          "name": "keywords",
          "type": "string[]",
          "description": "Extra words that match."
        },
        {
          "name": "onSelect",
          "type": "(value: string) => void",
          "description": "Runs on click or Enter."
        },
        {
          "name": "disabled",
          "type": "boolean",
          "description": "Skip in navigation and dim.",
          "default": "false"
        }
      ],
      "dataAttributes": [
        {
          "name": "data-selected",
          "description": "Present on the highlighted item."
        }
      ]
    },
    {
      "name": "CommandInput",
      "extends": "input",
      "props": []
    },
    {
      "name": "CommandList",
      "description": "Scrolls at 20rem.",
      "extends": "div",
      "props": []
    },
    {
      "name": "CommandEmpty",
      "description": "Rendered only when nothing matches.",
      "extends": "div",
      "props": []
    },
    {
      "name": "CommandGroup",
      "extends": "div",
      "props": [
        {
          "name": "heading",
          "type": "ReactNode",
          "description": "Label above the items."
        }
      ]
    },
    {
      "name": "CommandSeparator",
      "extends": "div",
      "props": []
    },
    {
      "name": "CommandShortcut",
      "extends": "span",
      "props": []
    }
  ]
} satisfies ComponentDoc
