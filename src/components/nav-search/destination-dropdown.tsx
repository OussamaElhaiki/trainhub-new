"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface IProps {
  destinations: string[]
  selected: string
  onSelect: (value: string) => void
}

export function DestinationDropdown(props: IProps) {
  const { destinations, selected, onSelect } = props

  return (
    <Select value={selected} onValueChange={onSelect}>
      <SelectTrigger className="w-44 h-8 text-sm">
        <SelectValue placeholder="Where to?" />
      </SelectTrigger>
      <SelectContent>
        {destinations.map((d) => (
          <SelectItem key={d} value={d}>
            {d}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
