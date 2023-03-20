import { Backend } from "fetch/backend";
import { send } from "fetch/send";
import { Organizer } from "models/Organizer";

export const patchOrganizer = (
  payload: Organizer,
  token: string,
  patched?: () => void,
  notExist?: () => void,
  networkError?: (message: string) => void
) => {
  send(
    Backend(`reservation?reservationToken=${payload.id}`),
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