import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@paneui/ui/components/navigation-menu"

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
