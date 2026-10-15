import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/registry/base-nova/ui/navigation-menu"

export default function NavigationMenuLinksOnly() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {["Overview", "Customers", "Pricing", "Blog"].map((l, i) => (
          <NavigationMenuItem key={l}>
            <NavigationMenuLink variant="trigger" href="#" active={i === 0}>
              {l}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
