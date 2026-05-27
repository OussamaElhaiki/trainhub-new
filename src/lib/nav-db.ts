import { connectMongoose } from "@/utils/mongoose-client"
import { NavItemModel } from "@/models/nav-model"
import type { INavItem, INavItemForm, INavGroup } from "@/types/nav-t"
import { Role } from "@/constants/role"

const SEED: INavItemForm[] = [
  { key: "trains",          order: 0 },
  { key: "departureSchedule", slug: "/trains/departures",  parentKey: "trains",         order: 0 },
  { key: "trainSearch",       slug: "/trains/search",       parentKey: "trains",         order: 1 },
  { key: "allTrains",         slug: "/trains",              parentKey: "trains",         order: 2, role: Role.Administrator },
  { key: "trainSchedule",     slug: "/trains/schedule",     parentKey: "trains",         order: 3, role: Role.Administrator },

  { key: "stations",        order: 1 },
  { key: "arrivalTimes",      slug: "/stations/arrivals",   parentKey: "stations",       order: 0 },
  { key: "departures",        slug: "/stations/departures", parentKey: "stations",       order: 1 },
  { key: "stationSearch",     slug: "/stations/search",     parentKey: "stations",       order: 2 },
  { key: "allStations",       slug: "/stations",            parentKey: "stations",       order: 3, role: Role.Administrator },

  { key: "routes",          order: 2 },
  { key: "trainRoutes",       slug: "/routes",              parentKey: "routes",         order: 0 },
  { key: "arrivalDestinations", slug: "/routes/destinations", parentKey: "routes",       order: 1 },
  { key: "routeSearch",       slug: "/routes/search",       parentKey: "routes",         order: 2 },

  { key: "timetables",      order: 3 },
  { key: "dailySchedule",     slug: "/timetables/daily",    parentKey: "timetables",     order: 0 },
  { key: "platformSchedule",  slug: "/timetables/platforms",parentKey: "timetables",     order: 1 },
  { key: "upcomingDepartures", slug: "/timetables/upcoming",parentKey: "timetables",     order: 2 },

  { key: "information",     order: 4 },
  { key: "platforms",         slug: "/info/platforms",      parentKey: "information",    order: 0 },
  { key: "carriagesSeats",    slug: "/info/carriages",      parentKey: "information",    order: 1 },
  { key: "travelInformation", slug: "/info/travel",         parentKey: "information",    order: 2 },

  { key: "administration",  order: 5 },
  { key: "manageTrains",      slug: "/admin/trains",        parentKey: "administration", order: 0, role: Role.Administrator },
  { key: "manageStations",    slug: "/admin/stations",      parentKey: "administration", order: 1, role: Role.Administrator },
  { key: "manageSchedules",   slug: "/admin/schedules",     parentKey: "administration", order: 2, role: Role.Administrator },
]

async function seedIfEmpty(): Promise<void> {
  const count = await NavItemModel.countDocuments()
  if (count === 0) {
    await NavItemModel.insertMany(SEED)
  }
}

export async function getNavGroups(): Promise<INavGroup[]> {
  await connectMongoose()
  await seedIfEmpty()

  const docs = await NavItemModel.find().sort({ order: 1 })
  const items = docs.map((d) => d.toJSON() as unknown as INavItem)

  const groups = items.filter((i) => !i.parentKey).sort((a, b) => a.order - b.order)

  return groups.map((group) => ({
    key: group.key,
    children: items
      .filter((i) => i.parentKey === group.key)
      .sort((a, b) => a.order - b.order),
  }))
}

export async function getNavItems(): Promise<INavItem[]> {
  await connectMongoose()
  await seedIfEmpty()
  const docs = await NavItemModel.find().sort({ order: 1 })
  return docs.map((d) => d.toJSON() as unknown as INavItem)
}

export async function createNavItem(data: INavItemForm): Promise<INavItem> {
  await connectMongoose()
  const doc = await NavItemModel.create(data)
  return doc.toJSON() as unknown as INavItem
}

export async function updateNavItem(id: string, data: INavItemForm): Promise<INavItem | null> {
  await connectMongoose()
  const doc = await NavItemModel.findByIdAndUpdate(id, data, { new: true })
  if (!doc) return null
  return doc.toJSON() as unknown as INavItem
}

export async function deleteNavItem(id: string): Promise<boolean> {
  await connectMongoose()
  const result = await NavItemModel.findByIdAndDelete(id)
  return !!result
}
