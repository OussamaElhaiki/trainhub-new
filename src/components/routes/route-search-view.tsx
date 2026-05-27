import { RouteSearchForm } from "@/components/routes/route-search-form"
import type { IDictionary } from "@/lib/dictionary"
import type { ISchedule } from "@/types/schedule-t"

interface IProps {
  schedules: ISchedule[]
  destinations: string[]
  selected: string
  dict: IDictionary
}

export function RouteSearchView(props: IProps) {
  const { schedules, destinations, selected, dict } = props
  const p = dict.pages.routeSearch
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{p.title}</h1>
        <p className="mt-1 text-muted-foreground">{p.subtitle}</p>
      </div>
      <RouteSearchForm schedules={schedules} destinations={destinations} selected={selected} />
    </div>
  )
}
