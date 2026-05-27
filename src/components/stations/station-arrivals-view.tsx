import { StationArrivalsPanel } from "@/components/stations/station-arrivals-panel"
import { getUniqueDestinations } from "@/lib/train-utils"
import type { IDictionary } from "@/lib/dictionary"
import type { ISchedule } from "@/types/schedule-t"

interface IProps {
  schedules: ISchedule[]
  dict: IDictionary
}

export function StationArrivalsView(props: IProps) {
  const { schedules, dict } = props
  const stations = getUniqueDestinations(schedules)
  const p = dict.pages.arrivalTimes
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{p.title}</h1>
        <p className="mt-1 text-muted-foreground">{p.subtitle}</p>
      </div>
      <StationArrivalsPanel schedules={schedules} stations={stations} />
    </div>
  )
}
