import { getSchedules } from "@/lib/schedule-db"
import { sortByDepartureTime, statusConfig } from "@/lib/train-utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScheduleStatus } from "@/constants/status"
import { DailyFilter } from "@/components/timetables/daily-filter"

interface IProps {
  searchParams: Promise<{ date?: string }>
}

export default async function DailySchedulesPage(props: IProps) {
  const { date } = await props.searchParams

  const all = await getSchedules()
  const active = all.filter((s) => s.status !== ScheduleStatus.Archived)
  const sorted = sortByDepartureTime(active)

  const filtered = date ? sorted.filter((s) => s.departureTime.startsWith(date)) : sorted

  const byDate = new Map<string, typeof sorted>()
  for (const s of filtered) {
    const d = s.departureTime.slice(0, 10)
    byDate.set(d, [...(byDate.get(d) ?? []), s])
  }

  return (
    <main className="container mx-auto px-6 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Daily Schedule</h1>
        <p className="text-muted-foreground mt-1">Departures grouped by date</p>
      </div>

      <DailyFilter selected={date ?? ""} />

      {byDate.size === 0 && (
        <p className="text-muted-foreground">No schedules found{date ? ` for ${date}` : ""}.</p>
      )}

      {[...byDate.entries()].map(([d, schedules]) => (
        <section key={d} className="space-y-3">
          <h2 className="text-xl font-semibold border-b border-border pb-2">
            {new Date(d).toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            <span className="ml-3 text-sm font-normal text-muted-foreground">
              {schedules.length} departure{schedules.length !== 1 ? "s" : ""}
            </span>
          </h2>
          <div className="rounded-lg border border-border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Train</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Carriages</TableHead>
                  <TableHead>Seats</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedules.map((s) => {
                  const status = statusConfig[s.status]
                  return (
                    <TableRow key={s.id}>
                      <TableCell className="font-mono font-semibold">{s.departureTime.slice(11, 16)}</TableCell>
                      <TableCell className="font-medium">{s.trainNumber}</TableCell>
                      <TableCell>{s.arrivalStation}</TableCell>
                      <TableCell>{s.platform}</TableCell>
                      <TableCell>{s.carriages}</TableCell>
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
        </section>
      ))}
    </main>
  )
}
