"use client"

import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useDict } from "@/lib/dictionary-context"

interface IProps {
  lang: string
  selected: string
}

export function DailyFilter(props: IProps) {
  const { lang, selected } = props
  const dict = useDict()
  const p = dict.pages.dailySchedule

  return (
    <form method="GET" className="flex items-end gap-3">
      <div className="space-y-1.5">
        <Label htmlFor="date">{p.filterByDate}</Label>
        <Input
          id="date"
          name="date"
          type="date"
          defaultValue={selected}
          className="w-48"
        />
      </div>
      <Button type="submit" size="sm">{p.show}</Button>
      {selected && (
        <Link href={`/${lang}/timetables/daily`} className="text-sm text-muted-foreground underline-offset-4 hover:underline self-end pb-1">
          {p.clear}
        </Link>
      )}
    </form>
  )
}
