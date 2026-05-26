import { getSchedules } from "@/lib/schedule-db"
import { formatDateTime, sortByDepartureTime, calculateDuration, statusConfig, getUniqueDestinations } from "@/lib/train-utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScheduleStatus } from "@/constants/status"
import { UpcomingFilter } from "@/components/timetables/upcoming-filter"

interface IProps {
  searchParams: Promise<{ destination?: string }>
}

export default async function UpcomingDeparturesPage(props: IProps) {
  const { destination } = await props.searchParams

  const all = await getSchedules()
  const now = new Date().toISOString().slice(0, 16)

  const active = all.filter((s) => s.status !== ScheduleStatus.Archived && s.departureTime > now)
  const destinations = getUniqueDestinations(active)

  const filtered = destination ? active.filter((s) => s.arrivalStation === destination) : active
  const upcoming = sortByDepartureTime(filtered)

  return (
    <main className="container mx-auto px-6 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Upcoming Departures</h1>
        <p className="text-muted-foreground mt-1">
          {upcoming.length} departure{upcoming.length !== 1 ? "s" : ""} scheduled from now
          {destination ? ` to ${destination}` : ""}
        </p>
      </div>

      <UpcomingFilter destinations={destinations} selected={destination ?? ""} />

      <div className="rounded-lg border border-border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Departure</TableHead>
              <TableHead>Train</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Arrival</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Seats</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {upcoming.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                  No upcoming departures found{destination ? ` to ${destination}` : ""}.
                </TableCell>
              </TableRow>
            )}
            {upcoming.map((s) => {
              const status = statusConfig[s.status]
              return (
                <TableRow key={s.id}>
                  <TableCell className="font-mono font-semibold">{formatDateTime(s.departureTime)}</TableCell>
                  <TableCell className="font-medium">{s.trainNumber}</TableCell>
                  <TableCell>{s.arrivalStation}</TableCell>
                  <TableCell className="font-mono">{s.arrivalTime.slice(11, 16)}</TableCell>
                  <TableCell className="text-muted-foreground">{calculateDuration(s.departureTime, s.arrivalTime)}</TableCell>
                  <TableCell>{s.platform}</TableCell>
                  <TableCell>{s.seats}</TableCell>
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
    </main>
  )
}
