import { getSchedules } from "@/lib/schedule-db"
import { getDictionary } from "@/lib/dictionary"
import { StationArrivalsView } from "@/components/stations/station-arrivals-view"

interface IProps {
  params: Promise<{ lang: string }>
}

export default async function ArrivalTimesPage(props: IProps) {
  const { lang } = await props.params
  const [schedules, dict] = await Promise.all([getSchedules(), getDictionary(lang)])
  return <StationArrivalsView schedules={schedules} dict={dict} />
}
