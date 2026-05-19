"use client"

import { mainMenu } from "@/config/navigation"
import { NavItem } from "./nav-item"
import type { INav } from "@/types/nav-t"

type IProps = { menu?: INav[] }

export function Nav(props?: IProps) {
  const { menu = mainMenu } = props ?? {}

  return (
    <nav className="flex flex-1 items-center justify-end gap-4">
      {menu.map((item) => (
        <NavItem key={item.slug} item={item} />
      ))}
    </nav>
  )
}
