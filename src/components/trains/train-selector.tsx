"use client"

import { useRouter } from "next/navigation"
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

export function TrainSelector({ trains, selected }: IProps) {
  const router = useRouter()

  return (
    <Select
      value={selected}
      onValueChange={(value: string) =>
        router.push(`/trains/schedule?train=${value}`)
      }
    >
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
