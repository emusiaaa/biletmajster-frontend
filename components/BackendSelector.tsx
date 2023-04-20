import { Card, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { backendUrlState, urls } from "../recoil/backendUrlState";
import { useState } from "react";
import { useRecoilState } from "recoil";

export const BackendSelector = () => {
  const [backendOption, setBackendOption] = useState<0 | 1 | 2>(0);
  const [backendUrl, setBackendUrl] = useRecoilState(backendUrlState);

  return (
    <FormControl fullWidth>
      <InputLabel id="backend-label">Backend URL</InputLabel>
      <Select
        labelId="backend-label"
        id="backend"
        value={backendOption}
        label="Backend URL"
        onChange={e => {
          const option = e.target.value as any;
          console.log(option);
          setBackendOption(option);
          setBackendUrl(urls[option].url);
        }}
      >
        {
          [0, 1, 2].map(value =>
            <MenuItem key={value} value={value}>{urls[value].name}</MenuItem>)
        }
      </Select>
    </FormControl>
  );
}