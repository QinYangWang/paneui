import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Row of menus for a desktop app window.", "zh": "为桌面应用提供菜单栏。"},
  "baseUi": {
    "name": "Menubar",
    "href": "https://base-ui.com/react/components/menubar"
  },
  "usage": {
    "imports": "import {\n  Menubar,\n  MenubarContent,\n  MenubarItem,\n  MenubarMenu,\n  MenubarShortcut,\n  MenubarTrigger,\n} from \"@/components/ui/menubar\"",
    "code": "<Menubar>\n  <MenubarMenu>\n    <MenubarTrigger>File</MenubarTrigger>\n    <MenubarContent>\n      <MenubarItem>\n        New tab<MenubarShortcut>⌘T</MenubarShortcut>\n      </MenubarItem>\n    </MenubarContent>\n  </MenubarMenu>\n</Menubar>"
  },
  "composition": "Menubar\n└── MenubarMenu\n    ├── MenubarTrigger\n    └── MenubarContent\n        ├── MenubarItem / MenubarCheckboxItem / MenubarRadioGroup\n        ├── MenubarSub → MenubarSubTrigger, MenubarSubContent\n        └── MenubarSeparator",
  "examples": [
    {
      "id": "radio-items",
      "title": {"en":"Radio Items","zh":"单选菜单项"}
    }
  ],
  "notes": [
    {
      "title": "Keyboard",
      "body": { en: "←/→ move between menus; once one is open, hovering or arrowing to another trigger switches menus. Items inside behave as in `Menu`.", zh: "←/→ 在菜单间移动；菜单打开后，悬停或用方向键移到其他触发器会切换菜单。其中的项行为与 `Menu` 中相同。" }
    }
  ],
  "api": [
    {
      "name": "Menubar",
      "extends": "Menubar",
      "extendsHref": "https://base-ui.com/react/components/menubar",
      "props": []
    },
    {
      "name": "MenubarMenu",
      "description": { en: "Re-export of the menu root.", zh: "菜单根的再导出。" },
      "extends": "Menu.Root",
      "extendsHref": "https://base-ui.com/react/components/menu#root",
      "props": []
    },
    {
      "name": "MenubarTrigger",
      "extends": "Menu.Trigger",
      "extendsHref": "https://base-ui.com/react/components/menu#trigger",
      "props": [],
      "dataAttributes": [
        {
          "name": "data-popup-open",
          "description": { en: "Present while its menu is open.", zh: "在其菜单打开期间存在。" }
        }
      ]
    },
    {
      "name": "MenubarContent",
      "description": { en: "`MenuContent`, aligned to the trigger's start.", zh: "与触发器 start 对齐的 `MenuContent`。" },
      "extends": "MenuContent",
      "extendsHref": "/docs/menu#api-reference",
      "props": []
    },
    {
      "name": "MenubarItem, MenubarCheckboxItem, MenubarRadioItem…",
      "description": { en: "The `Menu` parts under menubar names.", zh: "menubar 命名下的 `Menu` 各部分。" },
      "extends": "Menu parts",
      "extendsHref": "/docs/menu#api-reference",
      "props": []
    }
  ]
} satisfies ComponentDoc
