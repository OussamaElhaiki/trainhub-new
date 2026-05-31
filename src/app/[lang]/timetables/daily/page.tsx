import { getApi } from "@/utils/server-api"
import { getDictionary } from "@/lib/dictionary"
import { sortByDepartureTime, filterActiveSchedules } from "@/lib/train-utils"
import type { ISchedule } from "@/types/schedule-t"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DailyFilter } from "@/components/timetables/daily-filter"

interface IProps {
  params: Promise<{ lang: string }>
  searchParams: Promise<{ date?: string }>
}

export default async function DailySchedulesPage(props: IProps) {
  const { lang } = await props.params
  const { date } = await props.searchParams
  const [all, dict] = await Promise.all([
    getApi<ISchedule[]>("/api/schedules").then((r) => r ?? []),
    getDictionary(lang),
  ])
  const p = dict.pages.dailySchedule
  const c = dict.common

  const active = filterActiveSchedules(all)
  const sorted = sortByDepartureTime(active)
  const filtered = date ? sorted.filter((s) => s.departureTime.startsWith(date)) : sorted

  const byDate = new Map<string, typeof sorted>()
  for (const s of filtered) {
    const d = s.departureTime.slice(0, 10)
    byDate.set(d, [...(byDate.get(d) ?? []), s])
  }

  const locale = lang === "fr" ? "fr-FR" : "en-GB"

  return (
    <main className="container mx-auto px-6 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{p.title}</h1>
        <p className="text-muted-foreground mt-1">{p.subtitle}</p>
      </div>

      <DailyFilter lang={lang} selected={date ?? ""} />

      {byDate.size === 0 && (
        <p className="text-muted-foreground">{p.noSchedules}{date ? ` for ${date}` : ""}.</p>
      )}

      {[...byDate.entries()].map(([d, schedules]) => (
        <section key={d} className="space-y-3">
          <h2 className="text-xl font-semibold border-b border-border pb-2">
            {new Date(d).toLocaleDateString(locale, { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            <span className="ml-3 text-sm font-normal text-muted-foreground">
              {schedules.length} {schedules.length !== 1 ? c.departuresWord : c.departureWord}
            </span>
          </h2>
          <div className="rounded-lg border border-border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{c.time}</TableHead>
                  <TableHead>{c.train}</TableHead>
                  <TableHead>{c.destination}</TableHead>
                  <TableHead>{c.platform}</TableHead>
                  <TableHead>{c.carriages}</TableHead>
                  <TableHead>{c.seats}</TableHead>
                  <TableHead>{c.status}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedules.map((s) => {
                  const statusLabel = dict.status[s.status as keyof typeof dict.status]
                  return (
                    <TableRow key={s.id}>
                      <TableCell className="font-mono font-semibold">{s.departureTime.slice(11, 16)}</TableCell>
                      <TableCell className="font-medium">{s.trainNumber}</TableCell>
                      <TableCell>{s.arrivalStation}</TableCell>
                      <TableCell>{s.platform}</TableCell>
                      <TableCell>{s.carriages}</TableCell>
                      <TableCell>{s.seats}</TableCell>
                      <TableCell>
                        <span className={`rounded-full border px-2 py-0.5 text-xs font-semibold`}>
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
