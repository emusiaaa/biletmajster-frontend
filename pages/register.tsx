import Head from "next/head";
import PageLayout from "@/components/PageLayout";
import {Button, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import BookOnlineRoundedIcon from "@mui/icons-material/BookOnlineRounded";
import SignIn from "@/components/login/loginForm";

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

                <Grid container direction="column" alignItems="center"
                      sx={{
                          bgcolor:'#FFFFFF',
                          width: {xs:'80%', md:'60%'}, minHeight:'400px',
                          borderRadius: '30px', mt:3
                      }}
                      justifyContent="center" >
                    <Grid item>
                        <SignIn></SignIn>
                    </Grid>
                </Grid>
            </main>

        </>
    )
}