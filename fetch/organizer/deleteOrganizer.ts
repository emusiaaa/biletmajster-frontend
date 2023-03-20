import { Backend } from "fetch/backend";
import { send } from "fetch/send";

export interface DeleteOrganizerRequest {
  id: string;
}

export const deleteOrganizer = (
  payload: DeleteOrganizerRequest,
  token: string,
  deleted?: () => void,
  notExist?: () => void,
  networkError?: (message: string) => void
) => {
  send(
    Backend(`organizer/${payload.id}`),
    "DELETE",
    undefined,
    deleted,
    [
      { code: 404, action: notExist }
    ],
    networkError,
    token
  )
}