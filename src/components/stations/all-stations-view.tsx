import { StationsPanel } from "@/components/stations/stations-panel"
import type { IStation } from "@/types/station-t"

interface IProps {
  stations: IStation[]
}

export function AllStationsView(props: IProps) {
  const { stations } = props
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">All Stations</h1>
        <p className="mt-1 text-muted-foreground">
          Manage the list of arrival stations served from Vilnius railway station.
        </p>
      </div>
      <StationsPanel stations={stations} />
    </div>
  )
}
