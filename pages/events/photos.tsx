import PageLayout from "@/components/PageLayout";
import {
  Grid,
  Typography,
  CircularProgress,
  Box,
  CssBaseline,
  Button,
} from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { backendUrlState, urls } from "../../recoil/backendUrlState";
import { useApiClient } from "../../functions/useApiClient";
import { sessionTokenState } from "../../recoil/sessionTokenState";
import { Event, EventStatus } from "api/Api";
import { EventCard } from "@/components/events/EventCard";
import { useRouter } from "next/router";
import { PhotoManager } from "@/components/PhotoManager";

export default function MyEvents() {
  const [sessionToken, _1] = useRecoilState(sessionTokenState);
  const [backend, _2] = useRecoilState(backendUrlState);

  const canEdit = backend === urls[0].url || backend.includes("localhost");
  const apiClient = useApiClient();
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState<string[]>([]);

  const downloadAll = async () => {
    if (id === undefined) {
      router.push("/dashboard");
      return;
    }
    const response = await apiClient.events.getPhoto(Number(id));
    if (!response.ok) {
      //router.push("/dashboard");
      alert("erros");
      return;
    }
    setPhotos(response.data);
    setLoading(false);
  };

  useEffect(() => {
    if (router.isReady) downloadAll();
  }, [router.isReady]);

  const addPhoto = async (file: File) => {
    setLoading(true);
    const formdata = new FormData();
    formdata.append("file", file);

    try {
      const response = await fetch(
        backend + "/events/" + Number(id) + "/photos",
        {
          method: "POST",
          body: formdata,
          headers: {
            sessionToken: sessionToken,
          } as HeadersInit,
        }
      );
      if (response.ok) {
        await downloadAll();
      } else {
        console.log(response);
      }
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  };

  const removePhoto = async (index: number) => {
    setLoading(true);
    const path = photos[index];
    try {
      const response = await apiClient.events.deletePhoto(id as string, {
        headers: {
          sessionToken: sessionToken,
          path: path,
        } as HeadersInit,
      });
      if (response.ok) {
        await downloadAll();
      } else {
        alert(await response.json());
      }
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  };

  // TODO: Back page

  return (
    <>
      <Head>
        <title>Event photos</title>
      </Head>
      <main>
        <PageLayout />
        <Grid sx={{ marginTop: "60px" }}>
          <CssBaseline />
          <Box
            sx={{
              my: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "10px",
              border: "2px solid #A2ADCD",
              borderRadius: "10px",
            }}
          >
            <Typography
              noWrap
              sx={{
                display: { xs: "flex", md: "flex" },
                fontFamily: "monospace",
                fontSize: "25px",
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "black",
              }}
            >
              PHOTOS FOR EVENT: {router.query.id ?? "Loading..."}
            </Typography>
            {canEdit ? undefined : (
              <Typography>
                Please use BiletMajster backend to edit event photos.
              </Typography>
            )}
          </Box>
          <PhotoManager
            title="Photos"
            maxImages={10}
            imageSrcs={photos}
            addImage={addPhoto}
            removeByIndex={removePhoto}
            allowedTypes={["png", "jpg", "jpeg"]}
            enabled={canEdit && !loading}
          />
          <Button
            sx={{ mt: 2 }}
            onClick={() => router.back()}
            disabled={loading}
          >
            Go back
          </Button>
        </Grid>
      </main>
    </>
  );
}
