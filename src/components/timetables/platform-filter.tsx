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

interface IProps {
  platforms: string[]
  selected: string
}

export function PlatformFilter(props: IProps) {
  const { platforms, selected } = props
  const formRef = useRef<HTMLFormElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleChange(value: string) {
    if (inputRef.current) inputRef.current.value = value === "all" ? "" : value
    formRef.current?.submit()
  }

  return (
    <form ref={formRef} method="GET" className="space-y-1.5">
      <Label>Filter by platform</Label>
      <input ref={inputRef} type="hidden" name="platform" defaultValue={selected} />
      <Select defaultValue={selected || "all"} onValueChange={handleChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="All platforms" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All platforms</SelectItem>
          {platforms.map((p) => (
            <SelectItem key={p} value={p}>
              Platform {p}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </form>
  )
}
