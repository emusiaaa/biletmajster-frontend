import { Backend } from "fetch/backend";
import { send } from "fetch/send";

export interface DeleteReservationRequest {
  reservationToken: string;
}

export const deleteReservation = (
  body: DeleteReservationRequest,
  deleted?: () => void,
  notExist?: () => void,
  networkError?: (message: string) => void
) => {
  send(
    Backend(`reservation?reservationToken=${body.reservationToken}`),
    "DELETE",
    undefined,
    deleted,
    [
      { code: 404, action: notExist }
    ],
    networkError
  )
}