import { getSchedules } from "@/lib/schedule-db"
import { sortByDepartureTime, statusConfig, getUniquePlatforms } from "@/lib/train-utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScheduleStatus } from "@/constants/status"
import { PlatformFilter } from "@/components/timetables/platform-filter"

interface IProps {
  searchParams: Promise<{ platform?: string }>
}

export default async function PlatformSchedulesPage(props: IProps) {
  const { platform } = await props.searchParams

  const all = await getSchedules()
  const active = all.filter((s) => s.status !== ScheduleStatus.Archived)
  const allPlatforms = getUniquePlatforms(active)

  const filtered = platform ? active.filter((s) => s.platform === platform) : active
  const sorted = sortByDepartureTime(filtered)

  const byPlatform = new Map<string, typeof sorted>()
  const platformsToShow = platform ? [platform] : allPlatforms
  for (const p of platformsToShow) {
    const schedules = sorted.filter((s) => s.platform === p)
    if (schedules.length > 0) byPlatform.set(p, schedules)
  }

  return (
    <main className="container mx-auto px-6 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Platform Schedule</h1>
        <p className="text-muted-foreground mt-1">Departures grouped by platform</p>
      </div>

      <PlatformFilter platforms={allPlatforms} selected={platform ?? ""} />

      {byPlatform.size === 0 && (
        <p className="text-muted-foreground">No schedules found{platform ? ` for platform ${platform}` : ""}.</p>
      )}

      {[...byPlatform.entries()].map(([p, schedules]) => (
        <section key={p} className="space-y-3">
          <h2 className="text-xl font-semibold border-b border-border pb-2">
            Platform {p}
            <span className="ml-3 text-sm font-normal text-muted-foreground">
              {schedules.length} departure{schedules.length !== 1 ? "s" : ""}
            </span>
          </h2>
          <div className="rounded-lg border border-border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Departure</TableHead>
                  <TableHead>Train</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Arrival</TableHead>
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
                      <TableCell className="font-mono">{s.arrivalTime.slice(11, 16)}</TableCell>
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
