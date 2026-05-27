import { getStations } from "@/lib/station-db"
import { getDictionary } from "@/lib/dictionary"
import { AllStationsView } from "@/components/stations/all-stations-view"

interface IProps {
  params: Promise<{ lang: string }>
}

export default async function AllStationsPage(props: IProps) {
  const { lang } = await props.params
  const [stations, dict] = await Promise.all([getStations(), getDictionary(lang)])
  return <AllStationsView stations={stations} dict={dict} />
}
