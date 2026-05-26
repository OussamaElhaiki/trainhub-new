"use client"

import { useEffect, useRef, useState } from "react"
import { getApi } from "@/utils/server-api"
import { getUniqueDestinations } from "@/lib/train-utils"
import { DestinationDropdown } from "./destination-dropdown"
import { DepartureList } from "./departure-list"
import type { ISchedule } from "@/types/schedule-t"

export function NavSearch() {
  const [destinations, setDestinations] = useState<string[]>([])
  const [selected, setSelected] = useState("")
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    getApi<ISchedule[]>("/api/schedules").then((data) => {
      if (data) setDestinations(getUniqueDestinations(data))
    })
  }, [])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setSelected("")
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  return (
    <div ref={ref} className="relative flex items-center">
      <DestinationDropdown
        destinations={destinations}
        selected={selected}
        onSelect={setSelected}
      />
      <DepartureList destination={selected} />
    </div>
  )
}
