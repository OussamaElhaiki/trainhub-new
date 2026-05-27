import { getSchedules } from "@/lib/schedule-db"
import { getDictionary } from "@/lib/dictionary"
import { StationDeparturesView } from "@/components/stations/station-departures-view"

interface IProps {
  params: Promise<{ lang: string }>
}

export default async function StationDeparturesPage(props: IProps) {
  const { lang } = await props.params
  const [schedules, dict] = await Promise.all([getSchedules(), getDictionary(lang)])
  return <StationDeparturesView schedules={schedules} dict={dict} />
}
