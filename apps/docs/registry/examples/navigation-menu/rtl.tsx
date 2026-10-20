import { DirectionProvider } from "@base-ui/react/direction-provider"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@paneui/ui/components/navigation-menu"

const product = [
  { title: "التحليلات", text: "لوحات يتابعها فريقك كل يوم." },
  { title: "الأتمتة", text: "شغّل العمل وفق جدول أو حدث." },
  { title: "التكاملات", text: "اربط الأدوات التي تستخدمها." },
  { title: "الأمان", text: "تسجيل دخول موحد وسجلات تدقيق." },
]

export default function NavigationMenuRtl() {
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>المنتج</NavigationMenuTrigger>
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
              <NavigationMenuLink variant="trigger" href="#">
                الأسعار
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink variant="trigger" href="#">
                التوثيق
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </DirectionProvider>
  )
}
