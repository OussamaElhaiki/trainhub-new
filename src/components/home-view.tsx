import Link from "next/link"
import { TrainFrontIcon, ArrowRightIcon, ClockIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { statusConfig } from "@/lib/train-utils"
import type { ISchedule } from "@/types/schedule-t"

interface IProps {
  trainCount: number
  stationCount: number
  scheduleCount: number
  schedules: ISchedule[]
}

export function HomeView(props: IProps) {
  const { trainCount, stationCount, scheduleCount, schedules } = props

  const upcoming = schedules
    .filter((s) => s.status !== "archived")
    .sort((a, b) => a.departureTime.localeCompare(b.departureTime))
    .slice(0, 6)

  return (
    <div className="flex flex-col items-center space-y-12 py-12">

      {/* Hero */}
      <div className="text-center space-y-6 max-w-3xl">
        <h1 className="text-5xl sm:text-6xl font-black tracking-tighter text-foreground">
          Vilnius <span className="text-primary">Railway</span> Station
        </h1>
        <p className="text-lg text-muted-foreground  leading-relaxed">
          Real-time train schedules, platform information, and complete route management.<br></br>All in one place.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="shadow-lg shadow-primary/20 gap-2">
            <Link href="/timetables/upcoming">
              <ClockIcon className="size-4" />
              View Departures
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="gap-2">
            <Link href="/trains/search">
              Search Trains
              <ArrowRightIcon className="size-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 w-full max-w-3xl">
        {[
          { value: trainCount, label: "Trains", href: "/trains" },
          { value: stationCount, label: "Stations", href: "/stations" },
          { value: scheduleCount, label: "Schedules", href: "/trains/schedule" },
        ].map((stat) => (
          <Button key={stat.label} asChild variant="ghost" className="h-auto p-0 rounded-xl group">
            <Link href={stat.href}>
              <Card className="w-full text-center py-6 px-4 hover:border-primary/40 transition-all">
                <CardContent className="p-0 space-y-1">
                  <p className="text-4xl font-black text-primary tabular-nums">{stat.value}</p>
                  <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                </CardContent>
              </Card>
            </Link>
          </Button>
        ))}
      </div>

      {/* Departure board */}
      <div className="w-full max-w-3xl">
        <Card className="overflow-hidden border-border/60 shadow-2xl shadow-black/30">
          <CardHeader className="px-5 py-3 border-b border-border/50 flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-2">
              <TrainFrontIcon className="size-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Departures
              </span>
            </div>
            <Badge
              variant="outline"
              className="border-green-500/30 bg-green-500/10 text-green-400 text-xs gap-1.5 rounded-full"
            >
              <span className="size-1.5 rounded-full bg-green-400 inline-block" />
              Live
            </Badge>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-border/40 hover:bg-transparent">
                  <TableHead className="px-5 py-2 text-xs w-40">Time</TableHead>
                  <TableHead className="px-5 py-2 text-xs">Destination</TableHead>
                  <TableHead className="px-5 py-2 text-xs text-center w-12">Pl.</TableHead>
                  <TableHead className="px-5 py-2 text-xs text-right w-28">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcoming.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="px-5 py-8 text-center text-muted-foreground text-sm">
                      No upcoming departures.
                    </TableCell>
                  </TableRow>
                )}
                {upcoming.map((row) => (
                  <TableRow key={row.id} className="border-border/30">
                    <TableCell className="px-5 py-3 font-mono text-sm font-bold">
                      {row.departureTime.slice(11, 16)}
                    </TableCell>
                    <TableCell className="px-5 py-3 text-sm font-medium">{row.arrivalStation}</TableCell>
                    <TableCell className="px-5 py-3 text-xs text-muted-foreground text-center">{row.platform}</TableCell>
                    <TableCell className="px-5 py-3 text-right">
                      <Badge variant="outline" className={`text-xs ${statusConfig[row.status].className}`}>
                        {statusConfig[row.status].label}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="px-5 py-3 border-t border-border/40">
              <Button asChild variant="ghost" size="sm" className="w-full gap-1.5 text-muted-foreground hover:text-foreground">
                <Link href="/timetables/upcoming">
                  View full schedule
                  <ArrowRightIcon className="size-3.5" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  )
}
