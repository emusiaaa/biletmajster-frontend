import { Card, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { apiClient } from "api/apiClient";
import { useState } from "react";

const urls = [
  {
    name: "BiletMajster",
    url: "https://biletmajster.azurewebsites.net"
  },
  {
    name: "Dionizos",
    url: "https://dionizos-backend-app.azurewebsites.net"
  },
  {
    name: "IO2Central",
    url: "http://io2central-env.eba-vfjwqcev.eu-north-1.elasticbeanstalk.com"
  }
];

export const BackendSelector = () => {
  const [backendOption, setBackendOption] = useState<0 | 1 | 2>(0);

  return (
    <Card sx={{ p: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="backend-label">Backend URL</InputLabel>
        <Select
          labelId="backend-label"
          id="backend"
          value={backendOption}
          label="Backend URL"
          onChange={e => {
            console.log(e.target.value);
            setBackendOption(e.target.value as any);
            apiClient.baseUrl = urls[e.target.value as any].url;
          }}
        >
          {
            [0, 1, 2].map(value =>
              <MenuItem key={value}  value={value}>{urls[value].name}</MenuItem>)
          }
        </Select>
      </FormControl>
    </Card>
  );
}