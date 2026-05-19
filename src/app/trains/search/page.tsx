import { TrainSearchForm } from "@/components/trains/train-search-form"
import { mockTrains } from "@/data/trains"
import { getUniquePlatforms } from "@/lib/train-utils"

export default function TrainSearchPage() {
  const platforms = getUniquePlatforms(mockTrains)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Train Search</h1>
        <p className="mt-1 text-muted-foreground">
          Filter trains by number, destination, platform, or status.
        </p>
      </div>

      <TrainSearchForm trains={mockTrains} platforms={platforms} />
    </div>
  )
}