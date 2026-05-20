import { TrainsPanel } from "@/components/trains/trains-panel"
import type { ITrain } from "@/types/train-t"

interface IProps {
  trains: ITrain[]
}

export function AllTrainsView(props: IProps) {
  const { trains } = props
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">All Trains</h1>
        <p className="mt-1 text-muted-foreground">
          Manage the list of trains departing from Vilnius railway station.
        </p>
      </div>
      <TrainsPanel trains={trains} />
    </div>
  )
}
