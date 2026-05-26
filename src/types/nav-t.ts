import type { Role } from "@/constants/role"

export interface INav {
  title: string
  slug: string
  role?: Role
  children?: INav[]
}