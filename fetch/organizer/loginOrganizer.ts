import { Backend } from "fetch/backend";
import { send } from "fetch/send";

export interface LoginOrganizerRequest {
  email: string;
  password: string;
}

export interface LoginOrganizerResponse {
  sessionToken: string
}

export const loginOrganizer = (
  payload: LoginOrganizerRequest,
  loggedIn?: (arg: LoginOrganizerResponse) => void,
  invalid?: () => void,
  networkError?: (message: string) => void
) => {
  send(
    Backend(`organizer/login?email=${payload.email}&password=${payload.password}`),
    "GET",
    undefined,
    loggedIn,
    [
      { code: 400, action: invalid }
    ],
    networkError
  )
}