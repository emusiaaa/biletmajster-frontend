import Head from "next/head";
import PageLayout from "@/components/PageLayout";
import {Button, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import BookOnlineRoundedIcon from "@mui/icons-material/BookOnlineRounded";

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
                      justifyContent="center">
                    <Grid item xs={12}>

                    </Grid>
                    <BookOnlineRoundedIcon sx={{
                        display: { xs: 'flex', md: 'flex' },
                        fontSize:{xs:'50px', md:'80px'},
                        color: 'white',
                        mr:'10px'}} />
                    <Typography
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
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
                    <Typography
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'flex' },
                            fontFamily: 'monospace',
                            fontSize: {xs:'20px', md:'40px'},
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'white',
                            textDecoration: 'none',
                        }}
                    >
                        FOR EVENT CREATORS
                    </Typography>
                    <Grid container>
                        <Grid item sx={12}>
                            <Button
                                variant="contained"
                                sx={{ my: 2, color: 'white', display: 'block',
                                    bgcolor:'#73A896', mr:'10px', ":hover":{bgcolor:'#A2ADCD'}}}
                            >Log in</Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                sx={{ my: 2, color: 'white', display: 'block',
                                    bgcolor:'#73A896', mr:'10px', ":hover":{bgcolor:'#A2ADCD'}}}
                            >Register</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </main>

        </>
    )
}