import { StationArrivalsPanel } from "@/components/stations/station-arrivals-panel"
import { getUniqueDestinations } from "@/lib/train-utils"
import type { ISchedule } from "@/types/schedule-t"

interface IProps {
  schedules: ISchedule[]
}

export function StationArrivalsView(props: IProps) {
  const { schedules } = props
  const stations = getUniqueDestinations(schedules)
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Arrival Times</h1>
        <p className="mt-1 text-muted-foreground">
          Trains arriving at each station, sorted by arrival time.
        </p>
      </div>
      <StationArrivalsPanel schedules={schedules} stations={stations} />
    </div>
  )
}
