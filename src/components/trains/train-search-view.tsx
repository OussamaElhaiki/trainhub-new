import { TrainSearchForm } from "@/components/trains/train-search-form"
import type { IDictionary } from "@/lib/dictionary"
import type { ISchedule } from "@/types/schedule-t"
import type { ITrain } from "@/types/train-t"

interface IProps {
  trains: ITrain[]
  schedules: ISchedule[]
  selected: string
  dict: IDictionary
}

export function TrainSearchView(props: IProps) {
  const { trains, schedules, selected, dict } = props
  const p = dict.pages.trainSearch
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{p.title}</h1>
        <p className="mt-1 text-muted-foreground">{p.subtitle}</p>
      </div>
      <TrainSearchForm trains={trains} schedules={schedules} selected={selected} />
    </div>
  )
}
