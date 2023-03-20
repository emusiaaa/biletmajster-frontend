import { Backend } from "fetch/backend";
import { send } from "fetch/send";
import { Event } from "models/Event";

export interface CreateReservationResponse {
  eventId: number;
  placeId: number;
  reservationToken: string;
}

export const createReservation = (
  payload: Event,
  token: string,
  patched?: () => void,
  notExist?: () => void,
  networkError?: (message: string) => void
) => {
  send(
    Backend(`events/${payload.id}`),
    "PATCH",
    payload,
    patched,
    [
      { code: 404, action: notExist }
    ],
    networkError,
    token
  )
}