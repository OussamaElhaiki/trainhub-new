import { getApi } from "@/utils/server-api"
import { DepartureScheduleView } from "@/components/trains/departure-schedule-view"
import type { ISchedule } from "@/types/schedule-t"

export default async function DepartureSchedulePage() {
  const schedules = await getApi<ISchedule[]>("/api/schedules") ?? []
  return <DepartureScheduleView schedules={schedules} />
}
