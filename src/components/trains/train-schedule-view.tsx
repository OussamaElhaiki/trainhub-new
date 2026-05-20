import { SchedulePanel } from "@/components/trains/schedule-panel"
import type { ISchedule } from "@/types/schedule-t"
import type { ITrain } from "@/types/train-t"

interface IProps {
  schedules: ISchedule[]
  trains: ITrain[]
}

export function TrainScheduleView(props: IProps) {
  const { schedules, trains } = props
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Train Schedule</h1>
        <p className="mt-1 text-muted-foreground">
          Manage all train schedules departing from Vilnius.
        </p>
      </div>
      <SchedulePanel schedules={schedules} trains={trains} />
    </div>
  )
}
