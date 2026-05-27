"use client"

import { useRef } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useDict } from "@/lib/dictionary-context"

interface IProps {
  platforms: string[]
  selected: string
}

export function PlatformFilter(props: IProps) {
  const { platforms, selected } = props
  const formRef = useRef<HTMLFormElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const dict = useDict()
  const p = dict.pages.platformSchedule

  function handleChange(value: string) {
    if (inputRef.current) inputRef.current.value = value === "all" ? "" : value
    formRef.current?.submit()
  }

  return (
    <form ref={formRef} method="GET" className="space-y-1.5">
      <Label>{p.filterByPlatform}</Label>
      <input ref={inputRef} type="hidden" name="platform" defaultValue={selected} />
      <Select defaultValue={selected || "all"} onValueChange={handleChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder={p.allPlatforms} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{p.allPlatforms}</SelectItem>
          {platforms.map((pl) => (
            <SelectItem key={pl} value={pl}>
              {p.platform} {pl}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </form>
  )
}
