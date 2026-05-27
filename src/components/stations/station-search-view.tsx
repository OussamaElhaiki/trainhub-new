import { StationSearchForm } from "@/components/stations/station-search-form"
import type { IDictionary } from "@/lib/dictionary"
import type { ISchedule } from "@/types/schedule-t"
import type { IStation } from "@/types/station-t"

interface IProps {
  stations: IStation[]
  schedules: ISchedule[]
  selected: string
  dict: IDictionary
}

export function StationSearchView(props: IProps) {
  const { stations, schedules, selected, dict } = props
  const p = dict.pages.stationSearch
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{p.title}</h1>
        <p className="mt-1 text-muted-foreground">{p.subtitle}</p>
      </div>
      <StationSearchForm stations={stations} schedules={schedules} selected={selected} />
    </div>
  )
}
