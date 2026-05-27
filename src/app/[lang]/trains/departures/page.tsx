import { getSchedules } from "@/lib/schedule-db"
import { getDictionary } from "@/lib/dictionary"
import { DepartureScheduleView } from "@/components/trains/departure-schedule-view"

interface IProps {
  params: Promise<{ lang: string }>
}

export default async function DepartureSchedulePage(props: IProps) {
  const { lang } = await props.params
  const [schedules, dict] = await Promise.all([getSchedules(), getDictionary(lang)])
  return <DepartureScheduleView schedules={schedules} dict={dict} />
}
