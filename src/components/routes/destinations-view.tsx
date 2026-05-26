import Link from "next/link"
import { ArrowRightIcon, MapPinIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { buildDestinationSummaries } from "@/lib/train-utils"
import type { ISchedule } from "@/types/schedule-t"

interface IProps {
  schedules: ISchedule[]
}

export function DestinationsView(props: IProps) {
  const { schedules } = props

  const destinations = buildDestinationSummaries(schedules)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Arrival Destinations</h1>
        <p className="mt-1 text-muted-foreground">
          All stations reachable from Vilnius.
        </p>
      </div>

      {destinations.length === 0 && (
        <p className="text-sm text-muted-foreground">No destinations available.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {destinations.map((dest) => (
          <Link
            key={dest.name}
            href={`/routes/search?destination=${encodeURIComponent(dest.name)}`}
            className="group"
          >
            <Card className="hover:border-primary/40 transition-all h-full">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="size-4 text-primary shrink-0" />
                    <span className="font-semibold text-base leading-tight">{dest.name}</span>
                  </div>
                  <ArrowRightIcon className="size-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0 mt-0.5" />
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Trains</p>
                    <p className="font-semibold tabular-nums">{dest.count}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Next dep.</p>
                    <p className="font-semibold font-mono">{dest.nextDep}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Journey</p>
                    <p className="font-semibold">{dest.duration}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
