"use client"

import { useRef } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface IProps {
  selected: string
}

export function DailyFilter(props: IProps) {
  const { selected } = props

  return (
    <form method="GET" className="flex items-end gap-3">
      <div className="space-y-1.5">
        <Label htmlFor="date">Filter by date</Label>
        <Input
          id="date"
          name="date"
          type="date"
          defaultValue={selected}
          className="w-48"
        />
      </div>
      <Button type="submit" size="sm">Show</Button>
      {selected && (
        <Link href="/timetables/daily" className="text-sm text-muted-foreground underline-offset-4 hover:underline self-end pb-1">
          Clear
        </Link>
      )}
    </form>
  )
}
