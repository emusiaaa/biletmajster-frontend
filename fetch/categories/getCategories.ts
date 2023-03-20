import { Backend } from "fetch/backend";
import { send } from "fetch/send";
import { Category } from "models/Category";

export const getCategories = (
  success?: (arg: Category[]) => void,
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