import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { TrainDetailsDialog } from "@/components/trains/train-details-dialog"
import { getTrains } from "@/lib/train-db"
import { statusConfig, calculateDuration } from "@/lib/train-utils"

export default async function AllTrainsPage() {
  const trains = await getTrains()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">All Trains</h1>
        <p className="mt-1 text-muted-foreground">
          All trains departing from Vilnius railway station today.
        </p>
      </div>

      <div className="rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Train</TableHead>
              <TableHead>Departure</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Arrival</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Carriages</TableHead>
              <TableHead>Seats</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trains.map((train) => {
              const status = statusConfig[train.status]
              return (
                <TableRow key={train.id}>
                  <TableCell className="font-medium">{train.trainNumber}</TableCell>
                  <TableCell>{train.departureTime}</TableCell>
                  <TableCell>{train.arrivalStation}</TableCell>
                  <TableCell>{train.arrivalTime}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {calculateDuration(train.departureTime, train.arrivalTime)}
                  </TableCell>
                  <TableCell>{train.platform}</TableCell>
                  <TableCell>{train.carriages}</TableCell>
                  <TableCell>{train.seats}</TableCell>
                  <TableCell>
                    <span className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${status.className}`}>
                      {status.label}
                    </span>
                  </TableCell>
                  <TableCell>
                    <TrainDetailsDialog train={train} />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      <p className="text-xs text-muted-foreground">
        Total: {trains.length} trains scheduled today.
      </p>
    </div>
  )
}
