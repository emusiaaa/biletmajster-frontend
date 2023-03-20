import { Backend } from "fetch/backend";
import { send } from "fetch/send";
import { Organizer } from "models/Organizer";

export interface ConfirmOrganizerRequest {
  id: string;
  code: string;
}

export const confirmReservation = (
  payload: ConfirmOrganizerRequest,
  created?: (arg: Organizer) => void,
  badCode?: () => void,
  networkError?: (message: string) => void
) => {
  send(
    Backend(`organizer/${payload.id}&code=${payload.code}`),
    "POST",
    undefined,
    created,
    [
      { code: 400, action: badCode }
    ],
    networkError
  )
}