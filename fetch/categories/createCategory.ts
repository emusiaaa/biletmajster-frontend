import { Backend } from "fetch/backend";
import { send } from "fetch/send";

export interface CreateCategoryRequest {
  categoryName: number;
}

export interface CreateCategoryResponse {
  id: number;
  name: string;
}

export const createCategory = (
  payload: CreateCategoryRequest,
  created?: (arg: CreateCategoryResponse) => void,
  exists?: () => void,
  networkError?: (message: string) => void
) => {
  send(
    Backend(`category?categoryName=${payload.categoryName}`),
    "POST",
    undefined,
    created,
    [
      { code: 400, action: exists }
    ],
    networkError
  )
}