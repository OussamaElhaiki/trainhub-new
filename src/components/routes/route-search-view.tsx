import { RouteSearchForm } from "@/components/routes/route-search-form"
import type { ISchedule } from "@/types/schedule-t"

interface IProps {
  schedules: ISchedule[]
  destinations: string[]
  selected: string
}

export function RouteSearchView(props: IProps) {
  const { schedules, destinations, selected } = props
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Route Search</h1>
        <p className="mt-1 text-muted-foreground">
          Find trains between Vilnius and your destination.
        </p>
      </div>
      <RouteSearchForm schedules={schedules} destinations={destinations} selected={selected} />
    </div>
  )
}
