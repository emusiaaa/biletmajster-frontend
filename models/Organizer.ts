import { Event } from "./Event"

export interface Organizer {
  id: number,
  name: string,
  email: string,
  password: string,
  events: Event[],
  status: "pending" | "confirmed"
}
