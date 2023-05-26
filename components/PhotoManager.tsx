import { AddAPhoto, Clear, Delete } from "@mui/icons-material";
import {
  Box,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";

export interface PhotoManagerProps {
  title?: string,
  maxImages?: number,
  imageSrcs: string[],
  addImage: (file: File) => void,
  removeByIndex: (index: number) => void,
  allowedTypes?: string[],
  enabled?: boolean
}

const maxFileSize = 4 * 1048576; // 4 MB

export const PhotoManager = (props: PhotoManagerProps) => {
  const fileInput = useRef(null);
  const handleClick = () => {
    (fileInput.current as any).click();
  };
  const handleChange = (event: any) => {
    const fileUploaded = event.target.files[0] as File;

    console.log(fileUploaded.size);

    const split = fileUploaded.name.split(".");
    const type = split[split.length - 1];

    if (props.allowedTypes !== undefined && props.allowedTypes.find(allType => allType.toLowerCase() === type) === undefined) {
      alert("File type " + type + " is not allowed.");
      return;
    }
    if (fileUploaded.size > maxFileSize) {
      alert("File is too big (4 MB limit).");
      return;
    }

    props.addImage(fileUploaded)
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        borderRadius: 1,
        boxShadow: "0px 2px 4px #00000040",
      }}
    >
      <Grid container direction="column">
        <input
          type="file"
          style={{ display: "none" }}
          ref={fileInput}
          onChange={handleChange}
        />
        <Grid
          item
          xs
          sx={{ borderBottom: "1px solid #ECEBE4" }}
          container
          alignItems="center"
        >
          <IconButton color="secondary" onClick={handleClick} disabled={!(props.enabled ?? true) || (props.imageSrcs?.length ?? 0) === (props.maxImages ?? -1)}>
            <AddAPhoto />
          </IconButton>

          <Typography fontWeight="bold">
            {(props.title ?? "")}&nbsp;
          </Typography>

          <Typography variant="caption">Max. images: {props.maxImages ?? "unlimited"}, PNG image, max. 4 MB each</Typography>
        </Grid>
        <Box
          sx={{
            width: "100%",
            overflow: "auto",
            display: "flex",
            padding: 1,
            gap: 1
          }}
        >
          {props.imageSrcs.map((imgSrc, index) =>
            <Box
              key={imgSrc}
              sx={{
                width: 200,
                height: "fit-content",
                display: "flex",
                flexShrink: 0,
                border: "1px solid lightgray",
                borderRadius: 2
              }}
              alignItems="center"
              alignContent="center"
              justifyContent="center"
            >
              <Grid container direction="row">
                <Grid item>
                  <img
                    src={imgSrc}
                    width="100"
                    height="100"
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: 8
                    }}
                  />
                </Grid>
                <Grid item>
                  <IconButton size="small" onClick={() => props.removeByIndex(index)} disabled={!(props.enabled ?? true)}>
                    <Clear />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      </Grid>
    </Box>
  );
};
