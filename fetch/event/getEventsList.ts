import { Backend } from "fetch/backend";
import { send } from "fetch/send";
import { Event } from "models/Event";

export const getEventsList = (
  success?: (arg: Event[]) => void,
  networkError?: (message: string) => void
) => {
  send(
    Backend(`events`),
    "GET",
    undefined,
    success,
    [],
    networkError
  )
}