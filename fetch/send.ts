export interface ErrorAction {
  code: number | "*",
  action?: (arg: number | "*") => void
}

export const send = <TRequest, TResponse>(
  url: string,
  type: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  body: TRequest,
  onSuccess: (response: TResponse) => void,
  onError?: ErrorAction[],
  onNetworkError?: (message: string) => void,
  sessionToken?: string
) => {
  const headers: HeadersInit = new Headers();
  if (sessionToken !== undefined)
    headers.set('sessionToken', sessionToken);
  fetch(url, {
    method: type,
    body: type === 'GET' ? undefined : JSON.stringify(body),
    headers: headers
  }).then(response => {
    if (response.ok)
      return response.json();
    return response.status;
  }).then(onSuccess)
    .catch(throwable => {
      if (typeof throwable === 'string') {
        if (onNetworkError !== undefined)
          onNetworkError(throwable);
      } else { // number = status code
        var func = onError?.find(act => act.code === throwable || act.code === "*")?.action;
        if (func !== undefined)
          func(throwable);
      }
    })
}