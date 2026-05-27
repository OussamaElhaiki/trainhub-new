import { getTrains } from "@/lib/train-db"
import { getSchedules } from "@/lib/schedule-db"
import { getStations } from "@/lib/station-db"
import { getDictionary } from "@/lib/dictionary"
import { TrainScheduleView } from "@/components/trains/train-schedule-view"

interface IProps {
  params: Promise<{ lang: string }>
}

export default async function TrainSchedulePage(props: IProps) {
  const { lang } = await props.params
  const [trains, schedules, stations, dict] = await Promise.all([
    getTrains(),
    getSchedules(),
    getStations(),
    getDictionary(lang),
  ])
  return <TrainScheduleView trains={trains} schedules={schedules} stations={stations} dict={dict} />
}
