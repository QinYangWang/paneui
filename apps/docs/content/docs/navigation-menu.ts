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
      "body": { en: "One popup is shared by every panel: it resizes and the panels slide in from the side the pointer came from. Under reduced motion it only fades.", zh: "所有面板共用一个弹窗：弹窗调整大小，面板从指针来的方向滑入。启用减少动态效果时仅淡入淡出。" }
    },
    {
      "title": "Links",
      "body": { en: "Use `render` on `NavigationMenuLink` for your router's link. The first `span` is the title and the second the muted line; `active` marks the current page.", zh: "在 `NavigationMenuLink` 上使用 `render` 接入路由器的链接。第一个 `span` 是标题，第二个是弱化行；`active` 标记当前页面。" }
    }
  ],
  "api": [
    {
      "name": "NavigationMenu",
      "description": { en: "Root plus the shared popup.", zh: "根节点加共享弹窗。" },
      "extends": "NavigationMenu.Root",
      "extendsHref": "https://base-ui.com/react/components/navigation-menu#root",
      "props": []
    },
    {
      "name": "NavigationMenuTrigger",
      "description": { en: "Adds the chevron.", zh: "添加 chevron。" },
      "extends": "NavigationMenu.Trigger",
      "extendsHref": "https://base-ui.com/react/components/navigation-menu#trigger",
      "props": []
    },
    {
      "name": "NavigationMenuContent",
      "description": { en: "A panel; size it with `className`.", zh: "一个面板；用 `className` 设置其尺寸。" },
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
          "description": { en: "`trigger` styles a top-level link like a trigger; `tab` is a full-height header section link with a 2px bar under the `active` one.", zh: "`trigger` 将顶层链接样式设为触发器；`tab` 是撑满高度的头部区域链接，`active` 项下方有 2px 条。" },
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
