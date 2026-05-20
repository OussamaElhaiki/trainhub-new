import { TrainSearchForm } from "@/components/trains/train-search-form"
import { getTrains } from "@/lib/train-db"
import { getUniquePlatforms } from "@/lib/train-utils"

export default async function TrainSearchPage() {
  const trains = await getTrains()
  const platforms = getUniquePlatforms(trains)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Train Search</h1>
        <p className="mt-1 text-muted-foreground">
          Filter trains by number, destination, platform, or status.
        </p>
      </div>

      <TrainSearchForm trains={trains} platforms={platforms} />
    </div>
  )
}
