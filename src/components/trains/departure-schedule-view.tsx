import { getUniqueDestinations, sortByDepartureTime } from "@/lib/train-utils"
import { DeparturePanel } from "@/components/trains/departure-panel"
import type { ISchedule } from "@/types/schedule-t"

interface IProps {
  schedules: ISchedule[]
}

export function DepartureScheduleView(props: IProps) {
  const { schedules } = props
  const sorted = sortByDepartureTime(schedules)
  const stations = getUniqueDestinations(schedules)
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Departure Schedule</h1>
        <p className="mt-1 text-muted-foreground">
          All trains departing from Vilnius, sorted by departure time.
        </p>
      </div>
      <DeparturePanel schedules={sorted} stations={stations} />
    </div>
  )
}
