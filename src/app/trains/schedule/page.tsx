import { getApi } from "@/utils/server-api"
import { TrainScheduleView } from "@/components/trains/train-schedule-view"
import type { ITrain } from "@/types/train-t"
import type { ISchedule } from "@/types/schedule-t"

export default async function TrainSchedulePage() {
  const [trains, schedules] = await Promise.all([
    getApi<ITrain[]>("/api/trains"),
    getApi<ISchedule[]>("/api/schedules"),
  ])
  return <TrainScheduleView trains={trains ?? []} schedules={schedules ?? []} />
}
