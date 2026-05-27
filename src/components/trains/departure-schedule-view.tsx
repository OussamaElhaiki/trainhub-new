import { getUniqueDestinations, sortByDepartureTime } from "@/lib/train-utils"
import { DeparturePanel } from "@/components/trains/departure-panel"
import type { IDictionary } from "@/lib/dictionary"
import type { ISchedule } from "@/types/schedule-t"

interface IProps {
  schedules: ISchedule[]
  dict: IDictionary
}

export function DepartureScheduleView(props: IProps) {
  const { schedules, dict } = props
  const sorted = sortByDepartureTime(schedules)
  const stations = getUniqueDestinations(schedules)
  const p = dict.pages.departureSchedule
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{p.title}</h1>
        <p className="mt-1 text-muted-foreground">{p.subtitle}</p>
      </div>
      <DeparturePanel schedules={sorted} stations={stations} />
    </div>
  )
}
