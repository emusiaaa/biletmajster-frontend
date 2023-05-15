import Head from "next/head";
import Image from "next/image";

import { useEffect, useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Event, EventStatus } from "api/Api";
import { EventCard } from "@/components/events/EventCard";
import { useApiClient } from "functions/useApiClient";
import { CircularProgress, Grid } from "@mui/material";

export default function Dashboard() {
  const [events, setEvents] = useState<Event[]>();
  const [loading, setLoading] = useState(true);
  const apiClient = useApiClient();

  useEffect(() => {
    apiClient.events.getEvents()
      .then(response => {
        if (response.ok) {
          //console.log(response.data)
          setEvents(response.data);
          setLoading(false);
        } else {
          alert(response.statusText);
        }
      })
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard - Events</title>
      </Head>

      <main>
        <PageLayout />
        <Grid sx={{ marginTop: "70px", mb: 3 }}>
          {loading ? (
            <CircularProgress sx={{ mt: 3 }} />
          ) : events === undefined ? (
            <h1>error</h1>
          ) : (
            events.map((event) => <EventCard event={event} key={event.id} hideEditButtons />)
          )}
          {/*{sample.map((event)=>*/}
          {/*    <EventCard event={event}/>*/}
          {/*)}*/}
        </Grid>
      </main>
    </>
  );
}
