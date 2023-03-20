import { Backend } from "fetch/backend";
import { send } from "fetch/send";

export interface CreateEventRequest {
  title: string,
  name: string,
  freePlace: number,
  placeSchema: string,
  startTime: number,
  endTime: number,
  categories: number[]
}

export const createReservation = (
  payload: CreateEventRequest,
  token: string,
  created?: (arg: Event) => void,
  notCreated?: () => void,
  networkError?: (message: string) => void
) => {
  send(
    Backend(`events?title=${payload.title}&name=${payload.name}&freePlace=${payload.freePlace}&placeSchema=${payload.placeSchema}&startTime=${payload.startTime}&endTime=${payload.endTime}&categories=${payload.categories}`), // TODO: How to send array of integers?
    "POST",
    undefined,
    created,
    [
      { code: 400, action: notCreated }
    ],
    networkError,
    token
  )
}