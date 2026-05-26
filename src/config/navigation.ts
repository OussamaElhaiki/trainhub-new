import { Role } from "@/constants/role"
import type { INav } from "@/types/nav-t"

export const mainMenu: INav[] = [
  {
    title: "Home",
    slug: "/"
  },

  {
    title: "Trains",
    slug: "/trains",
    children: [
      { title: "All Trains", slug: "/trains", role: Role.Administrator },
      { title: "Train Schedule", slug: "/trains/schedule", role: Role.Administrator },
      { title: "Departure Schedule", slug: "/trains/departures" },
      { title: "Train Search", slug: "/trains/search" },
    ],
  },
  {
    title: "Stations",
    slug: "/stations",
    children: [
      { title: "All Stations", slug: "/stations", role: Role.Administrator },
      { title: "Arrival Times", slug: "/stations/arrivals" },
      { title: "Departures", slug: "/stations/departures" },
      { title: "Station Search", slug: "/stations/search" },
    ],
  },

  {
    title: "Routes",
    slug: "/routes",
    children: [
      { title: "Train Routes", slug: "/routes" },
      { title: "Arrival Destinations", slug: "/routes/destinations" },
      { title: "Route Search", slug: "/routes/search" }
    ]
  },

  {
    title: "Timetables",
    slug: "/timetables",
    children: [
      { title: "Daily Schedule", slug: "/timetables/daily" },
      { title: "Platform Schedule", slug: "/timetables/platforms" },
      { title: "Upcoming Departures", slug: "/timetables/upcoming" }
    ]
  },

  {
    title: "Information",
    slug: "/info",
    children: [
      { title: "Platforms", slug: "/info/platforms" },
      { title: "Carriages & Seats", slug: "/info/carriages" },
      { title: "Travel Information", slug: "/info/travel" }
    ]
  },

  {
    title: "Administration",
    slug: "/admin",
    children: [
      { title: "Manage Trains", slug: "/admin/trains" },
      { title: "Manage Stations", slug: "/admin/stations" },
      { title: "Manage Schedules", slug: "/admin/schedules" }
    ]
  }
]