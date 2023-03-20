import { Backend } from "fetch/backend";
import { send } from "fetch/send";

export const getMyEvents = (
  token: string,
  success?: (arg: Event[]) => void,
  networkError?: (message: string) => void
) => {
  send(
    Backend(`events/my`),
    "GET",
    undefined,
    success,
    [],
    networkError,
    token
  )
}