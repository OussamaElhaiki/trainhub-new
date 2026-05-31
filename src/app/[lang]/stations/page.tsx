import { getApi } from "@/utils/server-api"
import { getDictionary } from "@/lib/dictionary"
import { AllStationsView } from "@/components/stations/all-stations-view"
import type { IStation } from "@/types/station-t"

interface IProps {
  params: Promise<{ lang: string }>
}

export default async function AllStationsPage(props: IProps) {
  const { lang } = await props.params
  const [stations, dict] = await Promise.all([
    getApi<IStation[]>("/api/stations").then((r) => r ?? []),
    getDictionary(lang),
  ])
  return <AllStationsView stations={stations} dict={dict} />
}
