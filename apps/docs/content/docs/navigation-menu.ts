import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Site navigation with panels of links.", "zh": "为站点提供导航菜单。"},
  "baseUi": {
    "name": "Navigation Menu",
    "href": "https://base-ui.com/react/components/navigation-menu"
  },
  "usage": {
    "imports": "import {\n  NavigationMenu,\n  NavigationMenuContent,\n  NavigationMenuItem,\n  NavigationMenuLink,\n  NavigationMenuList,\n  NavigationMenuTrigger,\n} from \"@/components/ui/navigation-menu\"",
    "code": "<NavigationMenu>\n  <NavigationMenuList>\n    <NavigationMenuItem>\n      <NavigationMenuTrigger>Product</NavigationMenuTrigger>\n      <NavigationMenuContent>\n        <NavigationMenuLink href=\"/analytics\">\n          <span>Analytics</span>\n          <span>Dashboards for every team.</span>\n        </NavigationMenuLink>\n      </NavigationMenuContent>\n    </NavigationMenuItem>\n  </NavigationMenuList>\n</NavigationMenu>"
  },
  "composition": "NavigationMenu\n└── NavigationMenuList\n    └── NavigationMenuItem\n        ├── NavigationMenuTrigger\n        └── NavigationMenuContent\n            └── NavigationMenuLink",
  "examples": [
    {
      "id": "links-only",
      "title": {"en":"Links Only","zh":"仅链接"}
    },
    {
      "id": "header-tabs",
      "title": {"en":"Header Tabs","zh":"顶部标签"},
    },
    {
      "id": "rtl",
      "title": {"en":"RTL","zh":"从右到左"},
    }
  ],
  "notes": [
    {
      "title": "Motion",
      "body": "One popup is shared by every panel: it resizes and the panels slide in from the side the pointer came from. Under reduced motion it only fades."
    },
    {
      "title": "Links",
      "body": "Use `render` on `NavigationMenuLink` for your router's link. The first `span` is the title and the second the muted line; `active` marks the current page."
    }
  ],
  "api": [
    {
      "name": "NavigationMenu",
      "description": "Root plus the shared popup.",
      "extends": "NavigationMenu.Root",
      "extendsHref": "https://base-ui.com/react/components/navigation-menu#root",
      "props": []
    },
    {
      "name": "NavigationMenuTrigger",
      "description": "Adds the chevron.",
      "extends": "NavigationMenu.Trigger",
      "extendsHref": "https://base-ui.com/react/components/navigation-menu#trigger",
      "props": []
    },
    {
      "name": "NavigationMenuContent",
      "description": "A panel; size it with `className`.",
      "extends": "NavigationMenu.Content",
      "extendsHref": "https://base-ui.com/react/components/navigation-menu#content",
      "props": []
    },
    {
      "name": "NavigationMenuLink",
      "extends": "NavigationMenu.Link",
      "extendsHref": "https://base-ui.com/react/components/navigation-menu#link",
      "props": [
        {
          "name": "variant",
          "type": "\"panel\" | \"trigger\" | \"tab\"",
          "description": "`trigger` styles a top-level link like a trigger; `tab` is a full-height header section link with a 2px bar under the `active` one.",
          "default": "\"panel\""
        }
      ]
    },
    {
      "name": "NavigationMenuList",
      "extends": "NavigationMenu.List",
      "extendsHref": "https://base-ui.com/react/components/navigation-menu#list",
      "props": []
    },
    {
      "name": "NavigationMenuItem",
      "extends": "NavigationMenu.Item",
      "extendsHref": "https://base-ui.com/react/components/navigation-menu#item",
      "props": []
    }
  ]
} satisfies ComponentDoc
