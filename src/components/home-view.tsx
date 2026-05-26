import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface IProps {
  trainCount: number
  stationCount: number
  scheduleCount: number
}

export function HomeView(props: IProps) {
  const { trainCount, stationCount, scheduleCount } = props

  return (
    <div className="flex flex-col items-center space-y-12 py-12">

      <div className="text-center space-y-6 max-w-3xl">
        <h1 className="text-5xl sm:text-6xl font-black tracking-tighter text-foreground">
          Vilnius <span className="text-primary">Railway</span> Station
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Real-time train schedules, platform information, and complete route management.
          <br />
          All in one place.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="shadow-lg shadow-primary/20 gap-2">
            <Link href="/trains/departures">
              View Departures
              <ArrowRightIcon className="size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="gap-2">
            <Link href="/trains/search">
              Search Trains
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 w-full max-w-3xl">
        {[
          { value: trainCount, label: "Trains", href: "/trains" },
          { value: stationCount, label: "Stations", href: "/stations" },
          { value: scheduleCount, label: "Schedules", href: "/trains/schedule" },
        ].map((stat) => (
          <Button key={stat.label} asChild variant="ghost" className="h-auto p-0 rounded-xl">
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

    </div>
  )
}
