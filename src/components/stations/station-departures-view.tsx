import { StationDeparturesPanel } from "@/components/stations/station-departures-panel"
import { getUniqueDestinations } from "@/lib/train-utils"
import type { ISchedule } from "@/types/schedule-t"

interface IProps {
  schedules: ISchedule[]
}

export function StationDeparturesView(props: IProps) {
  const { schedules } = props
  const stations = getUniqueDestinations(schedules)
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Departures</h1>
        <p className="mt-1 text-muted-foreground">
          Return departures from each arrival station back towards Vilnius.
        </p>
      </div>
      <StationDeparturesPanel schedules={schedules} stations={stations} />
    </div>
  )
}
