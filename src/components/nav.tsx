"use client"

import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { mainMenu } from "@/config/navigation"
import type { INav } from "@/types/nav-t"

interface IProps {
  menu?: INav[]
}

export function Nav(props: IProps) {
  const { menu = mainMenu } = props

  return (
    <NavigationMenu viewport={false} className="ml-auto">
      <NavigationMenuList>
        {menu.map((item, index) =>
          item.children && item.children.length > 0 ? (
            <NavigationMenuItem key={item.slug}>
              <NavigationMenuTrigger className="bg-transparent text-white hover:bg-primary hover:text-white focus:bg-transparent data-open:bg-primary data-open:text-white">
                {item.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent className={`min-w-[180px] !bg-card !shadow-xl !ring-primary/20 ${index === menu.length - 1 ? "right-0 left-auto" : ""}`}>
                {item.children.map((child) => (
                  <NavigationMenuLink key={child.slug} asChild>
                    <Link
                      href={child.slug}
                      className="block whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium !text-white no-underline border border-white/15 mb-1 last:mb-0 transition-colors hover:bg-primary hover:border-primary hover:!text-white visited:!text-white"
                    >
                      {child.title}
                    </Link>
                  </NavigationMenuLink>
                ))}
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={item.slug}>
              <NavigationMenuLink asChild>
                <Link
                  href={item.slug}
                  className="inline-flex h-9 w-max items-center justify-center rounded-lg px-2.5 py-1.5 text-sm font-medium !text-white no-underline transition-colors hover:bg-primary hover:!text-white visited:!text-white"
                >
                  {item.title}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )
        )}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
