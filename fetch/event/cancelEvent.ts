import { Backend } from "fetch/backend";
import { send } from "fetch/send";

export interface CancelEventId {
  eventId: number;
}

export const cancelEvent = (
  payload: CancelEventId,
  token: string,
  deleted?: () => void,
  notExist?: () => void,
  networkError?: (message: string) => void
) => {
  send(
    Backend(`events/${payload.eventId}`),
    "POST",
    undefined,
    deleted,
    [
      { code: 404, action: notExist }
    ],
    networkError,
    token
  )
}