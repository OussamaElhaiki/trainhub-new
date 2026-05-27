import { TrainsPanel } from "@/components/trains/trains-panel"
import type { IDictionary } from "@/lib/dictionary"
import type { ITrain } from "@/types/train-t"

interface IProps {
  trains: ITrain[]
  dict: IDictionary
}

export function AllTrainsView(props: IProps) {
  const { trains, dict } = props
  const p = dict.pages.allTrains
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{p.title}</h1>
        <p className="mt-1 text-muted-foreground">{p.subtitle}</p>
      </div>
      <TrainsPanel trains={trains} />
    </div>
  )
}
