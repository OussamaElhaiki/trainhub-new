import { getSchedules } from "@/lib/schedule-db"
import { getDictionary } from "@/lib/dictionary"
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
  params: Promise<{ lang: string }>
  searchParams: Promise<{ platform?: string }>
}

export default async function PlatformSchedulesPage(props: IProps) {
  const { lang } = await props.params
  const { platform } = await props.searchParams
  const [all, dict] = await Promise.all([getSchedules(), getDictionary(lang)])
  const p = dict.pages.platformSchedule
  const c = dict.common

  const active = all.filter((s) => s.status !== ScheduleStatus.Archived)
  const allPlatforms = getUniquePlatforms(active)
  const filtered = platform ? active.filter((s) => s.platform === platform) : active
  const sorted = sortByDepartureTime(filtered)

  const byPlatform = new Map<string, typeof sorted>()
  const platformsToShow = platform ? [platform] : allPlatforms
  for (const pl of platformsToShow) {
    const schedules = sorted.filter((s) => s.platform === pl)
    if (schedules.length > 0) byPlatform.set(pl, schedules)
  }

  return (
    <main className="container mx-auto px-6 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{p.title}</h1>
        <p className="text-muted-foreground mt-1">{p.subtitle}</p>
      </div>

      <PlatformFilter platforms={allPlatforms} selected={platform ?? ""} />

      {byPlatform.size === 0 && (
        <p className="text-muted-foreground">{p.noSchedules}{platform ? ` — ${p.platform} ${platform}` : ""}.</p>
      )}

      {[...byPlatform.entries()].map(([pl, schedules]) => (
        <section key={pl} className="space-y-3">
          <h2 className="text-xl font-semibold border-b border-border pb-2">
            {p.platform} {pl}
            <span className="ml-3 text-sm font-normal text-muted-foreground">
              {schedules.length} {schedules.length !== 1 ? c.departuresWord : c.departureWord}
            </span>
          </h2>
          <div className="rounded-lg border border-border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{c.departure}</TableHead>
                  <TableHead>{c.train}</TableHead>
                  <TableHead>{c.destination}</TableHead>
                  <TableHead>{c.arrival}</TableHead>
                  <TableHead>{c.carriages}</TableHead>
                  <TableHead>{c.seats}</TableHead>
                  <TableHead>{c.status}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedules.map((s) => {
                  const sc = statusConfig[s.status]
                  const statusLabel = dict.status[s.status as keyof typeof dict.status]
                  return (
                    <TableRow key={s.id}>
                      <TableCell className="font-mono font-semibold">{s.departureTime.slice(11, 16)}</TableCell>
                      <TableCell className="font-medium">{s.trainNumber}</TableCell>
                      <TableCell>{s.arrivalStation}</TableCell>
                      <TableCell className="font-mono">{s.arrivalTime.slice(11, 16)}</TableCell>
                      <TableCell>{s.carriages}</TableCell>
                      <TableCell>{s.seats}</TableCell>
                      <TableCell>
                        <span className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${sc.className}`}>
                          {statusLabel}
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
