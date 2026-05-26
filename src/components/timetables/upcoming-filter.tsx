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
  destinations: string[]
  selected: string
}

export function UpcomingFilter(props: IProps) {
  const { destinations, selected } = props
  const formRef = useRef<HTMLFormElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleChange(value: string) {
    if (inputRef.current) inputRef.current.value = value === "all" ? "" : value
    formRef.current?.submit()
  }

  return (
    <form ref={formRef} method="GET" className="space-y-1.5">
      <Label>Filter by destination</Label>
      <input ref={inputRef} type="hidden" name="destination" defaultValue={selected} />
      <Select defaultValue={selected || "all"} onValueChange={handleChange}>
        <SelectTrigger className="w-56">
          <SelectValue placeholder="All destinations" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All destinations</SelectItem>
          {destinations.map((d) => (
            <SelectItem key={d} value={d}>
              {d}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </form>
  )
}
