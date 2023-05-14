import { Api, HttpResponse } from "../api/Api";

describe("apiClient", () => {
  it("downloads a list of events", async () => {
    const fetch = require("node-fetch");

    const client = new Api({
      baseUrl: "http://127.0.0.1:4010",
      customFetch: fetch as any,
    });

    const response = await client.events.getEvents();
    expect(response.ok).toBeTruthy();
    expect(response.data).not.toHaveLength(0);
    expect(response.data[0].title).toEqual("Short description of Event");
  }),
    it("logs in as organizer", async () => {
      const fetch = require("node-fetch");

      const client = new Api({
        baseUrl: "http://127.0.0.1:4010",
        customFetch: fetch as any,
      });

      const response = await client.organizer.loginOrganizer({
        headers: {
          email: "test",
          password: "test",
        },
      });
      expect(response.ok).toBeTruthy();
      expect(response.data).toBeDefined();
      expect(response.data.sessionToken).not.toHaveLength(0);
    }),
    it("uses an authorized endpoint", async () => {
      const fetch = require("node-fetch");

      const client = new Api({
        baseUrl: "http://127.0.0.1:4010",
        customFetch: fetch as any,
      });

      const response = await client.events.cancelEvent("eventId", {
        headers: { sessionToken: "token" },
      });
      expect(response.ok).toBeTruthy();
      expect(response.data).toBeDefined();
    }),
    it("properly fails without authorization", async () => {
      const fetch = require("node-fetch");

      const client = new Api({
        baseUrl: "http://127.0.0.1:4010",
        customFetch: fetch as any,
      });

      const response = await client.events.cancelEvent("eventId");
      expect(response.status).toBe(401); // Unauthorized
    });
});
