"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { INav } from "@/types/nav-t"

type IProps = { item: INav }

export function NavItem(props: IProps) {
  const { item } = props
  const [open, setOpen] = useState(false)
  const hasChildren = item.children && item.children.length > 0

  if (!hasChildren) {
    return (
      <Link href={item.slug}>
        <Button
          variant="ghost"
          size="lg"
          className="text-base text-white hover:!text-white hover:!bg-primary transition-colors"
        >
          {item.title}
        </Button>
      </Link>
    )
  }

  return (
    <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="lg"
            className="text-base text-white hover:!text-white hover:!bg-primary transition-colors"
          >
            {item.title}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="mt-2 z-50">
          {item.children?.map((child) => (
            <DropdownMenuItem key={child.slug} asChild>
              <Link
                href={child.slug}
                className="cursor-pointer !text-white hover:!text-white no-underline hover:no-underline visited:!text-white"
              >
                {child.title}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
