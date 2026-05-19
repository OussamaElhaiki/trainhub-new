import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { mockTrains } from "@/data/trains"
import { statusConfig, sortByDepartureTime } from "@/lib/train-utils"

export default function DepartureSchedulePage() {
  const trains = sortByDepartureTime(mockTrains)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Departure Schedule</h1>
        <p className="mt-1 text-muted-foreground">
          All trains departing from Vilnius, sorted by departure time.
        </p>
      </div>

      <div className="rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Train</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trains.map((train) => {
              const status = statusConfig[train.status]
              return (
                <TableRow
                  key={train.id}
                  className={train.status === "cancelled" ? "opacity-70" : ""}
                >
                  <TableCell className="font-mono text-lg font-semibold">
                    {train.departureTime}
                  </TableCell>
                  <TableCell className="font-medium">{train.trainNumber}</TableCell>
                  <TableCell>{train.arrivalStation}</TableCell>
                  <TableCell>{train.platform}</TableCell>
                  <TableCell>
                    <span className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${status.className}`}>
                      {status.label}
                    </span>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}