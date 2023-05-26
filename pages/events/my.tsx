import PageLayout from "@/components/PageLayout";
import { Grid, Typography, CircularProgress } from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useApiClient } from "../../functions/useApiClient";
import { sessionTokenState } from "../../recoil/sessionTokenState";
import { Event, EventStatus } from "api/Api";
import { EventCard } from "@/components/events/EventCard";

export default function MyEvents() {
  const [sessionToken, setSessionToken] = useRecoilState(sessionTokenState);
  const [myEvents, setMyEvents] = useState<Event[]>();
  const [loading, setLoading] = useState(true);
  const apiClient = useApiClient();

  const getMyEvents = async () => {
    console.log("im getting my events");
    if (sessionToken !== undefined) {
      console.log("token ok");
      const response = await apiClient.events.getMyEvents({
        headers: { sessionToken: sessionToken },
      });
      if (response.ok) {
        //console.log(response.data)
        setMyEvents(response.data);
        setLoading(false);
      } else {
        alert(response.statusText);
      }
    }
  };
  useEffect(() => {
    getMyEvents();
  }, []);

  return (
    <>
      <Head>
        <title>My events</title>
      </Head>
      <main>
        <PageLayout />
        <Grid sx={{ marginTop: "70px", mb: 3 }}>
          {loading ? (
            <CircularProgress sx={{ mt: 3 }} />
          ) : myEvents === undefined ? (
            <h1>error</h1>
          ) : (
            myEvents.map((event) => <EventCard event={event} key={event.id} />)
          )}
        </Grid>
      </main>
    </>
  );
}
