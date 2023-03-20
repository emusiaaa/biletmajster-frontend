import { Backend } from "fetch/backend";
import { send } from "fetch/send";

export const getCategories = (
  success?: (arg: { id: number, name: string }[]) => void,
  networkError?: (message: string) => void
) => {
  send(
    Backend("reservation?"),
    "GET",
    undefined,
    success,
    [],
    networkError
  )
}