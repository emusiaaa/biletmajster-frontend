import { Grid, Typography } from "@mui/material";

export const Banner = () => 
  <Grid container
    direction="row"
    alignItems="center"
    justifyContent="center"
    alignContent="center"
    sx={{ height: '60px' }}
  >
    <Grid item >
      <img
        src="/favicon.svg"
        alt="BiletMajster"
        style={{
          width: '50px'
        }}
      />
    </Grid>
    <Grid item>

      <Typography
        noWrap
        sx={{
          display: { xs: 'flex', md: 'flex' },
          fontSize: { xs: '40px', md: '50px' },
          fontWeight: 600
        }}
      >
        &nbsp;BiletMajster
      </Typography>
    </Grid>

  </Grid>