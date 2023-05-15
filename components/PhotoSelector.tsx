import { AddAPhoto, Clear, Delete } from "@mui/icons-material"
import { Box, Card, CircularProgress, Grid, IconButton, Typography } from "@mui/material"
import Image from "next/image";
import { useRef, useState } from "react";

export interface PhotoSelectorProps {
  image: string | undefined,
  setImage: (arg: string | undefined) => void
}

const maxFileSize = 4 * 1048576; // 4 MB

export const PhotoSelector = (props: PhotoSelectorProps) => {
  const fileInput = useRef(null);
  const handleClick = () => {
    (fileInput.current as any).click();
  }
  const handleChange = (event: any) => {
    const fileUploaded = event.target.files[0] as File;

    console.log(fileUploaded.size);

    if (!fileUploaded.name.toLowerCase().endsWith(".png")) {
      alert("Please upload a PNG image.")
      return;
    }
    if (fileUploaded.size > maxFileSize) {
      alert("File is too big (4 MB limit).")
      return;
    }

    // to base64
    const reader = new FileReader();
    reader.readAsDataURL(fileUploaded);
    reader.onload = () => props.setImage(reader.result as string | undefined);
  };

  return (
    <Box sx={{
      width: "100%",
      height: "auto",
      border: "3px solid #ECEBE4",
      borderRadius: 1,
      boxShadow: "0px 2px 4px #00000040"
    }}>
      <Grid container direction="column">
        <input type="file" style={{ "display": "none" }} ref={fileInput} onChange={handleChange} />
        <Grid item xs sx={{ borderBottom: "1px solid #ECEBE4" }} container alignItems="center">
          <IconButton color="secondary" onClick={handleClick}>
            <AddAPhoto />
          </IconButton>
          <IconButton color="secondary" onClick={() => props.setImage(undefined)}>
            <Delete />
          </IconButton>

          <Typography variant="caption">
            PNG image, max. 4 MB
          </Typography>
        </Grid>
        <Box sx={{
          width: "100%",
          overflow: 'auto'
        }}>
            <Box
              sx={{
                width: 100,
                height: 'fit-content',
                position: "relative",
                display: 'flex',
                flexShrink: 0
              }}
              alignItems="center"
              alignContent="center"
              justifyContent="center"
            >
              {
                props.image === undefined ? undefined :
                  <Image
                    alt={"Place Schema"}
                    src={props.image}
                    width="100"
                    height="100"
                    style={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: 8,
                      position: "relative",
                    }} />
              }
            </Box>
        </Box>
      </Grid>
    </Box >
  )
}