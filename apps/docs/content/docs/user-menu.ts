import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Opens account actions for the signed-in user.", "zh": "打开账户操作菜单。"},
  baseUi: { name: "Menu", href: "https://base-ui.com/react/components/menu" },
  usage: {
    imports: `import { UserMenu } from "@/components/ui/user-menu"`,
    code: `<UserMenu name="Dana Chen" email="dana@acme.dev">
  <MenuItem>Profile</MenuItem>
  <MenuSeparator />
  <MenuItem variant="destructive">Sign out</MenuItem>
</UserMenu>`,
  },
  examples: [{ id: "compact", title: { en: "Compact", zh: "紧凑" },  }],
  notes: [{ title: "In a sidebar", body: { en: "Put it in `SidebarFooter`; `collapsed` shows only the avatar in the icon rail. The menu opens upward by default (`side=\"top\"`).", zh: "将其放入 `SidebarFooter`；`collapsed` 时在图标栏中只显示头像。菜单默认向上打开（`side=\"top\"`）。" } }],
  api: [
    {
      name: "UserMenu",
      extends: "Menu.Trigger",
      props: [
        { name: "name", type: "string", required: true, description: { en: "Shown and used for initials.", zh: "显示并用于首字母缩写。" } },
        { name: "email", type: "string", description: { en: "Second line and the menu's first label.", zh: "第二行和菜单的第一个标签。" } },
        { name: "image", type: "string", description: { en: "Avatar photo URL.", zh: "头像照片 URL。" } },
        { name: "collapsed", type: "boolean", default: "false", description: { en: "Avatar only.", zh: "仅头像。" } },
        { name: "variant", type: `"row" | "compact"`, default: `"row"`, description: { en: "Full row or avatar button.", zh: "整行或头像按钮。" } },
        { name: "side / align", type: "Menu side / align", default: `"top" / "start"`, description: { en: "Menu position.", zh: "菜单位置。" } },
      ],
    },
  ],
} satisfies ComponentDoc
