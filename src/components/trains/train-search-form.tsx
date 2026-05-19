"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { trainSearchSchema } from "@/types/train-t"
import type { Train, TrainSearch } from "@/types/train-t"
import { statusConfig, calculateDuration } from "@/lib/train-utils"
import { TrainDetailsDialog } from "@/components/trains/train-details-dialog"

interface IProps {
  trains: Train[]
  platforms: string[]
}

const DEFAULT_VALUES: TrainSearch = {
  trainNumber: "",
  platform: "",
  arrivalStation: "",
  status: "all",
}

export function TrainSearchForm({ trains, platforms }: IProps) {
  const [results, setResults] = useState<Train[]>([])
  const [searched, setSearched] = useState(false)
  const [resetKey, setResetKey] = useState(0)

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TrainSearch>({
    resolver: zodResolver(trainSearchSchema),
    defaultValues: DEFAULT_VALUES,
  })

  function onSubmit(data: TrainSearch) {
    const filtered = trains.filter((train) => {
      const matchesNumber =
        !data.trainNumber ||
        train.trainNumber.toLowerCase().includes(data.trainNumber.toLowerCase())
      const matchesPlatform = !data.platform || train.platform === data.platform
      const matchesStation =
        !data.arrivalStation ||
        train.arrivalStation.toLowerCase().includes(data.arrivalStation.toLowerCase())
      const matchesStatus = data.status === "all" || train.status === data.status
      return matchesNumber && matchesPlatform && matchesStation && matchesStatus
    })
    setResults(filtered)
    setSearched(true)
  }

  function onReset() {
    reset(DEFAULT_VALUES)
    setResetKey((k) => k + 1)
    setResults([])
    setSearched(false)
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-1.5">
            <Label htmlFor="trainNumber">Train number</Label>
            <Input
              id="trainNumber"
              placeholder="e.g. IC-001"
              {...register("trainNumber")}
            />
            {errors.trainNumber && (
              <p className="text-xs text-destructive">{errors.trainNumber.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="arrivalStation">Destination</Label>
            <Input
              id="arrivalStation"
              placeholder="e.g. Kaunas"
              {...register("arrivalStation")}
            />
          </div>

          <div className="space-y-1.5">
            <Label>Platform</Label>
            <Select
              key={`platform-${resetKey}`}
              onValueChange={(value: string) =>
                setValue("platform", value === "any" ? "" : value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Any platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any platform</SelectItem>
                {platforms.map((p) => (
                  <SelectItem key={p} value={p}>
                    Platform {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Status</Label>
            <Select
              key={`status-${resetKey}`}
              defaultValue="all"
              onValueChange={(value: string) =>
                setValue("status", value as TrainSearch["status"])
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="on-time">On Time</SelectItem>
                <SelectItem value="delayed">Delayed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2">
          <Button type="submit">Search</Button>
          <Button type="button" variant="outline" onClick={onReset}>
            Reset
          </Button>
        </div>
      </form>

      {searched && (
        <div>
          <p className="mb-3 text-sm text-muted-foreground">
            {results.length === 0
              ? "No trains match your search criteria."
              : `Found ${results.length} train${results.length !== 1 ? "s" : ""}.`}
          </p>

          {results.length > 0 && (
            <div className="rounded-lg border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Train</TableHead>
                    <TableHead>Departure</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Arrival</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((train) => {
                    const status = statusConfig[train.status]
                    return (
                      <TableRow key={train.id}>
                        <TableCell className="font-medium">{train.trainNumber}</TableCell>
                        <TableCell>{train.departureTime}</TableCell>
                        <TableCell>{train.arrivalStation}</TableCell>
                        <TableCell>{train.arrivalTime}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {calculateDuration(train.departureTime, train.arrivalTime)}
                        </TableCell>
                        <TableCell>{train.platform}</TableCell>
                        <TableCell>
                          <span className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${status.className}`}>
                            {status.label}
                          </span>
                        </TableCell>
                        <TableCell>
                          <TrainDetailsDialog train={train} />
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
