import { Backend } from "fetch/backend";
import { send } from "fetch/send";
import { Organizer } from "models/Organizer";

export interface CreateOrganizerRequest {
  name: string;
  email: string;
  password: string;
}

export const createReservation = (
  payload: CreateOrganizerRequest,
  created?: (arg: Organizer) => void,
  exists?: () => void,
  networkError?: (message: string) => void
) => {
  send(
    Backend(`organizer?name=${payload.name}&email=${payload.email}&password=${payload.password}`),
    "POST",
    undefined,
    created,
    [
      { code: 400, action: exists }
    ],
    networkError
  )
}