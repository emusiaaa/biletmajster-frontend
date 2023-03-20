import { Backend } from "fetch/backend";
import { send } from "fetch/send";

export interface GetEventRequest {
  id: number;
}

export const createReservation = (
  payload: GetEventRequest,
  success?: (arg: Event) => void,
  badId?: () => void,
  notExist?: () => void,
  networkError?: (message: string) => void
) => {
  send(
    Backend(`events/${payload.id}`),
    "GET",
    undefined,
    success,
    [
      { code: 400, action: badId },
      { code: 404, action: notExist }
    ],
    networkError
  )
}