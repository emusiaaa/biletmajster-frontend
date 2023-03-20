import { Backend } from "fetch/backend";
import { send } from "fetch/send";

export interface CreateReservationRequest {
  eventId: number;
  placeId: number;
}

export interface CreateReservationResponse {
  eventId: number;
  placeId: number;
  reservationToken: string;
}

export const createReservation = (
  body: CreateReservationRequest,
  created?: (arg: CreateReservationResponse) => void,
  noFreePlace?: () => void,
  notExist?: () => void,
  networkError?: (message: string) => void
) => {
  send(
    Backend(`reservation?eventId=${body.eventId}&placeID=${body.placeId}`),
    "POST",
    undefined,
    created,
    [
      { code: 400, action: noFreePlace },
      { code: 404, action: notExist }
    ],
    networkError
  )
}