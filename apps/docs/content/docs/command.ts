import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Searchable list of actions, inline or in a dialog.", "zh": "搜索并选择操作。"},
  "usage": {
    "imports": "import {\n  Command,\n  CommandEmpty,\n  CommandGroup,\n  CommandInput,\n  CommandItem,\n  CommandList,\n  CommandShortcut,\n} from \"@/components/ui/command\"",
    "code": "<Command>\n  <CommandInput placeholder=\"Type a command…\" />\n  <CommandList>\n    <CommandEmpty>No results.</CommandEmpty>\n    <CommandGroup heading=\"Files\">\n      <CommandItem onSelect={() => createFile()}>\n        New file\n        <CommandShortcut>⌘N</CommandShortcut>\n      </CommandItem>\n    </CommandGroup>\n  </CommandList>\n</Command>"
  },
  "composition": "Command  (or CommandDialog)\n├── CommandInput\n└── CommandList\n    ├── CommandEmpty\n    ├── CommandGroup\n    │   └── CommandItem\n    │       └── CommandShortcut\n    └── CommandSeparator",
  "examples": [
    {
      "id": "dialog",
      "title": {"en":"Dialog","zh":"对话框"},
      "description": {"en":"Use for an app-wide palette opened with a shortcut.","zh":"适用于通过快捷键打开的全局命令面板。"}
    }
  ],
  "notes": [
    {
      "title": "Keyboard",
      "body": { en: "↑/↓ (or Ctrl+N / Ctrl+P) move the highlight, Enter runs it, typing filters. Groups with no matches hide, and separators hide while searching.", zh: "↑/↓（或 Ctrl+N / Ctrl+P）移动高亮，Enter 执行，输入过滤。无匹配的组隐藏，搜索时隐藏分隔符。" }
    },
    {
      "title": "Filtering",
      "body": { en: "Items rank by prefix, then substring, then letters in order, across `value` and `keywords`. Pass `filter` to change the ranking, or `shouldFilter={false}` when you filter the items yourself.", zh: "项按前缀、子串、字母顺序排名，跨 `value` 和 `keywords`。传入 `filter` 更改排名，或自行过滤项时传入 `shouldFilter={false}`。" }
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
          "description": { en: "Controlled search text.", zh: "受控搜索文本。" }
        },
        {
          "name": "onSearchChange",
          "type": "(search: string) => void",
          "description": { en: "Called as the input changes.", zh: "输入变化时调用。" }
        },
        {
          "name": "filter",
          "type": "(value, search, keywords?) => number",
          "description": { en: "Ranking; 0 hides the item.", zh: "排名；0 隐藏该项。" },
          "default": "prefix / substring / in-order letters"
        },
        {
          "name": "shouldFilter",
          "type": "boolean",
          "description": { en: "Set false for server-filtered items.", zh: "服务器过滤项时设为 false。" },
          "default": "true"
        },
        {
          "name": "loop",
          "type": "boolean",
          "description": { en: "Wrap at the ends with the arrow keys.", zh: "使用方向键在两端循环。" },
          "default": "false"
        }
      ]
    },
    {
      "name": "CommandDialog",
      "description": { en: "The Command in a centred dialog; the input takes focus on open.", zh: "居中对话框中的 Command；打开时输入框获得焦点。" },
      "extends": "Dialog.Root",
      "extendsHref": "https://base-ui.com/react/components/dialog#root",
      "props": [
        {
          "name": "title",
          "type": "string",
          "description": { en: "Screen-reader title.", zh: "屏幕阅读器标题。" },
          "default": "\"Command palette\""
        },
        {
          "name": "commandProps",
          "type": "CommandProps",
          "description": { en: "Props for the inner Command.", zh: "内部 Command 的 props。" }
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
          "description": { en: "Identity and search text.", zh: "标识和搜索文本。" },
          "default": "the text content"
        },
        {
          "name": "keywords",
          "type": "string[]",
          "description": { en: "Extra words that match.", zh: "额外匹配的词语。" }
        },
        {
          "name": "onSelect",
          "type": "(value: string) => void",
          "description": { en: "Runs on click or Enter.", zh: "点击或按 Enter 时运行。" }
        },
        {
          "name": "disabled",
          "type": "boolean",
          "description": { en: "Skip in navigation and dim.", zh: "在导航中跳过并变暗。" },
          "default": "false"
        }
      ],
      "dataAttributes": [
        {
          "name": "data-selected",
          "description": { en: "Present on the highlighted item.", zh: "在高亮项上存在。" }
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
      "description": { en: "Scrolls at 20rem.", zh: "在 20rem 处滚动。" },
      "extends": "div",
      "props": []
    },
    {
      "name": "CommandEmpty",
      "description": { en: "Rendered only when nothing matches.", zh: "仅在无匹配时渲染。" },
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
          "description": { en: "Label above the items.", zh: "项上方的标签。" }
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
