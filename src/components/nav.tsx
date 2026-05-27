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
import type { IDictionary } from "@/lib/dictionary"
import type { INavGroup } from "@/types/nav-t"

interface IProps {
  lang: string
  dict: IDictionary
  role?: string
  navGroups: INavGroup[]
}

export function Nav(props: IProps) {
  const { lang, dict, role, navGroups = [] } = props

  if (!role) return null

  const menu = navGroups
    .map((group) => ({
      key: group.key,
      title: dict.nav[group.key as keyof typeof dict.nav] ?? group.key,
      children: group.children
        .filter((child) => !child.role || child.role === role)
        .map((child) => ({
          key: child.key,
          title: dict.nav[child.key as keyof typeof dict.nav] ?? child.key,
          href: `/${lang}${child.slug}`,
        })),
    }))
    .filter((group) => group.children.length > 0)

  return (
    <NavigationMenu viewport={false} className="ml-auto">
      <NavigationMenuList>
        {menu.map((group, index) => (
          <NavigationMenuItem key={group.key}>
            <NavigationMenuTrigger className="bg-transparent text-white hover:bg-primary hover:text-white focus:bg-transparent data-open:bg-primary data-open:text-white">
              {group.title}
            </NavigationMenuTrigger>
            <NavigationMenuContent className={`min-w-[180px] !bg-card !shadow-xl !ring-primary/20 ${index === menu.length - 1 ? "right-0 left-auto" : ""}`}>
              {group.children.map((child) => (
                <NavigationMenuLink key={child.href} asChild>
                  <Link
                    href={child.href}
                    className="block whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium !text-white no-underline border border-white/15 mb-1 last:mb-0 transition-colors hover:bg-primary hover:border-primary hover:!text-white visited:!text-white"
                  >
                    {child.title}
                  </Link>
                </NavigationMenuLink>
              ))}
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
