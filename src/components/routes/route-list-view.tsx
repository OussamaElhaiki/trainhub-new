import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { buildRouteGroups } from "@/lib/train-utils"
import type { ISchedule } from "@/types/schedule-t"

interface IProps {
  schedules: ISchedule[]
}

export function RouteListView(props: IProps) {
  const { schedules } = props

  const routes = buildRouteGroups(schedules)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Train Routes</h1>
        <p className="mt-1 text-muted-foreground">
          All routes operating from Vilnius.
        </p>
      </div>

      <div className="rounded-lg border border-border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Destination</TableHead>
              <TableHead>Trains</TableHead>
              <TableHead>First dep.</TableHead>
              <TableHead>Last dep.</TableHead>
              <TableHead>Journey time</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {routes.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                  No routes available.
                </TableCell>
              </TableRow>
            )}
            {routes.map((route) => (
              <TableRow key={route.destination}>
                <TableCell className="font-medium">{route.destination}</TableCell>
                <TableCell>{route.count}</TableCell>
                <TableCell className="font-mono">{route.firstDep}</TableCell>
                <TableCell className="font-mono">{route.lastDep}</TableCell>
                <TableCell className="text-muted-foreground">{route.duration}</TableCell>
                <TableCell className="text-right">
                  <Button asChild variant="outline" size="sm" className="gap-1.5">
                    <Link href={`/routes/search?destination=${encodeURIComponent(route.destination)}`}>
                      View schedules
                      <ArrowRightIcon className="size-3.5" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
