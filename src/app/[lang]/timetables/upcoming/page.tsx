import { getApi } from "@/utils/server-api"
import { getDictionary } from "@/lib/dictionary"
import { formatDateTime, sortByDepartureTime, calculateDuration, statusConfig, getUniqueDestinations, filterActiveSchedules } from "@/lib/train-utils"
import type { ISchedule } from "@/types/schedule-t"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { UpcomingFilter } from "@/components/timetables/upcoming-filter"

interface IProps {
  params: Promise<{ lang: string }>
  searchParams: Promise<{ destination?: string }>
}

export default async function UpcomingDeparturesPage(props: IProps) {
  const { lang } = await props.params
  const { destination } = await props.searchParams
  const [all, dict] = await Promise.all([
    getApi<ISchedule[]>("/api/schedules").then((r) => r ?? []),
    getDictionary(lang),
  ])
  const p = dict.pages.upcomingDepartures
  const c = dict.common

  const now = new Date().toISOString().slice(0, 16)
  const active = filterActiveSchedules(all).filter((s) => s.departureTime > now)
  const destinations = getUniqueDestinations(active)
  const filtered = destination ? active.filter((s) => s.arrivalStation === destination) : active
  const upcoming = sortByDepartureTime(filtered)

  return (
    <main className="container mx-auto px-6 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{p.title}</h1>
        <p className="text-muted-foreground mt-1">
          {upcoming.length} {upcoming.length !== 1 ? c.departuresWord : c.departureWord} {p.scheduledFromNow}
          {destination ? ` ${p.to} ${destination}` : ""}
        </p>
      </div>

      <UpcomingFilter destinations={destinations} selected={destination ?? ""} />

      <div className="rounded-lg border border-border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{c.departure}</TableHead>
              <TableHead>{c.train}</TableHead>
              <TableHead>{c.destination}</TableHead>
              <TableHead>{c.arrival}</TableHead>
              <TableHead>{c.duration}</TableHead>
              <TableHead>{c.platform}</TableHead>
              <TableHead>{c.seats}</TableHead>
              <TableHead>{c.status}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {upcoming.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                  {p.noResults}{destination ? ` ${p.to} ${destination}` : ""}.
                </TableCell>
              </TableRow>
            )}
            {upcoming.map((s) => {
              const sc = statusConfig[s.status]
              const statusLabel = dict.status[s.status as keyof typeof dict.status]
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
    </main>
  )
}
