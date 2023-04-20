import { useRecoilState } from 'recoil';
import { backendUrlState, urls } from 'recoil/backendUrlState';
import { Api } from './Api';

export const useApiClient = () => {
  const [backend, _] = useRecoilState(backendUrlState);

  console.log("Backend URL is " + backend)

  return new Api({
    baseUrl: backend
  });
}