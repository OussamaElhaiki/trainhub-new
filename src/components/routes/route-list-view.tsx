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
import type { IDictionary } from "@/lib/dictionary"
import type { ISchedule } from "@/types/schedule-t"

interface IProps {
  schedules: ISchedule[]
  dict: IDictionary
  lang: string
}

export function RouteListView(props: IProps) {
  const { schedules, dict, lang } = props
  const routes = buildRouteGroups(schedules)
  const p = dict.pages.trainRoutes
  const c = dict.common

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{p.title}</h1>
        <p className="mt-1 text-muted-foreground">{p.subtitle}</p>
      </div>

      <div className="rounded-lg border border-border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{c.destination}</TableHead>
              <TableHead>{dict.pages.arrivalDestinations.trains}</TableHead>
              <TableHead>{p.firstDep}</TableHead>
              <TableHead>{p.lastDep}</TableHead>
              <TableHead>{p.journeyTime}</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {routes.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                  {p.noRoutes}
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
                    <Link href={`/${lang}/routes/search?destination=${encodeURIComponent(route.destination)}`}>
                      {p.viewSchedules}
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
