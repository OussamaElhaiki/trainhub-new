"use client"

import { mainMenu } from "@/config/navigation"
import { NavItem } from "./nav-item"

export function Nav() {
  return (
    <nav className="flex flex-1 items-center justify-end gap-2">
      {mainMenu.map((item) => (
        <NavItem key={item.slug} item={item} />
      ))}
    </nav>
  )
}