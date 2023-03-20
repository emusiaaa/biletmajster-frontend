import { Backend } from "fetch/backend";
import { send } from "fetch/send";
import { Event } from "models/Event";

export const createReservation = (
  categoryId: number,
  success?: (arg: Event[]) => void,
  invalidId?: () => void,
  networkError?: (message: string) => void
) => {
  send(
    Backend(`events/getByCategory?categoryId=${categoryId}`),
    "GET",
    undefined,
    success,
    [
      { code: 400, action: invalidId }
    ],
    networkError
  )
}