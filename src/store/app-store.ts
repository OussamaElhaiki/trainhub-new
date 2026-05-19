import { createStore } from "zustand"
import { createNavigationSlice } from "./navigation-slice"
import { createNotificationSlice } from "./notification-slice"
import type { INavSlice, INotificationSlice } from "@/types/store-t"

export type IStoreState = INotificationSlice & INavSlice

export const appStore = () =>
  createStore<IStoreState>()((...a) => ({
    ...createNotificationSlice(...a),
    ...createNavigationSlice(...a)
  }))
