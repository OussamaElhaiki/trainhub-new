import { StationsPanel } from "@/components/stations/stations-panel"
import type { IDictionary } from "@/lib/dictionary"
import type { IStation } from "@/types/station-t"

interface IProps {
  stations: IStation[]
  dict: IDictionary
}

export function AllStationsView(props: IProps) {
  const { stations, dict } = props
  const p = dict.pages.allStations
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{p.title}</h1>
        <p className="mt-1 text-muted-foreground">{p.subtitle}</p>
      </div>
      <StationsPanel stations={stations} />
    </div>
  )
}
