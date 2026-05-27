"use client"

import { useState } from "react"
import { deleteApi, getApi } from "@/utils/server-api"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { StationFormDialog } from "@/components/stations/station-form-dialog"
import { DeleteConfirmDialog } from "@/components/trains/delete-confirm-dialog"
import { useDict } from "@/lib/dictionary-context"
import type { IStation } from "@/types/station-t"

interface IProps {
  stations: IStation[]
}

export function StationsPanel(props: IProps) {
  const [stations, setStations] = useState(props.stations)
  const dict = useDict()
  const p = dict.pages.allStations
  const c = dict.common

  async function refresh() {
    const data = await getApi<IStation[]>("/api/stations")
    if (data) setStations(data)
  }

  async function handleDelete(id: string) {
    await deleteApi("/api/stations", id)
    await refresh()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {stations.length} {stations.length !== 1 ? p.stationsRegistered : p.stationRegistered}
        </p>
        <StationFormDialog onSuccess={refresh} />
      </div>

      <div className="rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{p.stationName}</TableHead>
              <TableHead className="w-32 text-right">{c.actions}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stations.length === 0 && (
              <TableRow>
                <TableCell colSpan={2} className="text-center text-muted-foreground py-8">
                  {p.noStations}
                </TableCell>
              </TableRow>
            )}
            {stations.map((station) => (
              <TableRow key={station.id}>
                <TableCell className="font-medium">{station.name}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <StationFormDialog station={station} onSuccess={refresh} />
                    <DeleteConfirmDialog
                      title={`Delete station ${station.name}?`}
                      description="This will permanently remove this station from the list."
                      onConfirm={() => handleDelete(station.id)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
