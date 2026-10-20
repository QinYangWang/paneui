import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@paneui/ui/components/navigation-menu"

const product = [
  { title: "Analytics", text: "Dashboards your team checks every day." },
  { title: "Automations", text: "Run work on a schedule or a trigger." },
  { title: "Integrations", text: "Connect the tools you already use." },
  { title: "Security", text: "SSO, audit logs and data residency." },
]

const resources = [
  { title: "Docs", text: "Guides and API reference." },
  { title: "Changelog", text: "What shipped this week." },
  { title: "Community", text: "Questions, answers and showcases." },
]

export default function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Product</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-0.5 sm:w-md sm:grid-cols-2">
              {product.map((p) => (
                <li key={p.title}>
                  <NavigationMenuLink href="#">
                    <span>{p.title}</span>
                    <span>{p.text}</span>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-0.5 sm:w-64">
              {resources.map((p) => (
                <li key={p.title}>
                  <NavigationMenuLink href="#">
                    <span>{p.title}</span>
                    <span>{p.text}</span>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink variant="trigger" href="#">
            Pricing
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
