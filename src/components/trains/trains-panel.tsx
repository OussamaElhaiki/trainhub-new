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
import { TrainFormDialog } from "@/components/trains/train-form-dialog"
import { DeleteConfirmDialog } from "@/components/trains/delete-confirm-dialog"
import type { ITrain } from "@/types/train-t"

interface IProps {
  trains: ITrain[]
}

export function TrainsPanel(props: IProps) {
  const [trains, setTrains] = useState(props.trains)

  async function refresh() {
    const data = await getApi<ITrain[]>("/api/trains")
    if (data) setTrains(data)
  }

  async function handleDelete(id: string) {
    await deleteApi("/api/trains", id)
    await refresh()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{trains.length} train{trains.length !== 1 ? "s" : ""} registered.</p>
        <TrainFormDialog onSuccess={refresh} />
      </div>

      <div className="rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Train number</TableHead>
              <TableHead className="w-32 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trains.length === 0 && (
              <TableRow>
                <TableCell colSpan={2} className="text-center text-muted-foreground py-8">
                  No trains yet. Add the first one above.
                </TableCell>
              </TableRow>
            )}
            {trains.map((train) => (
              <TableRow key={train.id}>
                <TableCell className="font-medium">{train.trainNumber}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <TrainFormDialog train={train} onSuccess={refresh} />
                    <DeleteConfirmDialog
                      title={`Delete train ${train.trainNumber}?`}
                      description="This will permanently remove this train. Any schedules referencing it will remain but the train won't appear in the train list."
                      onConfirm={() => handleDelete(train.id)}
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
