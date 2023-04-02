import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EventIcon from '@mui/icons-material/Event';
import {useState,SyntheticEvent } from "react";
import { useRouter } from 'next/router';
import { CircularProgress } from '@mui/material';
import { apiClient } from 'api/apiClient';

const theme = createTheme();

export default function SignIn() {
    const [error, setError] = useState(true);
    const [password, setPassword] = useState("");
    const [mail, setMail] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const submitFunction = async (e: SyntheticEvent) => {
        e.preventDefault();
        const input = {
            email: mail,
            password: password
        };
        setLoading(true);
        const response = await apiClient.organizer.loginOrganizer(input);
        setLoading(false);
        if (response.ok) {
            //props.goToNext(response.data.id!);
            router.push('/');
        } else {
            if (response.status === 400)
            {
                setError(false);
            }
            else
                alert(response.statusText);
        }
    };
    const theme = createTheme({
        palette: {
            primary: {
                main: '#CF8BA9'
            }
        }
    });
    return (
        <ThemeProvider  theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        my: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Grid container
                          direction="row"
                          alignItems="center"
                        justifyContent="center"
                        alignContent="center"
                          sx={{height:'60px'}}
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
                    <Grid item>
                        <Typography
                            noWrap
                            sx={{
                                display: { xs: 'flex', md: 'flex' },
                                fontFamily: 'monospace',
                                fontSize: '20px',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'black',
                                textDecoration: 'none',
                                mb:1
                            }}
                        >
                            FOR EVENT CREATORS
                        </Typography>
                    </Grid>
                    {error ?
                        <Typography component="h1" color="red" data-testid="error">
                            Incorrect email or password :(
                        </Typography> :
                        <></>
                        }
                    <Typography component="h1" variant="h5">
                        Log in
                    </Typography>
                    <Box component="form" onSubmit={submitFunction} noValidate sx={{ mt: 1 }}>
                        <TextField
                            data-testid="email"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={mail}
                            onChange={e => setMail(e.target.value)}
                        />
                        <TextField
                            data-testid="password"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            data-testid="login"
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {loading ? <CircularProgress data-testid="loading"/> : "Log in"}
                        </Button>
                        <Grid container>

                            <Grid item>
                                <Link href="/register" variant="body2" >
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider >

    );
}