"use client"

import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface IProps {
  trains: { trainNumber: string }[]
  selected: string
}

export function TrainSelector(props: IProps) {
  const { trains } = props
  const [selected, setSelected] = useState(props.selected)

  return (
    <Select value={selected} onValueChange={setSelected}>
      <SelectTrigger className="w-64">
        <SelectValue placeholder="Select a train number" />
      </SelectTrigger>
      <SelectContent>
        {trains.map((t) => (
          <SelectItem key={t.trainNumber} value={t.trainNumber}>
            {t.trainNumber}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
