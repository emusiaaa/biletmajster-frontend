import Head from "next/head";
import PageLayout from "@/components/PageLayout";
import {Button, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import EventIcon from "@mui/icons-material/Event";


export default function Home() {

    return (
        <>
            <Head>
                <title>Create Next App</title>
                <style>
                    {'body { background-color: #538D7A; }'}
                </style>
            </Head>

            <main>

                <Grid container alignItems="center"
                      sx={{
                          mt: 8,
                          width: {xs:'80%', md:'60%'}, minHeight:'400px',
                          border: '4px solid #A2ADCD',
                          borderRadius: '30px',
                      }}
                      justifyContent="center" direction="column">
                    <Grid item xs={12}>
                        <Grid container alignItems="center" >
                            <Grid item>
                                <EventIcon sx={{
                                    display: { xs: 'flex', md: 'flex' },
                                    fontSize:{xs:'50px', md:'80px'},
                                    color: 'white',
                                    mr:'10px'}} />
                            </Grid>
                            <Grid item>
                                <Typography
                                    noWrap
                                    sx={{
                                        display: { xs: 'flex', md: 'flex' },
                                        fontFamily: 'monospace',
                                        fontSize: {xs:'50px', md:'80px'},
                                        fontWeight: 700,
                                        letterSpacing: '.3rem',
                                        color: 'white',
                                        textDecoration: 'none',
                                    }}
                                >
                                    DIONIZOS
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                            noWrap
                            sx={{
                                display: { xs: 'flex', md: 'flex' },
                                fontFamily: 'monospace',
                                fontSize: {xs:'20px', md:'30px'},
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'white',
                                textDecoration: 'none',
                            }}
                        >
                            FOR EVENT CREATORS
                        </Typography>
                    </Grid>


                    <Grid container alignItems="center" direction="column">
                        <Grid item xs={12}>
                            <Button
                                href="/login"
                                variant="contained"
                                sx={{ color: 'white', display: 'block',
                                    bgcolor:'#73A896', mt:'10px', ":hover":{bgcolor:'#A2ADCD'}}}
                            >Log in</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                href="/register"
                                variant="contained"
                                sx={{color: 'white', display: 'block',
                                    bgcolor:'#73A896', mt:'10px', mb:'20px',":hover":{bgcolor:'#A2ADCD'}}}
                            >Register</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </main>

        </>
    )
}