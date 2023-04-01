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
const theme = createTheme();

export default function SignIn() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
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
                          sx={{height:'60px'}}
                    >
                        <Grid item >
                            <Avatar sx={{ bgcolor: '#73A896', mr:2 }}>
                                <EventIcon />
                            </Avatar>
                        </Grid>
                        <Grid item>
                            <Typography
                                noWrap
                                sx={{
                                    display: { xs: 'flex', md: 'flex' },
                                    fontFamily: 'monospace',
                                    fontSize: {xs:'50px', md:'50px'},
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'black',
                                    textDecoration: 'none',
                                }}
                            >
                                DIONIZOS
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
                    <Typography component="h1" variant="h5">
                        Log in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Log In
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