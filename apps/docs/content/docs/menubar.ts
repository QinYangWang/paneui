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
      "body": "←/→ move between menus; once one is open, hovering or arrowing to another trigger switches menus. Items inside behave as in `Menu`."
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
      "description": "Re-export of the menu root.",
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
          "description": "Present while its menu is open."
        }
      ]
    },
    {
      "name": "MenubarContent",
      "description": "`MenuContent`, aligned to the trigger's start.",
      "extends": "MenuContent",
      "extendsHref": "/docs/menu#api-reference",
      "props": []
    },
    {
      "name": "MenubarItem, MenubarCheckboxItem, MenubarRadioItem…",
      "description": "The `Menu` parts under menubar names.",
      "extends": "Menu parts",
      "extendsHref": "/docs/menu#api-reference",
      "props": []
    }
  ]
} satisfies ComponentDoc
