import { send } from '../fetch';
import fetchMock from 'jest-fetch-mock';

describe('Send', () => {
  it('calls fetch', done => {
    global.fetch = fetchMock as any;
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({})
    } as any)

    send("https://url", "GET", {}, response => {
      expect(fetchMock).toHaveBeenCalled();
      jest.restoreAllMocks();
      done();
    }, [{ code: "*", action: done }], done)
  }),
    it('returns error when failed', done => {
      global.fetch = fetchMock as any;
      jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.reject("API is down"));

      send("https://url", "GET", {}, response => { }, [], message => {
        expect(message).toBe("API is down");
        done();
      });
    })
})
