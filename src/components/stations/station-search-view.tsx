import { StationSearchForm } from "@/components/stations/station-search-form"
import type { ISchedule } from "@/types/schedule-t"
import type { IStation } from "@/types/station-t"

interface IProps {
  stations: IStation[]
  schedules: ISchedule[]
  selected: string
}

export function StationSearchView(props: IProps) {
  const { stations, schedules, selected } = props
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Station Search</h1>
        <p className="mt-1 text-muted-foreground">
          Select a station to view all trains serving it.
        </p>
      </div>
      <StationSearchForm stations={stations} schedules={schedules} selected={selected} />
    </div>
  )
}
