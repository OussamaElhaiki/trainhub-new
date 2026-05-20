import { TrainSelector } from "@/components/trains/train-selector"
import { getTrains } from "@/lib/train-db"
import { statusConfig, calculateDuration } from "@/lib/train-utils"

interface IProps {
  searchParams: Promise<{ train?: string }>
}

export default async function TrainSchedulePage(props: IProps) {
  const { searchParams } = props
  const { train: trainNumber } = await searchParams
  const trains = await getTrains()
  const found = trainNumber
    ? trains.find((t) => t.trainNumber === trainNumber)
    : null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Train Schedule</h1>
        <p className="mt-1 text-muted-foreground">
          Select a train to view its full schedule.
        </p>
      </div>

      <TrainSelector trains={trains} selected={trainNumber ?? ""} />

      {trainNumber && !found && (
        <p className="text-sm text-destructive">
          Train &quot;{trainNumber}&quot; was not found.
        </p>
      )}

      {found && (
        <div className="rounded-lg border border-border bg-card p-6 space-y-4 max-w-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Train {found.trainNumber}</h2>
            <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${statusConfig[found.status].className}`}>
              {statusConfig[found.status].label}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
            <div>
              <p className="text-muted-foreground">Departure station</p>
              <p className="font-medium">Vilnius</p>
            </div>
            <div>
              <p className="text-muted-foreground">Departure time</p>
              <p className="font-medium">{found.departureTime}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Arrival station</p>
              <p className="font-medium">{found.arrivalStation}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Arrival time</p>
              <p className="font-medium">{found.arrivalTime}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Travel duration</p>
              <p className="font-medium">
                {calculateDuration(found.departureTime, found.arrivalTime)}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Platform</p>
              <p className="font-medium">{found.platform}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Carriages</p>
              <p className="font-medium">{found.carriages}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Total seats</p>
              <p className="font-medium">{found.seats}</p>
            </div>
          </div>
        </div>
      )}

      {!trainNumber && (
        <p className="text-sm text-muted-foreground">
          Choose a train number above to see its schedule.
        </p>
      )}
    </div>
  )
}
