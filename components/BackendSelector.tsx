import {
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { backendUrlState, urls } from "../recoil/backendUrlState";
import { useState } from "react";
import { useRecoilState } from "recoil";

export const BackendSelector = () => {
  const [backendUrl, setBackendUrl] = useRecoilState(backendUrlState);

  return (
    <FormControl fullWidth>
      <InputLabel id="backend-label">Backend URL</InputLabel>
      <Select
        labelId="backend-label"
        id="backend"
        value={backendUrl}
        label="Backend URL"
        onChange={(e) => {
          const option = e.target.value as any;
          console.log(option);
          setBackendUrl(option);
        }}
      >
        {urls.map((url) => (
          <MenuItem key={url.url} value={url.url}>
            {url.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
