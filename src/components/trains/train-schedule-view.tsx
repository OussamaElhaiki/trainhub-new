import { SchedulePanel } from "@/components/trains/schedule-panel"
import type { IDictionary } from "@/lib/dictionary"
import type { ISchedule } from "@/types/schedule-t"
import type { ITrain } from "@/types/train-t"
import type { IStation } from "@/types/station-t"

interface IProps {
  schedules: ISchedule[]
  trains: ITrain[]
  stations: IStation[]
  dict: IDictionary
}

export function TrainScheduleView(props: IProps) {
  const { schedules, trains, stations, dict } = props
  const p = dict.pages.trainSchedule
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{p.title}</h1>
        <p className="mt-1 text-muted-foreground">{p.subtitle}</p>
      </div>
      <SchedulePanel schedules={schedules} trains={trains} stations={stations} />
    </div>
  )
}
