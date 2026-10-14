import type { ComponentDoc } from "@/lib/doc-types"

export default {
  baseUi: { name: "Menu", href: "https://base-ui.com/react/components/menu" },
  usage: {
    imports: `import { UserMenu } from "@/components/ui/user-menu"`,
    code: `<UserMenu name="Dana Chen" email="dana@acme.dev">
  <MenuItem>Profile</MenuItem>
  <MenuSeparator />
  <MenuItem variant="destructive">Sign out</MenuItem>
</UserMenu>`,
  },
  examples: [{ id: "compact", title: "Compact", description: "`variant=\"compact\"` is a bare avatar button for a top bar." }],
  notes: [{ title: "In a sidebar", body: "Put it in `SidebarFooter`; `collapsed` shows only the avatar in the icon rail. The menu opens upward by default (`side=\"top\"`)." }],
  api: [
    {
      name: "UserMenu",
      extends: "Base UI Menu.Trigger",
      props: [
        { name: "name", type: "string", required: true, description: "Shown and used for initials." },
        { name: "email", type: "string", description: "Second line and the menu's first label." },
        { name: "image", type: "string", description: "Avatar photo URL." },
        { name: "collapsed", type: "boolean", default: "false", description: "Avatar only." },
        { name: "variant", type: `"row" | "compact"`, default: `"row"`, description: "Full row or avatar button." },
        { name: "side / align", type: "Menu side / align", default: `"top" / "start"`, description: "Menu position." },
      ],
    },
  ],
} satisfies ComponentDoc
