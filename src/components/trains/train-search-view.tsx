import { TrainSearchForm } from "@/components/trains/train-search-form"
import type { ISchedule } from "@/types/schedule-t"
import type { ITrain } from "@/types/train-t"

interface IProps {
  trains: ITrain[]
  schedules: ISchedule[]
  selected: string
}

export function TrainSearchView(props: IProps) {
  const { trains, schedules, selected } = props
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Train Search</h1>
        <p className="mt-1 text-muted-foreground">
          Select a train to view all its schedules.
        </p>
      </div>
      <TrainSearchForm trains={trains} schedules={schedules} selected={selected} />
    </div>
  )
}
