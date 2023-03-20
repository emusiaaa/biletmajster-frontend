import { Category } from "./Category"
import { EventStatus } from "./EventStatus"

export interface Event {
  id: number,
  freePlace: number,
  title: string,
  startTime: number,
  endTime: number,
  name: string,
  placeSchema: string,
  status: EventStatus,
  categories: Category[]
}
