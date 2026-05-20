"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import type { INav } from "@/types/nav-t"

interface IProps {
  item: INav
  align?: "left" | "right"
}

export function NavItem(props: IProps) {
  const { item, align = "left" } = props
  const [open, setOpen] = useState(false)
  const hasChildren = item.children && item.children.length > 0

  if (!hasChildren) {
    return (
      <Link href={item.slug} className="no-underline visited:!text-inherit">
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
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Button
        variant="ghost"
        size="lg"
        className="text-base text-white hover:!text-white hover:!bg-primary transition-colors"
      >
        {item.title}
      </Button>

      {open && (
        <div className={`absolute top-full z-50 pt-1 min-w-48 ${align === "right" ? "right-0" : "left-0"}`}>
          <div className="rounded-lg bg-card border border-border p-1.5 shadow-xl ring-1 ring-primary/20">
            {item.children?.map((child) => (
              <Link
                key={child.slug}
                href={child.slug}
                className="block rounded-md px-3 py-2 text-sm font-medium !text-white no-underline transition-colors border border-white/15 mb-1 last:mb-0 hover:bg-primary hover:border-primary hover:!text-white hover:no-underline visited:!text-white"
              >
                {child.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
